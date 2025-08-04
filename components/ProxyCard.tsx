import React, { useState } from 'react'
import { Server, Eye, EyeOff, Edit, Trash2, Power, PowerOff } from 'lucide-react'
import type { ProxyConfig } from '~utils/types'
import '~styles/proxy-card-full.css'

interface ProxyCardProps {
  proxy: ProxyConfig
  onEdit: (proxy: ProxyConfig) => void
  onDelete: (id: string) => void
  onToggle: (id: string, enabled: boolean) => void
  disabled?: boolean
}

export const ProxyCard: React.FC<ProxyCardProps> = ({
  proxy,
  onEdit,
  onDelete,
  onToggle,
  disabled = false
}) => {
  const [showPassword, setShowPassword] = useState(proxy.isShowPassword || false)

  const handleToggle = () => {
    onToggle(proxy.id, !proxy.isActive)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit(proxy)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (confirm(`确定要删除代理 "${proxy.name}" 吗？`)) {
      onDelete(proxy.id)
    }
  }

  const togglePasswordVisibility = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowPassword(!showPassword)
  }

  return (
    <div className={`proxy-card ${proxy.isActive ? 'proxy-card--active' : ''} ${disabled ? 'proxy-card--disabled' : ''}`}>
      <div className="proxy-card__content">
        {/* 左侧：代理信息 */}
        <div className="proxy-card__info">
          <div className={`proxy-card__icon ${proxy.isActive ? 'proxy-card__icon--active' : ''}`}>
            <Server size={20} />
          </div>
          
          <div className="proxy-card__details">
            <div className="proxy-card__header">
              <h3 className="proxy-card__name">{proxy.name}</h3>
              <span className={`proxy-card__type proxy-card__type--${proxy.type}`}>
                {proxy.type.toUpperCase()}
              </span>
            </div>
            
            <p className="proxy-card__address">
              {proxy.host}:{proxy.port}
              {proxy.username && (
                <>
                  {' • '}
                  <span className="proxy-card__auth">
                    {proxy.username}
                    {proxy.password && (
                      <button
                        onClick={togglePasswordVisibility}
                        className="proxy-card__password-toggle"
                        title={showPassword ? '隐藏密码' : '显示密码'}
                      >
                        {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                    )}
                  </span>
                </>
              )}
            </p>
            
            {proxy.password && showPassword && (
              <p className="proxy-card__password">
                密码: {proxy.password}
              </p>
            )}
          </div>
        </div>

        {/* 右侧：操作按钮 */}
        <div className="proxy-card__actions">
          <button
            onClick={handleEdit}
            disabled={disabled}
            className="btn btn--edit"
            title="编辑"
          >
            <Edit size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={disabled || proxy.isActive}
            className="btn btn--delete"
            title="删除"
          >
            <Trash2 size={16} />
          </button>
          
          <div className="proxy-card__divider" />
          
          <button
            onClick={handleToggle}
            disabled={disabled}
            className={`btn btn--toggle ${proxy.isActive ? 'btn--toggle-active' : ''}`}
            title={proxy.isActive ? '断开连接' : '连接'}
          >
            {proxy.isActive ? <PowerOff size={18} /> : <Power size={18} />}
          </button>
        </div>
      </div>
      
      {/* 连接状态指示器 */}
      {proxy.isActive && (
        <div className="proxy-card__status">
          <div className="proxy-card__status-indicator">
            <div className="proxy-card__status-dot" />
            已连接
          </div>
        </div>
      )}
    </div>
  )
}
