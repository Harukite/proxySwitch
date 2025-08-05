import React, { useState, useEffect } from "react"
import { Plus, RefreshCw, Wifi, WifiOff, Github, Twitter } from "lucide-react"
import type { ProxyConfig, Message, MessageResponse } from "~utils/types"
import { Button, LoadingSpinner, Toast } from "~components/UI"
import { ProxyList } from "~components/ProxyList"
import "~styles/global.css"
import "~styles/popup.css"

function IndexPopup() {
  const [proxies, setProxies] = useState<ProxyConfig[]>([])
  const [loading, setLoading] = useState(true)
  const [activeProxyId, setActiveProxyId] = useState<string | null>(null)
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
        // 找到当前激活的代理
        const active = response.data?.find((p: ProxyConfig) => p.isActive)
        setActiveProxyId(active?.id || null)
      } else {
        showToast(response.error || '加载代理列表失败', 'error')
      }
    } catch (error) {
      showToast('加载代理列表失败', 'error')
    } finally {
      setLoading(false)
    }
  }

  // 初始化和监听消息
  useEffect(() => {
    loadProxies()

    // 监听来自background的消息
    const messageListener = (message: any) => {
      if (message.type === 'PROXY_LOCATION_UPDATED') {
        // 更新对应代理的位置信息
        setProxies(prev => prev.map(proxy => 
          proxy.id === message.data.proxyId 
            ? { 
                ...proxy, 
                location: message.data.location,
                countryCode: message.data.countryCode 
              }
            : proxy
        ))
      }
    }

    chrome.runtime.onMessage.addListener(messageListener)

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener)
    }
  }, [])

  // 切换代理状态
  const handleToggleProxy = async (id: string, enabled: boolean) => {
    try {
      if (enabled) {
        // 激活代理
        const response = await sendMessage({ type: 'ACTIVATE_PROXY', data: { id } })
        if (response.success) {
          setActiveProxyId(id)
          await loadProxies()
          showToast('代理连接成功', 'success')
        } else {
          showToast(response.error || '连接失败', 'error')
        }
      } else {
        // 断开代理
        const response = await sendMessage({ type: 'DISCONNECT_PROXY' })
        if (response.success) {
          setActiveProxyId(null)
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

  // 编辑代理 - 跳转到选项页面
  const handleEditProxy = (proxy: ProxyConfig) => {
    // 保存要编辑的代理ID到storage，然后跳转到选项页面
    chrome.storage.local.set({ editingProxyId: proxy.id }, () => {
      chrome.runtime.openOptionsPage()
    })
  }

  // 打开选项页面
  const openOptionsPage = () => {
    chrome.runtime.openOptionsPage()
  }

  return (
    <div className="popup-container">
      {/* 头部 */}
      <div className="popup-header">
        <div className="popup-header-top">
          <div className="popup-logo">
            <div className="popup-logo-icon">
              {activeProxyId ? (
                <Wifi size={26} />
              ) : (
                <WifiOff size={26} />
              )}
            </div>
            <div className="popup-logo-text">
              <h1 className="popup-logo-title">代理切换器</h1>
              <p className="popup-logo-subtitle">Modern Proxy Switch</p>
            </div>
          </div>
          
          <div className={`popup-status ${activeProxyId ? 'connected' : 'disconnected'}`}>
            {activeProxyId ? (
              <>
                <div style={{width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%'}}></div>
                已连接 • {proxies.find(p => p.id === activeProxyId)?.name || '未知'}
              </>
            ) : (
              <>
                <div style={{width: '8px', height: '8px', backgroundColor: '#6b7280', borderRadius: '50%'}}></div>
                未连接
              </>
            )}
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="popup-actions">
          <button
            onClick={openOptionsPage}
            className="popup-button popup-button-primary"
          >
            <Plus size={18} />
            <span>添加代理</span>
          </button>
          
          <button
            onClick={loadProxies}
            disabled={loading}
            className="popup-button popup-button-secondary"
            title="刷新列表"
          >
            <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* 代理列表 */}
      <div className="popup-content">
        {loading ? (
          <div className="popup-loading">
            <div className="popup-loading-spinner"></div>
            <div className="popup-loading-text">加载中...</div>
          </div>
        ) : (
          <ProxyList
            proxies={proxies}
            onEdit={handleEditProxy}
            onDelete={handleDeleteProxy}
            onToggle={handleToggleProxy}
            loading={loading}
            activeProxyId={activeProxyId}
          />
        )}
      </div>

      {/* 底部链接 */}
      <div className="popup-footer">
        <div className="popup-footer-links">
          <a 
            href="https://github.com/Harukite/proxySwitch" 
            target="_blank" 
            rel="noopener noreferrer"
            className="popup-footer-link"
            title="查看源代码"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a 
            href="https://x.com/amzHaruki" 
            target="_blank" 
            rel="noopener noreferrer"
            className="popup-footer-link"
            title="联系开发者"
          >
            <Twitter size={14} />
            <span>@amzHaruki</span>
          </a>
        </div>
      </div>

      {/* 提示消息 */}
      {toast.visible && (
        <div className={`popup-toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
  )
}

export default IndexPopup
