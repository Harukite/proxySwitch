import type { ProxyConfig } from './types'

// 应用代理设置
export const applyProxy = async (config: ProxyConfig): Promise<void> => {
  const proxyConfig: chrome.proxy.ProxyConfig = {
    mode: 'fixed_servers',
    rules: {
      singleProxy: {
        scheme: config.type,
        host: config.host,
        port: config.port
      },
      bypassList: ['localhost', '127.0.0.1', '<local>']
    }
  }

  return new Promise((resolve, reject) => {
    chrome.proxy.settings.set(
      { value: proxyConfig, scope: 'regular' },
      () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      }
    )
  })
}

// 关闭代理
export const disableProxy = async (): Promise<void> => {
  const config: chrome.proxy.ProxyConfig = {
    mode: 'system'
  }

  return new Promise((resolve, reject) => {
    chrome.proxy.settings.set(
      { value: config, scope: 'regular' },
      () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message))
        } else {
          resolve()
        }
      }
    )
  })
}

// 设置扩展角标
export const setBadge = (text: string, color: string = '#4CAF50'): void => {
  chrome.action.setBadgeText({ text })
  chrome.action.setBadgeBackgroundColor({ color })
}

// 清除角标
export const clearBadge = (): void => {
  chrome.action.setBadgeText({ text: '' })
}

// 显示通知
export const showNotification = (title: string, message: string): void => {
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon.png',
    title,
    message
  })
}

// 检查代理连接状态
export const checkProxyConnection = async (config: ProxyConfig): Promise<boolean> => {
  try {
    // 这里可以添加实际的连接测试逻辑
    // 比如通过fetch请求测试代理是否可用
    return true
  } catch (error) {
    console.error('Proxy connection test failed:', error)
    return false
  }
}

// 获取当前代理设置
export const getCurrentProxySettings = async (): Promise<chrome.proxy.ProxyConfig> => {
  return new Promise((resolve) => {
    chrome.proxy.settings.get({}, (details) => {
      resolve(details.value)
    })
  })
}
