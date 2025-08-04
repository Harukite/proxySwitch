import Papa from 'papaparse'
import type { ProxyConfig } from './types'
import { generateId, validateProxyConfig } from './storage'

// CSV列映射
const CSV_HEADERS = ['名称', '类型', 'IP地址', '端口', '用户名', '密码']

// 导出代理到CSV
export const exportProxiesToCSV = (proxies: ProxyConfig[]): string => {
  const csvData = proxies.map(proxy => [
    proxy.name,
    proxy.type.toUpperCase(),
    proxy.host,
    proxy.port.toString(),
    proxy.username || '',
    proxy.password || ''
  ])

  const csv = Papa.unparse({
    fields: CSV_HEADERS,
    data: csvData
  }, {
    header: true
  })

  return csv
}

// 从CSV导入代理
export const importProxiesFromCSV = async (csvContent: string): Promise<{
  success: ProxyConfig[]
  errors: string[]
}> => {
  const success: ProxyConfig[] = []
  const errors: string[] = []

  try {
    const result = Papa.parse<string[]>(csvContent, {
      header: false,
      skipEmptyLines: true
    })

    if (result.errors.length > 0) {
      errors.push('CSV格式错误：' + result.errors.map(e => e.message).join(', '))
      return { success, errors }
    }

    const rows = result.data
    
    // 跳过标题行（如果存在）
    const dataRows = rows[0] && rows[0].some(cell => CSV_HEADERS.includes(cell)) 
      ? rows.slice(1) 
      : rows

    dataRows.forEach((row, index) => {
      if (row.length < 4) {
        errors.push(`第${index + 1}行：数据不完整`)
        return
      }

      const [name, type, host, portStr, username, password] = row
      const port = parseInt(portStr, 10)

      // 创建代理配置对象
      const proxyConfig: Partial<ProxyConfig> = {
        id: generateId(),
        name: name?.trim(),
        type: type?.toLowerCase() as ProxyConfig['type'],
        host: host?.trim(),
        port,
        username: username?.trim() || undefined,
        password: password?.trim() || undefined,
        isActive: false,
        isShowPassword: false
      }

      // 验证配置
      const validationErrors = validateProxyConfig(proxyConfig)
      if (validationErrors.length > 0) {
        errors.push(`第${index + 1}行：${validationErrors.join(', ')}`)
        return
      }

      // 检查代理类型
      if (!['http', 'https', 'socks4', 'socks5'].includes(proxyConfig.type!)) {
        errors.push(`第${index + 1}行：不支持的代理类型 "${type}"`)
        return
      }

      success.push(proxyConfig as ProxyConfig)
    })

  } catch (error) {
    errors.push('解析CSV文件失败：' + (error as Error).message)
  }

  return { success, errors }
}

// 下载CSV文件
export const downloadCSV = (content: string, filename: string = 'proxies.csv'): void => {
  const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

// 读取文件内容
export const readFileAsText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      resolve(text)
    }
    reader.onerror = () => {
      reject(new Error('文件读取失败'))
    }
    reader.readAsText(file, 'utf-8')
  })
}

// 生成示例CSV内容
export const generateSampleCSV = (): string => {
  const sampleData = [
    ['代理1', 'HTTP', '192.168.1.100', '8080', 'user1', 'pass1'],
    ['代理2', 'HTTPS', '10.0.0.100', '3128', 'user2', 'pass2'],
    ['代理3', 'SOCKS5', '172.16.0.100', '1080', '', '']
  ]

  return Papa.unparse({
    fields: CSV_HEADERS,
    data: sampleData
  }, {
    header: true
  })
}
