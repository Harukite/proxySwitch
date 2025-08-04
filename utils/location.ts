// IP地址归属地检测工具 - 使用在线API
interface LocationInfo {
  location: string
  countryCode: string
  flag: string
  city?: string
  region?: string
  isp?: string
}

// 位置更新事件类型
type LocationUpdateListener = (host: string, locationInfo: LocationInfo) => void

// 监听器管理
const locationUpdateListeners = new Set<LocationUpdateListener>()

// 添加位置更新监听器
export function addLocationUpdateListener(listener: LocationUpdateListener): () => void {
  locationUpdateListeners.add(listener)
  // 返回移除监听器的函数
  return () => locationUpdateListeners.delete(listener)
}

// 触发位置更新事件
function notifyLocationUpdate(host: string, locationInfo: LocationInfo): void {
  locationUpdateListeners.forEach(listener => {
    try {
      listener(host, locationInfo)
    } catch (error) {
      console.error('Location update listener error:', error)
    }
  })
}

// 国家代码到国旗的映射
const countryFlags: Record<string, string> = {
  'CN': '🇨🇳', 'US': '🇺🇸', 'JP': '🇯🇵', 'KR': '🇰🇷', 'SG': '🇸🇬',
  'HK': '🇭🇰', 'TW': '🇹🇼', 'GB': '🇬🇧', 'UK': '🇬🇧', 'DE': '🇩🇪',
  'FR': '🇫🇷', 'NL': '🇳🇱', 'RU': '🇷🇺', 'CA': '🇨🇦', 'AU': '🇦🇺',
  'BR': '🇧🇷', 'IN': '🇮🇳', 'IT': '🇮🇹', 'ES': '🇪🇸', 'SE': '🇸🇪',
  'NO': '🇳🇴', 'FI': '🇫🇮', 'DK': '🇩🇰', 'CH': '🇨🇭', 'AT': '🇦🇹',
  'BE': '🇧🇪', 'IE': '🇮🇪', 'PT': '🇵🇹', 'GR': '🇬🇷', 'PL': '🇵🇱',
  'CZ': '🇨🇿', 'HU': '🇭🇺', 'SK': '🇸🇰', 'SI': '🇸🇮', 'HR': '🇭🇷',
  'BG': '🇧🇬', 'RO': '🇷🇴', 'LT': '🇱🇹', 'LV': '🇱🇻', 'EE': '🇪🇪',
  'UA': '🇺🇦', 'BY': '🇧🇾', 'MD': '🇲🇩', 'GE': '🇬🇪', 'AM': '🇦🇲',
  'AZ': '🇦🇿', 'KZ': '🇰🇿', 'UZ': '🇺🇿', 'KG': '🇰🇬', 'TJ': '🇹🇯',
  'TM': '🇹🇲', 'MN': '🇲🇳', 'MM': '🇲🇲', 'LA': '🇱🇦', 'KH': '🇰🇭',
  'VN': '🇻🇳', 'TH': '🇹🇭', 'MY': '🇲🇾', 'ID': '🇮🇩', 'PH': '🇵🇭',
  'BD': '🇧🇩', 'PK': '🇵🇰', 'LK': '🇱🇰', 'NP': '🇳🇵', 'AF': '🇦🇫',
  'IR': '🇮🇷', 'IQ': '🇮🇶', 'SY': '🇸🇾', 'LB': '🇱🇧', 'JO': '🇯🇴',
  'PS': '🇵🇸', 'IL': '🇮🇱', 'SA': '🇸🇦', 'AE': '🇦🇪', 'QA': '🇶🇦',
  'KW': '🇰🇼', 'BH': '🇧🇭', 'OM': '🇴🇲', 'YE': '🇾🇪', 'EG': '🇪🇬',
  'LY': '🇱🇾', 'TN': '🇹🇳', 'DZ': '🇩🇿', 'MA': '🇲🇦', 'ZA': '🇿🇦',
  'NG': '🇳🇬', 'KE': '🇰🇪', 'ET': '🇪🇹', 'GH': '🇬🇭', 'UG': '🇺🇬',
  'TZ': '🇹🇿', 'MZ': '🇲🇿', 'ZW': '🇿🇼', 'BW': '🇧🇼', 'ZM': '🇿🇲',
  'MW': '🇲🇼', 'MG': '🇲🇬', 'MU': '🇲🇺', 'SC': '🇸🇨', 'CV': '🇨🇻',
  'MX': '🇲🇽', 'GT': '🇬🇹', 'BZ': '🇧🇿', 'CR': '🇨🇷', 'PA': '🇵🇦',
  'CO': '🇨🇴', 'VE': '🇻🇪', 'GY': '🇬🇾', 'SR': '🇸🇷', 'GF': '🇬🇫',
  'EC': '🇪🇨', 'PE': '🇵🇪', 'BO': '🇧🇴', 'PY': '🇵🇾', 'UY': '🇺🇾',
  'AR': '🇦🇷', 'CL': '🇨🇱', 'FK': '🇫🇰', 'NZ': '🇳🇿', 'FJ': '🇫🇯',
  'NC': '🇳🇨', 'PG': '🇵🇬', 'SB': '🇸🇧', 'VU': '🇻🇺', 'TO': '🇹🇴',
  'WS': '🇼🇸', 'KI': '🇰🇮', 'TV': '🇹🇻', 'NR': '🇳🇷', 'PW': '🇵🇼',
  'FM': '🇫🇲', 'MH': '🇲🇭', 'MP': '🇲🇵', 'GU': '🇬🇺', 'AS': '🇦🇸',
  'PR': '🇵🇷', 'VI': '🇻🇮', 'TC': '🇹🇨', 'VG': '🇻🇬', 'AI': '🇦🇮',
}

// 国家代码到中文名称的映射
const countryNames: Record<string, string> = {
  'CN': '中国', 'US': '美国', 'JP': '日本', 'KR': '韩国', 'SG': '新加坡',
  'HK': '香港', 'TW': '台湾', 'GB': '英国', 'UK': '英国', 'DE': '德国',
  'FR': '法国', 'NL': '荷兰', 'RU': '俄罗斯', 'CA': '加拿大', 'AU': '澳大利亚',
  'BR': '巴西', 'IN': '印度', 'IT': '意大利', 'ES': '西班牙', 'SE': '瑞典',
  'NO': '挪威', 'FI': '芬兰', 'DK': '丹麦', 'CH': '瑞士', 'AT': '奥地利',
  'BE': '比利时', 'IE': '爱尔兰', 'PT': '葡萄牙', 'GR': '希腊', 'PL': '波兰',
  'CZ': '捷克', 'HU': '匈牙利', 'SK': '斯洛伐克', 'SI': '斯洛文尼亚',
  'HR': '克罗地亚', 'BG': '保加利亚', 'RO': '罗马尼亚', 'LT': '立陶宛',
  'LV': '拉脱维亚', 'EE': '爱沙尼亚', 'UA': '乌克兰', 'BY': '白俄罗斯',
  'MD': '摩尔多瓦', 'GE': '格鲁吉亚', 'AM': '亚美尼亚', 'AZ': '阿塞拜疆',
  'KZ': '哈萨克斯坦', 'UZ': '乌兹别克斯坦', 'KG': '吉尔吉斯斯坦',
  'TJ': '塔吉克斯坦', 'TM': '土库曼斯坦', 'MN': '蒙古', 'MM': '缅甸',
  'LA': '老挝', 'KH': '柬埔寨', 'VN': '越南', 'TH': '泰国', 'MY': '马来西亚',
  'ID': '印度尼西亚', 'PH': '菲律宾', 'BD': '孟加拉国', 'PK': '巴基斯坦',
  'LK': '斯里兰卡', 'NP': '尼泊尔', 'AF': '阿富汗', 'IR': '伊朗',
  'IQ': '伊拉克', 'SY': '叙利亚', 'LB': '黎巴嫩', 'JO': '约旦',
  'PS': '巴勒斯坦', 'IL': '以色列', 'SA': '沙特阿拉伯', 'AE': '阿联酋',
  'QA': '卡塔尔', 'KW': '科威特', 'BH': '巴林', 'OM': '阿曼', 'YE': '也门',
  'EG': '埃及', 'LY': '利比亚', 'TN': '突尼斯', 'DZ': '阿尔及利亚',
  'MA': '摩洛哥', 'ZA': '南非', 'NG': '尼日利亚', 'KE': '肯尼亚',
  'ET': '埃塞俄比亚', 'GH': '加纳', 'UG': '乌干达', 'TZ': '坦桑尼亚',
  'MZ': '莫桑比克', 'ZW': '津巴布韦', 'BW': '博茨瓦纳', 'ZM': '赞比亚',
  'MW': '马拉维', 'MG': '马达加斯加', 'MU': '毛里求斯', 'SC': '塞舌尔',
  'CV': '佛得角', 'MX': '墨西哥', 'GT': '危地马拉', 'BZ': '伯利兹',
  'CR': '哥斯达黎加', 'PA': '巴拿马', 'CO': '哥伦比亚', 'VE': '委内瑞拉',
  'GY': '圭亚那', 'SR': '苏里南', 'GF': '法属圭亚那', 'EC': '厄瓜多尔',
  'PE': '秘鲁', 'BO': '玻利维亚', 'PY': '巴拉圭', 'UY': '乌拉圭',
  'AR': '阿根廷', 'CL': '智利', 'FK': '福克兰群岛', 'NZ': '新西兰',
  'FJ': '斐济', 'NC': '新喀里多尼亚', 'PG': '巴布亚新几内亚',
  'SB': '所罗门群岛', 'VU': '瓦努阿图', 'TO': '汤加', 'WS': '萨摩亚',
  'KI': '基里巴斯', 'TV': '图瓦卢', 'NR': '瑙鲁', 'PW': '帕劳',
  'FM': '密克罗尼西亚', 'MH': '马绍尔群岛', 'MP': '北马里亚纳群岛',
  'GU': '关岛', 'AS': '美属萨摩亚', 'PR': '波多黎各', 'VI': '美属维尔京群岛',
  'TC': '特克斯和凯科斯群岛', 'VG': '英属维尔京群岛', 'AI': '安圭拉',
}

// API响应接口
interface IPAPIResponse {
  status: string
  country: string
  countryCode: string
  region: string
  regionName: string
  city: string
  zip: string
  lat: number
  lon: number
  timezone: string
  isp: string
  org: string
  as: string
  query: string
}

interface IPInfoResponse {
  ip: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  timezone: string
}

// IP地址缓存 - 用于避免重复查询
const locationCache = new Map<string, { data: LocationInfo; timestamp: number }>()
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24小时缓存过期时间

/**
 * 使用免费API检测IP地址归属地
 * @param host IP地址或域名
 * @returns 归属地信息Promise
 */
export async function detectLocationOnline(host: string): Promise<LocationInfo> {
  const cleanHost = host.toLowerCase().trim()
  
  // 检查缓存
  const cached = locationCache.get(cleanHost)
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    return cached.data
  }
  
  // 处理特殊地址
  if (cleanHost === '127.0.0.1' || cleanHost === 'localhost') {
    const result = { location: '本地主机', countryCode: 'LOCALHOST', flag: '💻' }
    locationCache.set(cleanHost, { data: result, timestamp: Date.now() })
    return result
  }
  
  // 检查私有IP地址
  if (/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
    const segments = cleanHost.split('.').map(Number)
    const [first, second] = segments
    
    if (first === 192 && second === 168) {
      const result = { location: '本地网络', countryCode: 'LOCAL', flag: '🏠' }
      locationCache.set(cleanHost, { data: result, timestamp: Date.now() })
      return result
    }
    if (first === 10) {
      const result = { location: '本地网络', countryCode: 'LOCAL', flag: '🏠' }
      locationCache.set(cleanHost, { data: result, timestamp: Date.now() })
      return result
    }
    if (first === 172 && second >= 16 && second <= 31) {
      const result = { location: '本地网络', countryCode: 'LOCAL', flag: '🏠' }
      locationCache.set(cleanHost, { data: result, timestamp: Date.now() })
      return result
    }
  }
  
  // 如果是域名，先进行域名后缀快速判断
  let targetIP = cleanHost
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
    const parts = cleanHost.split('.')
    if (parts.length >= 2) {
      const tld = parts[parts.length - 1]
      const domainLocationMap: Record<string, LocationInfo> = {
        'cn': { location: '中国', countryCode: 'CN', flag: '🇨🇳' },
        'us': { location: '美国', countryCode: 'US', flag: '🇺🇸' },
        'jp': { location: '日本', countryCode: 'JP', flag: '🇯🇵' },
        'kr': { location: '韩国', countryCode: 'KR', flag: '🇰🇷' },
        'sg': { location: '新加坡', countryCode: 'SG', flag: '🇸🇬' },
        'hk': { location: '香港', countryCode: 'HK', flag: '🇭🇰' },
        'tw': { location: '台湾', countryCode: 'TW', flag: '🇹🇼' },
        'de': { location: '德国', countryCode: 'DE', flag: '🇩🇪' },
        'fr': { location: '法国', countryCode: 'FR', flag: '🇫🇷' },
        'nl': { location: '荷兰', countryCode: 'NL', flag: '🇳🇱' },
        'ru': { location: '俄罗斯', countryCode: 'RU', flag: '🇷🇺' },
        'ca': { location: '加拿大', countryCode: 'CA', flag: '🇨🇦' },
        'au': { location: '澳大利亚', countryCode: 'AU', flag: '🇦🇺' },
        'uk': { location: '英国', countryCode: 'GB', flag: '🇬🇧' },
      }
      
      if (domainLocationMap[tld]) {
        const result = domainLocationMap[tld]
        locationCache.set(cleanHost, { data: result, timestamp: Date.now() })
        return result
      }
    }
  }
  
  // 尝试多个免费API
  const apis = [
    () => fetchFromIPAPI(targetIP),
    () => fetchFromIPInfo(targetIP),
  ]
  
  for (const api of apis) {
    try {
      const result = await api()
      if (result) {
        locationCache.set(cleanHost, { data: result, timestamp: Date.now() })
        // 通知监听器位置信息已更新
        notifyLocationUpdate(cleanHost, result)
        return result
      }
    } catch (error) {
      console.warn('API调用失败:', error)
      continue
    }
  }
  
  // 所有API都失败，返回默认值
  const fallback = { location: '未知', countryCode: 'UNKNOWN', flag: '🌐' }
  locationCache.set(cleanHost, { data: fallback, timestamp: Date.now() })
  notifyLocationUpdate(cleanHost, fallback)
  return fallback
}

/**
 * 使用ip-api.com获取归属地信息（免费，无需API密钥）
 */
async function fetchFromIPAPI(ip: string): Promise<LocationInfo | null> {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?lang=zh-CN&fields=status,country,countryCode,region,regionName,city,isp,query`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) return null
    
    const data: IPAPIResponse = await response.json()
    if (data.status !== 'success') return null
    
    const countryCode = data.countryCode
    const flag = countryFlags[countryCode] || '🌐'
    const countryName = countryNames[countryCode] || data.country
    
    return {
      location: data.city ? `${countryName} ${data.city}` : countryName,
      countryCode,
      flag,
      city: data.city,
      region: data.regionName,
      isp: data.isp
    }
  } catch (error) {
    console.warn('IP-API调用失败:', error)
    return null
  }
}

/**
 * 使用ipinfo.io获取归属地信息（免费，但有请求限制）
 */
async function fetchFromIPInfo(ip: string): Promise<LocationInfo | null> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}/json`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) return null
    
    const data: IPInfoResponse = await response.json()
    const countryCode = data.country
    const flag = countryFlags[countryCode] || '🌐'
    const countryName = countryNames[countryCode] || data.country
    
    return {
      location: data.city ? `${countryName} ${data.city}` : countryName,
      countryCode,
      flag,
      city: data.city,
      region: data.region,
      isp: data.org
    }
  } catch (error) {
    console.warn('IPInfo调用失败:', error)
    return null
  }
}

// 使用旧的IP范围检测作为备用方案
const ipRangeList: Array<{ pattern: RegExp; info: LocationInfo }> = [
  // 中国
  { pattern: /^(1|14|27|36|39|42|58|59|60|61|101|103|106|110|111|112|113|114|115|116|117|118|119|120|121|122|123|124|125)\./, info: { location: '中国', countryCode: 'CN', flag: '🇨🇳' }},
  // 美国
  { pattern: /^(3|4|6|7|8|9|11|12|13|15|16|17|18|19|20|23|24|34|35|40|44|45|47|50|52|54|63|64|65|66|67|68|69|70|71|72|73|74|75|76)\./, info: { location: '美国', countryCode: 'US', flag: '🇺🇸' }},
  // 其他国家
  { pattern: /^(126|133|153|210|211|218|219|220)\./, info: { location: '日本', countryCode: 'JP', flag: '🇯🇵' }},
]

/**
 * 兼容旧版本的同步检测函数（优先使用缓存，不存在则返回默认值并触发异步查询）
 * @param host IP地址或域名
 * @returns 归属地信息
 */
export function detectLocation(host: string): LocationInfo {
  const cleanHost = host.toLowerCase().trim()
  
  // 检查缓存
  const cached = locationCache.get(cleanHost)
  if (cached && Date.now() - cached.timestamp < CACHE_EXPIRY) {
    return cached.data
  }
  
  // 快速检查特殊地址
  if (cleanHost === '127.0.0.1' || cleanHost === 'localhost') {
    return { location: '本地主机', countryCode: 'LOCALHOST', flag: '💻' }
  }
  
  // 检查私有IP
  if (/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
    const segments = cleanHost.split('.').map(Number)
    const [first, second] = segments
    
    if (first === 192 && second === 168) {
      return { location: '本地网络', countryCode: 'LOCAL', flag: '�' }
    }
    if (first === 10) {
      return { location: '本地网络', countryCode: 'LOCAL', flag: '�' }
    }
    if (first === 172 && second >= 16 && second <= 31) {
      return { location: '本地网络', countryCode: 'LOCAL', flag: '�' }
    }
    
    // 尝试使用备用IP段检测
    for (const { pattern, info } of ipRangeList) {
      if (pattern.test(cleanHost)) {
        return info
      }
    }
  }
  
  // 域名后缀快速判断
  if (!/^\d+\.\d+\.\d+\.\d+$/.test(cleanHost)) {
    const parts = cleanHost.split('.')
    if (parts.length >= 2) {
      const tld = parts[parts.length - 1]
      const domainLocationMap: Record<string, LocationInfo> = {
        'cn': { location: '中国', countryCode: 'CN', flag: '🇨🇳' },
        'us': { location: '美国', countryCode: 'US', flag: '🇺🇸' },
        'jp': { location: '日本', countryCode: 'JP', flag: '🇯🇵' },
        'kr': { location: '韩国', countryCode: 'KR', flag: '🇰🇷' },
        'sg': { location: '新加坡', countryCode: 'SG', flag: '🇸🇬' },
        'hk': { location: '香港', countryCode: 'HK', flag: '🇭🇰' },
        'tw': { location: '台湾', countryCode: 'TW', flag: '🇹🇼' },
        'de': { location: '德国', countryCode: 'DE', flag: '🇩🇪' },
        'fr': { location: '法国', countryCode: 'FR', flag: '🇫🇷' },
        'nl': { location: '荷兰', countryCode: 'NL', flag: '🇳🇱' },
        'ru': { location: '俄罗斯', countryCode: 'RU', flag: '🇷🇺' },
        'ca': { location: '加拿大', countryCode: 'CA', flag: '🇨🇦' },
        'au': { location: '澳大利亚', countryCode: 'AU', flag: '🇦🇺' },
        'uk': { location: '英国', countryCode: 'GB', flag: '��' },
      }
      
      if (domainLocationMap[tld]) {
        return domainLocationMap[tld]
      }
    }
  }
  
  // 如果缓存中没有，返回"查询中"并触发异步查询
  detectLocationOnline(cleanHost).then(result => {
    // 异步查询完成后会自动触发notifyLocationUpdate
  }).catch(console.error)
  return { location: '查询中...', countryCode: 'LOADING', flag: '🔍' }
}

/**
 * 获取归属地显示文本
 * @param host IP地址或域名
 * @returns 带国旗的归属地文本
 */
export function getLocationDisplay(host: string): string {
  const info = detectLocation(host)
  return `${info.flag} ${info.location}`
}

/**
 * 获取简短的归属地显示
 * @param host IP地址或域名
 * @returns 简短的归属地文本
 */
export function getLocationShort(host: string): string {
  const info = detectLocation(host)
  return info.location
}

/**
 * 清除缓存
 */
export function clearLocationCache(): void {
  locationCache.clear()
}

/**
 * 预加载常用IP的归属地信息
 * @param hosts IP地址数组
 */
export async function preloadLocations(hosts: string[]): Promise<void> {
  const promises = hosts.map(host => 
    detectLocationOnline(host).catch(error => {
      console.warn(`预加载IP ${host} 失败:`, error)
      return null
    })
  )
  
  await Promise.allSettled(promises)
}
