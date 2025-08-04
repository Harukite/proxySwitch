import type { Message, MessageResponse, ProxyConfig } from "~utils/types"
import { getProxies, saveProxies, getActiveProxy, saveActiveProxy, addProxy as addProxyToStorage, updateProxy as updateProxyInStorage, deleteProxy as deleteProxyFromStorage } from "~utils/storage"
import { applyProxy, disableProxy, setBadge, clearBadge } from "~utils/proxy"

// 当前认证信息
let currentAuth: { username: string; password: string } | null = null

// 扩展安装时的初始化
chrome.runtime.onInstalled.addListener(() => {
  console.log('Modern Proxy Switch installed')
  // 确保代理被关闭
  disableProxy().catch(console.error)
  clearBadge()
})

// 浏览器启动时恢复代理状态
chrome.runtime.onStartup.addListener(async () => {
  try {
    const activeProxyId = await getActiveProxy()
    if (activeProxyId) {
      const proxies = await getProxies()
      const activeProxy = proxies.find(p => p.id === activeProxyId)
      if (activeProxy) {
        await applyProxy(activeProxy)
        setBadge(activeProxy.name.charAt(0).toUpperCase())
      } else {
        await saveActiveProxy(null)
        clearBadge()
      }
    }
  } catch (error) {
    console.error('Failed to restore proxy on startup:', error)
  }
})

// 监听来自popup的消息
chrome.runtime.onMessage.addListener((
  message: Message,
  sender,
  sendResponse: (response: MessageResponse) => void
) => {
  handleMessage(message).then(sendResponse).catch(error => {
    sendResponse({ success: false, error: error.message })
  })
  return true // 保持消息通道开放
})

// 处理消息
async function handleMessage(message: Message): Promise<MessageResponse> {
  switch (message.type) {
    case 'GET_PROXIES':
      const proxies = await getProxies()
      const activeProxyId = await getActiveProxy()
      const proxiesWithStatus = proxies.map(proxy => ({
        ...proxy,
        isActive: proxy.id === activeProxyId
      }))
      return { success: true, data: proxiesWithStatus }

    case 'ADD_PROXY':
      return await addProxy(message.data)

    case 'UPDATE_PROXY':
      return await updateProxy(message.data)

    case 'DELETE_PROXY':
      return await deleteProxy(message.data.id)

    case 'ACTIVATE_PROXY':
      return await activateProxy(message.data.id)

    case 'DISCONNECT_PROXY':
      return await disconnectProxy()

    case 'GET_STATUS':
      return await getProxyStatus()

    case 'IMPORT_PROXIES':
      return await importProxies(message.data)

    case 'EXPORT_PROXIES':
      return await exportProxies()

    default:
      return { success: false, error: 'Unknown message type' }
  }
}

// 添加代理
async function addProxy(proxyData: Omit<ProxyConfig, 'id'>): Promise<MessageResponse> {
  try {
    const newProxy = await addProxyToStorage(proxyData)
    return { success: true, data: newProxy }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// 更新代理
async function updateProxy(proxyData: ProxyConfig): Promise<MessageResponse> {
  try {
    await updateProxyInStorage(proxyData)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// 删除代理
async function deleteProxy(proxyId: string): Promise<MessageResponse> {
  try {
    // 如果要删除的代理正在使用，先断开连接
    const activeProxyId = await getActiveProxy()
    if (activeProxyId === proxyId) {
      await disconnectProxy()
    }
    
    await deleteProxyFromStorage(proxyId)
    return { success: true }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

// 激活代理
async function activateProxy(proxyId: string): Promise<MessageResponse> {
  try {
    const proxies = await getProxies()
    const proxy = proxies.find(p => p.id === proxyId)
    if (!proxy) {
      return { success: false, error: '代理不存在' }
    }
    
    // 设置认证信息
    if (proxy.username && proxy.password) {
      currentAuth = {
        username: proxy.username,
        password: proxy.password
      }
      setupAuthListener()
    } else {
      currentAuth = null
      removeAuthListener()
    }
    
    await applyProxy(proxy)
    await saveActiveProxy(proxyId)
    setBadge(proxy.name.charAt(0).toUpperCase())
    
    return { success: true, data: proxy }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// 断开代理
async function disconnectProxy(): Promise<MessageResponse> {
  try {
    await disableProxy()
    await saveActiveProxy(null)
    currentAuth = null
    removeAuthListener()
    clearBadge()
    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// 获取代理状态
async function getProxyStatus(): Promise<MessageResponse> {
  try {
    const activeProxyId = await getActiveProxy()
    let activeProxy = null
    
    if (activeProxyId) {
      const proxies = await getProxies()
      activeProxy = proxies.find(p => p.id === activeProxyId) || null
    }
    
    return {
      success: true,
      data: {
        isEnabled: !!activeProxy,
        currentProxy: activeProxy,
        connectionStatus: activeProxy ? 'connected' : 'disconnected'
      }
    }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// 导入代理
async function importProxies(newProxies: ProxyConfig[]): Promise<MessageResponse> {
  try {
    const existingProxies = await getProxies()
    const allProxies = [...existingProxies, ...newProxies]
    await saveProxies(allProxies)
    return { success: true, data: allProxies }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// 导出代理
async function exportProxies(): Promise<MessageResponse> {
  try {
    const proxies = await getProxies()
    return { success: true, data: proxies }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}

// 设置认证监听器
function setupAuthListener() {
  if (chrome.webRequest && chrome.webRequest.onAuthRequired) {
    chrome.webRequest.onAuthRequired.removeListener(handleAuthRequest)
    chrome.webRequest.onAuthRequired.addListener(
      handleAuthRequest,
      { urls: ['<all_urls>'] },
      ['asyncBlocking']
    )
  }
}

// 移除认证监听器
function removeAuthListener() {
  if (chrome.webRequest && chrome.webRequest.onAuthRequired) {
    chrome.webRequest.onAuthRequired.removeListener(handleAuthRequest)
  }
}

// 处理认证请求
function handleAuthRequest(
  details: chrome.webRequest.WebAuthenticationChallengeDetails
): chrome.webRequest.AuthCredentials | undefined {
  if (currentAuth && details.isProxy) {
    return {
      username: currentAuth.username,
      password: currentAuth.password
    }
  }
  return undefined
}
