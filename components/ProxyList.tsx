import React from 'react'
import type { ProxyConfig } from '../utils/types'
import { ProxyCardSimple } from './ProxyCardSimple'
import "../styles/proxy-card.css"

interface ProxyListProps {
  proxies: ProxyConfig[]
  onEdit: (proxy: ProxyConfig) => void
  onDelete: (id: string) => void
  onToggle: (id: string, enabled: boolean) => void
  loading: boolean
  activeProxyId?: string | null
}

export const ProxyList: React.FC<ProxyListProps> = ({
  proxies,
  onEdit,
  onDelete,
  onToggle,
  loading,
  activeProxyId
}) => {
  if (loading) {
    return (
      <div className="proxy-list-empty">
        <span className="proxy-list-empty-icon">⏳</span>
        <div className="proxy-list-empty-text">加载中...</div>
        <div className="proxy-list-empty-subtitle">正在获取代理列表</div>
      </div>
    )
  }

  return (
    <div className="proxy-list-container">
      {proxies.map((proxy) => {
        const isActive = proxy.id === activeProxyId
        return (
          <ProxyCardSimple
            key={proxy.id}
            proxy={proxy}
            isActive={isActive}
            onToggle={onToggle}
            onEdit={onEdit}
            onDelete={onDelete}
            disabled={loading}
          />
        )
      })}
      
      {proxies.length === 0 && (
        <div className="proxy-list-empty">
          <span className="proxy-list-empty-icon">�</span>
          <div className="proxy-list-empty-text">暂无代理配置</div>
          <div className="proxy-list-empty-subtitle">点击上方的"添加代理"按钮创建您的第一个代理配置，开始享受安全的网络浏览体验</div>
        </div>
      )}
    </div>
  )
}
