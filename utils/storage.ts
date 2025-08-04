import type { ProxyConfig, ExtensionSettings } from './types'
import { detectLocationOnline, addLocationUpdateListener } from './location'

// 存储键名常量
export const STORAGE_KEYS = {
  PROXIES: 'proxies',
  SETTINGS: 'settings',
  ACTIVE_PROXY: 'activeProxy',
  PROXY_STATUS: 'proxyStatus'
} as const

// 获取代理列表
export const getProxies = async (): Promise<ProxyConfig[]> => {
  const result = await chrome.storage.sync.get(STORAGE_KEYS.PROXIES)
  return result[STORAGE_KEYS.PROXIES] || []
}

// 保存代理列表
export const saveProxies = async (proxies: ProxyConfig[]): Promise<void> => {
  await chrome.storage.sync.set({ [STORAGE_KEYS.PROXIES]: proxies })
}

// 获取设置
export const getSettings = async (): Promise<ExtensionSettings> => {
  const result = await chrome.storage.sync.get(STORAGE_KEYS.SETTINGS)
  const defaultSettings: ExtensionSettings = {
    autoConnect: false,
    showNotifications: true,
    theme: 'auto'
  }
  return { ...defaultSettings, ...result[STORAGE_KEYS.SETTINGS] }
}

// 保存设置
export const saveSettings = async (settings: ExtensionSettings): Promise<void> => {
  await chrome.storage.sync.set({ [STORAGE_KEYS.SETTINGS]: settings })
}

// 获取当前激活的代理
export const getActiveProxy = async (): Promise<string | null> => {
  const result = await chrome.storage.local.get(STORAGE_KEYS.ACTIVE_PROXY)
  return result[STORAGE_KEYS.ACTIVE_PROXY] || null
}

// 保存当前激活的代理ID
export const saveActiveProxy = async (proxyId: string | null): Promise<void> => {
  if (proxyId) {
    await chrome.storage.local.set({ [STORAGE_KEYS.ACTIVE_PROXY]: proxyId })
  } else {
    await chrome.storage.local.remove(STORAGE_KEYS.ACTIVE_PROXY)
  }
}

// 生成唯一ID
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// 添加代理
export const addProxy = async (proxy: Omit<ProxyConfig, 'id'>): Promise<ProxyConfig> => {
  const proxies = await getProxies()
  
  const newProxy: ProxyConfig = {
    ...proxy,
    id: generateId(),
  }
  
  // 先保存基本信息
  proxies.push(newProxy)
  await saveProxies(proxies)
  
  // 异步检测归属地（不阻塞保存操作）
  if (!newProxy.location && newProxy.host) {
    detectLocationOnline(newProxy.host).then(async locationInfo => {
      // 更新代理的归属地信息
      const updatedProxies = await getProxies()
      const index = updatedProxies.findIndex(p => p.id === newProxy.id)
      if (index !== -1) {
        updatedProxies[index].location = locationInfo.location
        updatedProxies[index].countryCode = locationInfo.countryCode
        await saveProxies(updatedProxies)
        
        // 发送消息通知background和popup更新
        try {
          chrome.runtime.sendMessage({
            type: 'PROXY_LOCATION_UPDATED',
            data: { 
              proxyId: newProxy.id, 
              host: newProxy.host,
              location: locationInfo.location,
              countryCode: locationInfo.countryCode 
            }
          })
        } catch (error) {
          // 忽略消息发送错误（可能没有活跃的接收者）
        }
      }
    }).catch(console.error)
  }
  
  return newProxy
}

// 更新代理
export const updateProxy = async (updatedProxy: ProxyConfig): Promise<void> => {
  const proxies = await getProxies()
  const index = proxies.findIndex(p => p.id === updatedProxy.id)
  
  if (index !== -1) {
    const oldHost = proxies[index].host
    
    // 先更新基本信息
    proxies[index] = updatedProxy
    await saveProxies(proxies)
    
    // 如果主机地址改变且没有归属地信息，异步检测
    if (oldHost !== updatedProxy.host && !updatedProxy.location) {
      detectLocationOnline(updatedProxy.host).then(async locationInfo => {
        const currentProxies = await getProxies()
        const currentIndex = currentProxies.findIndex(p => p.id === updatedProxy.id)
        if (currentIndex !== -1) {
          currentProxies[currentIndex].location = locationInfo.location
          currentProxies[currentIndex].countryCode = locationInfo.countryCode
          await saveProxies(currentProxies)
          
          // 发送消息通知更新
          try {
            chrome.runtime.sendMessage({
              type: 'PROXY_LOCATION_UPDATED',
              data: { 
                proxyId: updatedProxy.id, 
                host: updatedProxy.host,
                location: locationInfo.location,
                countryCode: locationInfo.countryCode 
              }
            })
          } catch (error) {
            // 忽略消息发送错误
          }
        }
      }).catch(console.error)
    }
  }
}

// 删除代理
export const deleteProxy = async (proxyId: string): Promise<void> => {
  const proxies = await getProxies()
  const filteredProxies = proxies.filter(p => p.id !== proxyId)
  await saveProxies(filteredProxies)
}

// 验证代理配置
export const validateProxyConfig = (config: Partial<ProxyConfig>): string[] => {
  const errors: string[] = []
  
  if (!config.name?.trim()) {
    errors.push('代理名称不能为空')
  }
  
  if (!config.host?.trim()) {
    errors.push('服务器地址不能为空')
  }
  
  if (!config.port || config.port < 1 || config.port > 65535) {
    errors.push('端口号必须在1-65535之间')
  }
  
  if (!config.type || !['http', 'https', 'socks4', 'socks5'].includes(config.type)) {
    errors.push('代理类型无效')
  }
  
  return errors
}
