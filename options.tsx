import React, { useState, useEffect } from "react"
import { Settings, Plus, RefreshCw, Server, Wifi, Activity } from "lucide-react"
import type { ProxyConfig, Message, MessageResponse } from "~utils/types"
import { Button, Card, Toast } from "~components/UI"
import { ProxyCard } from "~components/ProxyCard"
import { ProxyForm } from "~components/ProxyForm"
import "~styles/global.css"
import "~styles/options.css"

function OptionsPage() {
  const [proxies, setProxies] = useState<ProxyConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingProxy, setEditingProxy] = useState<ProxyConfig | null>(null)
  const [toast, setToast] = useState<{
    visible: boolean
    message: string
    type: 'success' | 'error' | 'warning' | 'info'
  }>({
    visible: false,
    message: '',
    type: 'info'
  })

  // 显示提示消息
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setToast({ visible: true, message, type })
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000)
  }

  // 发送消息到background script
  const sendMessage = (message: Message): Promise<MessageResponse> => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage(message, (response: MessageResponse) => {
        if (chrome.runtime.lastError) {
          resolve({ success: false, error: chrome.runtime.lastError.message })
        } else {
          resolve(response || { success: false, error: 'No response' })
        }
      })
    })
  }

  // 加载代理列表
  const loadProxies = async () => {
    setLoading(true)
    try {
      const response = await sendMessage({ type: 'GET_PROXIES' })
      if (response.success) {
        setProxies(response.data || [])
      } else {
        showToast(response.error || '加载代理列表失败', 'error')
      }
    } catch (error) {
      showToast('加载代理列表失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProxies()
    
    // 检查是否有从popup传来的编辑代理ID
    chrome.storage.local.get(['editingProxyId'], (result) => {
      if (result.editingProxyId) {
        chrome.storage.local.remove(['editingProxyId'])
        // 稍后处理编辑状态
        setTimeout(() => {
          const proxyToEdit = proxies.find(p => p.id === result.editingProxyId)
          if (proxyToEdit) {
            setEditingProxy(proxyToEdit)
            setShowForm(true)
          }
        }, 500)
      }
    })
  }, [])

  // 保存代理
  const handleSaveProxy = async (proxyData: Omit<ProxyConfig, 'id'> | ProxyConfig) => {
    try {
      const isEditing = 'id' in proxyData
      const response = await sendMessage({
        type: isEditing ? 'UPDATE_PROXY' : 'ADD_PROXY',
        data: proxyData
      })

      if (response.success) {
        await loadProxies()
        setShowForm(false)
        setEditingProxy(null)
        showToast(isEditing ? '代理更新成功' : '代理添加成功', 'success')
      } else {
        showToast(response.error || '保存失败', 'error')
      }
    } catch (error) {
      showToast('保存失败', 'error')
    }
  }

  // 删除代理
  const handleDeleteProxy = async (id: string) => {
    try {
      const response = await sendMessage({ type: 'DELETE_PROXY', data: { id } })
      if (response.success) {
        await loadProxies()
        showToast('代理删除成功', 'success')
      } else {
        showToast(response.error || '删除失败', 'error')
      }
    } catch (error) {
      showToast('删除失败', 'error')
    }
  }

  // 切换代理状态
  const handleToggleProxy = async (id: string, enabled: boolean) => {
    try {
      if (enabled) {
        const response = await sendMessage({ type: 'ACTIVATE_PROXY', data: { id } })
        if (response.success) {
          await loadProxies()
          showToast('代理连接成功', 'success')
        } else {
          showToast(response.error || '连接失败', 'error')
        }
      } else {
        const response = await sendMessage({ type: 'DISCONNECT_PROXY' })
        if (response.success) {
          await loadProxies()
          showToast('代理已断开', 'success')
        } else {
          showToast(response.error || '断开失败', 'error')
        }
      }
    } catch (error) {
      showToast('操作失败', 'error')
    }
  }

  const activeProxy = proxies.find(p => p.isActive)

  return (
    <div className="options-container">
      {/* 头部 */}
      <div className="options-header">
        <div className="options-header-content">
          <div className="options-logo">
            <div className="options-logo-icon">
              <Settings size={32} />
            </div>
            <div className="options-logo-text">
              <h1>代理切换器设置</h1>
              <p>管理您的代理配置，享受安全的网络浏览体验</p>
            </div>
          </div>
          
          <div className="options-header-actions">
            <button
              onClick={() => setShowForm(true)}
              className="options-button options-button-primary"
            >
              <Plus size={18} />
              <span>添加新代理</span>
            </button>
            
            <button
              onClick={loadProxies}
              disabled={loading}
              className="options-button options-button-secondary"
              title="刷新列表"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* 主内容 */}
      <div className="options-main">
        {/* 统计卡片 */}
        <div className="options-stats">
          <div className="options-stat-card">
            <h3>代理总数</h3>
            <div className="value">{proxies.length}</div>
            <div className="description">已配置的代理服务器</div>
          </div>
          
          <div className="options-stat-card">
            <h3>当前状态</h3>
            <div className="value">{activeProxy ? '已连接' : '未连接'}</div>
            <div className="description">
              {activeProxy ? `使用 ${activeProxy.name}` : '暂无活动代理'}
            </div>
          </div>
          
          <div className="options-stat-card">
            <h3>活动代理</h3>
            <div className="value">{proxies.filter(p => p.isActive).length}</div>
            <div className="description">正在使用的代理数量</div>
          </div>
        </div>

        {/* 代理列表区域 */}
        <div className="options-section">
          <div className="options-section-header">
            <div>
              <h2 className="options-section-title">
                <Server size={24} />
                代理配置管理
              </h2>
              <p className="options-section-subtitle">
                管理您的所有代理服务器配置，随时切换网络连接
              </p>
            </div>
          </div>
          
          <div className="options-content">
            {loading ? (
              <div className="options-loading">
                <div className="options-loading-spinner"></div>
                <div className="options-loading-text">加载中...</div>
              </div>
            ) : proxies.length === 0 ? (
              <div className="options-proxy-grid empty">
                <div className="options-empty-state">
                  <span className="options-empty-icon">🔄</span>
                  <h3 className="options-empty-title">暂无代理配置</h3>
                  <p className="options-empty-text">
                    点击上方的"添加新代理"按钮创建您的第一个代理配置，开始管理您的网络连接
                  </p>
                </div>
              </div>
            ) : (
              <div className="options-proxy-grid">
                {proxies.map(proxy => (
                  <div key={proxy.id}>
                    <ProxyCard
                      proxy={proxy}
                      onEdit={(proxy) => {
                        setEditingProxy(proxy)
                        setShowForm(true)
                      }}
                      onDelete={handleDeleteProxy}
                      onToggle={handleToggleProxy}
                      disabled={loading}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 代理表单弹窗 */}
      {showForm && (
        <ProxyForm
          proxy={editingProxy}
          onSave={handleSaveProxy}
          onCancel={() => {
            setShowForm(false)
            setEditingProxy(null)
          }}
          loading={loading}
        />
      )}

      {/* 提示消息 */}
      {toast.visible && (
        <div className={`options-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default OptionsPage
