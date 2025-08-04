import React, { useEffect, useRef, useState } from 'react'
import { Server, Edit, Trash2, Power, PowerOff, MapPin } from 'lucide-react'
import type { ProxyConfig } from '~utils/types'
import { getLocationDisplay, addLocationUpdateListener } from '~utils/location'
import "~styles/proxy-card.css"

interface ProxyCardSimpleProps {
  proxy: ProxyConfig
  isActive: boolean
  onToggle: (id: string, enabled: boolean) => void
  onEdit: (proxy: ProxyConfig) => void
  onDelete: (id: string) => void
  disabled?: boolean
}

export const ProxyCardSimple: React.FC<ProxyCardSimpleProps> = ({
  proxy,
  isActive,
  onToggle,
  onEdit,
  onDelete,
  disabled = false
}) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const [needsMarquee, setNeedsMarquee] = useState(false)
  const [currentLocationDisplay, setCurrentLocationDisplay] = useState(() => getLocationDisplay(proxy.host))

  // 监听位置更新
  useEffect(() => {
    const removeListener = addLocationUpdateListener((host, locationInfo) => {
      if (host.toLowerCase() === proxy.host.toLowerCase()) {
        setCurrentLocationDisplay(`${locationInfo.flag} ${locationInfo.location}`)
      }
    })

    return removeListener
  }, [proxy.host])

  // 当proxy.host变化时，更新位置显示
  useEffect(() => {
    setCurrentLocationDisplay(getLocationDisplay(proxy.host))
  }, [proxy.host])

  useEffect(() => {
    if (hostRef.current) {
      const element = hostRef.current
      // 使用 requestAnimationFrame 确保DOM已完全渲染
      requestAnimationFrame(() => {
        const isOverflowing = element.scrollWidth > element.clientWidth + 1 // 添加1px容差
        setNeedsMarquee(isOverflowing)
      })
    }
  }, [proxy.host])

  const handleToggle = () => {
    onToggle(proxy.id, !isActive)
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

  return (
    <div className={`proxy-card ${isActive ? 'active' : ''} ${disabled ? 'disabled' : ''}`}>
      <div className="proxy-card-content">
        {/* 切换按钮 */}
        <button
          onClick={handleToggle}
          disabled={disabled}
          className={`power-button ${isActive ? 'active' : 'inactive'}`}
          title={isActive ? '断开连接' : '连接'}
        >
          {isActive ? (
            <PowerOff size={22} />
          ) : (
            <Power size={22} />
          )}
        </button>

        {/* 代理信息 */}
        <div className="proxy-info">
          <div className="proxy-header">
            <h3 className="proxy-name">{proxy.name}</h3>
            <span className={`proxy-type-badge proxy-type-${proxy.type}`}>
              {proxy.type.toUpperCase()}
            </span>
            {isActive && (
              <span className="proxy-status-badge">
                • 已连接
              </span>
            )}
          </div>
          
          <div className="proxy-details">
            <div className='w-6 h-6'> <Server size={16} /></div>
            <div 
              ref={hostRef}
              className={`proxy-host ${needsMarquee ? 'proxy-host-marquee' : ''}`}
            >
              {needsMarquee ? (
                <span className="proxy-host-text" data-text={proxy.host}>
                  {proxy.host}
                </span>
              ) : (
                <span className="proxy-host-text">
                  {proxy.host}
                </span>
              )}
            </div>
          </div>
          
          <div className="proxy-location">
            <div className='w-6 h-6'> <MapPin size={16} /></div>
            <span className="location-text">
              {currentLocationDisplay}
            </span>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="proxy-actions">
          <button
            onClick={handleEdit}
            disabled={disabled}
            className="action-button edit-button"
            title="编辑代理"
          >
            <Edit size={16} />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={disabled || isActive}
            className="action-button delete-button"
            title="删除代理"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
