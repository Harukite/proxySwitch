import React, { useState, useEffect } from 'react'
import { X, Eye, EyeOff, Save, Plus, MapPin, Loader2 } from 'lucide-react'
import type { ProxyConfig } from '~utils/types'
import { validateProxyConfig } from '~utils/storage'
import { detectLocationOnline, detectLocation, addLocationUpdateListener } from '~utils/location'
import '~styles/proxy-form.css'

interface ProxyFormProps {
  proxy?: ProxyConfig | null
  onSave: (proxy: Omit<ProxyConfig, 'id'> | ProxyConfig) => void
  onCancel: () => void
  loading?: boolean
}

export function ProxyForm({ proxy, onSave, onCancel, loading = false }: ProxyFormProps) {
  const [formData, setFormData] = useState({
    name: proxy?.name || '',
    type: proxy?.type || 'http' as const,
    host: proxy?.host || '',
    port: proxy?.port || 8080,
    username: proxy?.username || '',
    password: proxy?.password || '',
    isShowPassword: false
  })

  const [locationInfo, setLocationInfo] = useState<{ location: string; flag: string; isLoading: boolean }>({
    location: proxy?.location || '',
    flag: '',
    isLoading: false
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // 实时检测归属地 - 优化版本
  useEffect(() => {
    if (!formData.host.trim()) {
      setLocationInfo({ location: '', flag: '', isLoading: false })
      return
    }

    // 首先尝试同步获取（从缓存或快速检测）
    const syncInfo = detectLocation(formData.host)
    if (syncInfo.location === '查询中...') {
      setLocationInfo({ 
        location: syncInfo.location, 
        flag: syncInfo.flag, 
        isLoading: true 
      })
    } else {
      setLocationInfo({ 
        location: syncInfo.location, 
        flag: syncInfo.flag, 
        isLoading: false 
      })
    }

    // 添加位置更新监听器
    const removeListener = addLocationUpdateListener((host, locationInfo) => {
      if (host.toLowerCase() === formData.host.toLowerCase()) {
        setLocationInfo({
          location: locationInfo.location,
          flag: locationInfo.flag,
          isLoading: false
        })
      }
    })

    // 清理监听器
    return removeListener
  }, [formData.host])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // 验证表单
    const validationErrors = validateProxyConfig({
      id: '',
      ...formData,
      location: locationInfo.location,
      countryCode: locationInfo.location === '查询中...' ? undefined : 'auto-detected'
    })

    if (validationErrors.length > 0) {
      // 将错误数组转换为错误对象
      const errorObj: Record<string, string> = {}
      validationErrors.forEach(error => {
        if (error.includes('名称')) errorObj.name = error
        if (error.includes('主机') || error.includes('地址')) errorObj.host = error
        if (error.includes('端口')) errorObj.port = error
      })
      setErrors(errorObj)
      return
    }

    setErrors({})
    onSave({
      ...formData,
      location: locationInfo.location,
      countryCode: locationInfo.location === '查询中...' ? undefined : 'auto-detected'
    })
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // 清除相关错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="proxy-form-overlay">
      <div className="proxy-form-dialog">
        <div className="proxy-form-header">
          <h2 className="proxy-form-title">{proxy ? '编辑代理' : '添加代理'}</h2>
          <button 
            className="proxy-form-close"
            onClick={onCancel}
            disabled={loading}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        {/* 错误提示 */}
        {Object.keys(errors).length > 0 && (
          <div className="proxy-form-errors">
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="proxy-form-form">
          <div className="proxy-form-basic-section">
            <div className="proxy-form-field">
              <label htmlFor="name">代理名称</label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="请输入代理名称"
                disabled={loading}
                className={errors.name ? 'error' : ''}
              />
            </div>

            <div className="proxy-form-field">
              <label htmlFor="type">代理类型</label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleInputChange('type', e.target.value as ProxyConfig['type'])}
                disabled={loading}
              >
                <option value="http">HTTP</option>
                <option value="https">HTTPS</option>
                <option value="socks4">SOCKS4</option>
                <option value="socks5">SOCKS5</option>
              </select>
            </div>

            <div className="proxy-form-row">
              <div className="proxy-form-field">
                <label htmlFor="host">服务器地址</label>
                <input
                  id="host"
                  type="text"
                  value={formData.host}
                  onChange={(e) => handleInputChange('host', e.target.value)}
                  placeholder="IP地址或域名"
                  disabled={loading}
                  className={errors.host ? 'error' : ''}
                />
              </div>

              <div className="proxy-form-field">
                <label htmlFor="port">端口</label>
                <input
                  id="port"
                  type="number"
                  min="1"
                  max="65535"
                  value={formData.port}
                  onChange={(e) => handleInputChange('port', parseInt(e.target.value) || 8080)}
                  disabled={loading}
                  className={errors.port ? 'error' : ''}
                />
              </div>
            </div>

            {/* 归属地显示 */}
            {formData.host && (
              <div className="location-info">
                <MapPin size={14} />
                <span>归属地：</span>
                {locationInfo.isLoading ? (
                  <span className="location-loading">
                    <Loader2 size={14} className="spin" />
                    查询中...
                  </span>
                ) : (
                  <span className="location-display">
                    {locationInfo.flag} {locationInfo.location}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="proxy-form-section">
            <div className="proxy-form-section-title">认证信息</div>
            <div className="proxy-form-auth-fields">
              <div className="proxy-form-field">
                <label htmlFor="username">用户名（可选）</label>
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  placeholder="代理认证用户名"
                  disabled={loading}
                />
              </div>

              <div className="proxy-form-field proxy-form-password-field">
                <label htmlFor="password">密码（可选）</label>
                <div className="proxy-form-password-wrapper">
                  <input
                    id="password"
                    type={formData.isShowPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="代理认证密码"
                    disabled={loading}
                    style={{ paddingRight: '3rem' }}
                  />
                  <button
                    type="button"
                    className="proxy-form-password-toggle"
                    onClick={() => setFormData(prev => ({ ...prev, isShowPassword: !prev.isShowPassword }))}
                    disabled={loading}
                  >
                    {formData.isShowPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="proxy-form-actions">
            <button
              type="button"
              className="proxy-form-btn proxy-form-btn--cancel"
              onClick={onCancel}
              disabled={loading}
            >
              取消
            </button>
            <button
              type="submit"
              className={`proxy-form-btn proxy-form-btn--submit ${loading ? 'proxy-form-btn--loading' : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="proxy-form-loading-spinner" />
                  保存中...
                </>
              ) : (
                <>
                  <Save size={16} />
                  保存
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
