// 代理配置接口
export interface ProxyConfig {
  id: string
  name: string
  type: 'http' | 'https' | 'socks4' | 'socks5'
  host: string
  port: number
  username?: string
  password?: string
  isActive?: boolean
  isShowPassword?: boolean
  location?: string // 归属地信息
  countryCode?: string // 国家代码
}

// 代理状态
export interface ProxyStatus {
  isEnabled: boolean
  currentProxy: ProxyConfig | null
  connectionStatus: 'connected' | 'disconnected' | 'connecting' | 'error'
}

// 扩展设置
export interface ExtensionSettings {
  autoConnect: boolean
  showNotifications: boolean
  theme: 'light' | 'dark' | 'auto'
}

// 导入/导出数据结构
export interface ImportExportData {
  proxies: ProxyConfig[]
  settings?: ExtensionSettings
  version: string
}

// 消息传递类型
export type MessageType = 
  | 'GET_PROXIES'
  | 'ADD_PROXY'
  | 'UPDATE_PROXY'
  | 'DELETE_PROXY'
  | 'ACTIVATE_PROXY'
  | 'DISCONNECT_PROXY'
  | 'GET_STATUS'
  | 'IMPORT_PROXIES'
  | 'EXPORT_PROXIES'

export interface Message {
  type: MessageType
  data?: any
}

export interface MessageResponse {
  success: boolean
  data?: any
  error?: string
}
