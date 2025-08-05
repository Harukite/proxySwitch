# Modern Proxy Switch

现代化Chrome代理管理扩展 - 支持多协议代理切换、IP归属地自动检测、CSV批量导入导出、用户认证和实时状态监控的优雅代理解决方案。

## ✨ 核心特性

- 🎨 **现代化UI**: 基于React的简洁优雅界面，毛玻璃效果和流畅动画
- 🌍 **智能归属地**: 实时检测代理服务器IP归属地，支持国旗和地区显示
- 🔄 **一键切换**: 快速启用/禁用代理，浏览器图标实时状态显示
- 📝 **完整管理**: 添加、编辑、删除代理配置，支持表单验证
- 📊 **批量导入**: CSV格式批量导入导出，支持示例模板下载
- 🔐 **认证支持**: 完整的用户名密码认证，自动填充登录信息
- 📡 **多协议**: HTTP/HTTPS/SOCKS4/SOCKS5全协议支持
- 🏷️ **状态监控**: 扩展图标角标显示，连接状态实时反馈
- ⚡ **高性能**: Manifest V3架构，安全高效的后台服务

## 🚀 快速开始

### 开发模式

1. 克隆项目并安装依赖：
```bash
git clone <repository-url>
cd proxy-switch
npm install
```

2. 启动开发服务器：
```bash
npm run dev
```

3. 在Chrome中加载扩展：
   - 打开 `chrome://extensions/`
   - 开启"开发者模式"
   - 点击"加载已解压的扩展程序"
   - 选择项目根目录下的 `build/chrome-mv3-dev` 文件夹

### 生产构建

```bash
npm run build
npm run package
```

## 📁 项目架构

```
proxy-switch/
├── 📄 manifest.json (自动生成)   # 扩展清单文件
├── 🔧 background.ts             # Service Worker后台脚本
├── 🎨 popup.tsx                 # 主弹窗界面
├── ⚙️ options.tsx               # 扩展设置页面
├── 📦 components/               # React组件库
│   ├── UI.tsx                   # 通用UI组件(按钮、加载器、Toast)
│   ├── ProxyCard.tsx            # 详细代理卡片(options页面)
│   ├── ProxyCardSimple.tsx      # 简化代理卡片(popup界面)
│   ├── ProxyForm.tsx            # 代理表单组件(添加/编辑)
│   └── ProxyList.tsx            # 代理列表容器组件
├── 🛠️ utils/                    # 核心工具函数
│   ├── types.ts                 # TypeScript类型定义
│   ├── storage.ts               # Chrome存储API封装
│   ├── proxy.ts                 # 代理操作和状态管理
│   ├── location.ts              # IP归属地检测(在线API)
│   └── csv.ts                   # CSV导入导出处理
├── 🎨 styles/                   # CSS样式文件
│   ├── global.css               # 全局样式和CSS变量
│   ├── popup.css                # 弹窗界面样式
│   ├── options.css              # 设置页面样式
│   ├── proxy-form.css           # 表单组件样式
│   ├── proxy-card.css           # 简化卡片样式
│   └── proxy-card-full.css      # 详细卡片样式
└── 📸 assets/                   # 静态资源文件
    └── icon.png                 # 扩展图标
```

## 🔧 技术栈

- **开发框架**: [Plasmo v0.90.5](https://www.plasmo.com/) - 下一代Chrome扩展开发框架
- **前端技术**: React 18.2.0 + TypeScript 5.3.3
- **样式方案**: 原生CSS3 + CSS变量 + 现代动画效果
- **图标系统**: [Lucide React v0.536.0](https://lucide.dev/) - 精美的开源图标库
- **数据处理**: Papa Parse v5.5.3 - 强大的CSV解析引擎
- **API集成**: ip-api.com + ipinfo.io - 双重IP归属地检测
- **构建工具**: Vite + TypeScript编译器
- **代码规范**: Prettier + ESLint + Git Hooks

## 🌟 独特功能

### 🌍 智能IP归属地检测
- **实时查询**: 添加代理时自动检测IP归属地
- **双API保障**: ip-api.com主API + ipinfo.io备用API
- **智能缓存**: 24小时本地缓存，避免重复查询
- **国旗显示**: 自动匹配国家/地区国旗emoji
- **中文支持**: 优先显示中文地区名称

### 📊 高级CSV管理
- **批量导入**: 支持标准CSV格式批量导入代理
- **数据验证**: 导入时自动验证代理配置有效性
- **错误报告**: 详细的导入错误信息和行号定位
- **模板下载**: 内置示例CSV模板生成
- **UTF-8支持**: 完美支持中文等多语言字符

## 📖 详细使用指南

### 🎯 添加新代理

1. **打开添加界面**
   - 点击popup界面的"+"按钮
   - 或在options页面点击"添加代理"

2. **填写代理信息**
   ```
   代理名称: MyProxy          # 便于识别的自定义名称
   代理类型: HTTP             # HTTP/HTTPS/SOCKS4/SOCKS5
   服务器地址: 192.168.1.100   # IP地址或域名
   端口: 8080                 # 1-65535范围内的端口号
   用户名: username           # 可选，代理认证用户名
   密码: password             # 可选，代理认证密码
   ```

3. **归属地自动检测**
   - 输入服务器地址后自动触发IP归属地查询
   - 显示国旗 + 地区信息（如：🇺🇸 美国）
   - 支持域名解析后的IP检测

4. **保存配置**
   - 系统自动验证配置有效性
   - 显示详细的错误提示和修复建议

### 🔄 代理切换操作

- **启用代理**: 点击代理卡片的电源按钮 ⚡
- **状态指示**: 
  - 🟢 绿色 = 已连接
  - ⚫ 灰色 = 未连接
  - 浏览器图标角标显示代理首字母
- **快速断开**: 点击任意已激活代理的断开按钮

### 📊 CSV批量管理

#### 导出现有代理
- 在options设置页面点击"导出CSV"按钮
- 自动生成格式：`proxies-YYYY-MM-DD.csv`
- 包含所有已保存的代理配置信息

#### CSV文件格式
```csv
名称,类型,IP地址,端口,用户名,密码
美国代理,HTTP,192.168.1.100,8080,user1,pass123
日本代理,SOCKS5,10.0.0.50,1080,,
香港代理,HTTPS,172.16.1.200,3128,admin,secret
```

#### 导入操作流程
1. 在options设置页面点击"导入CSV"按钮
2. 选择符合格式的CSV文件
3. 系统自动验证并批量导入代理配置
4. 查看导入结果统计（成功/失败详情）
5. 点击"下载示例"获取标准CSV模板

## ⚙️ 权限详解

本扩展需要以下Chrome权限来正常工作：

| 权限 | 用途 | 说明 |
|------|------|------|
| `proxy` | 代理设置管理 | 读取和修改浏览器代理配置 |
| `storage` | 数据持久化 | 保存代理配置、用户设置和缓存数据 |
| `webRequest` | 网络请求处理 | 监听代理连接状态和认证请求 |
| `webRequestAuthProvider` | 认证自动填充 | 自动处理代理服务器的用户名密码认证 |
| `<all_urls>` | 全域名访问 | 支持所有网站的代理访问（仅在激活时生效） |

## 🛠️ 开发指南

### 📋 环境要求

- **Node.js**: >= 16.0.0 (推荐使用LTS版本)
- **npm**: >= 8.0.0 (或使用yarn/pnpm)
- **Chrome**: >= 88 (支持Manifest V3)
- **操作系统**: Windows/macOS/Linux

### 🚀 快速启动

```bash
# 1. 克隆项目
git clone <repository-url>
cd proxy-switch

# 2. 安装依赖
npm install

# 3. 启动开发服务器(支持热重载)
npm run dev

# 4. 在Chrome中加载扩展
# - 打开 chrome://extensions/
# - 开启"开发者模式"
# - 点击"加载已解压的扩展程序"
# - 选择 build/chrome-mv3-dev 文件夹
```

### 📦 构建命令

```bash
# 开发模式(热重载)
npm run dev

# 生产构建
npm run build

# 打包扩展(.zip文件)
npm run package

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

### 🏗️ 项目架构说明

#### 数据流向
```
popup.tsx → background.ts → Chrome API
    ↓           ↓              ↓
components → utils/storage → localStorage
    ↓           ↓
styles →   utils/proxy   → chrome.proxy
```

#### 关键模块

- **background.ts**: 扩展生命周期管理、代理API调用
- **utils/storage.ts**: 数据持久化、Chrome存储API封装
- **utils/location.ts**: IP归属地检测、在线API集成
- **utils/proxy.ts**: 代理状态管理、浏览器集成

## � 常见问题与解决

### 代理连接问题

**Q: 启用代理后无法访问网站**
```
A: 检查代理服务器配置
1. 确认IP地址和端口号正确
2. 验证代理服务器是否在线
3. 检查防火墙设置
4. 确认认证信息（如果需要）
```

**Q: 某些网站显示"代理错误"**
```
A: 协议兼容性问题
1. 尝试切换代理类型(HTTP→SOCKS5)
2. 检查目标网站是否支持代理访问
3. 查看Chrome开发者工具的网络面板
```

### 扩展功能问题

**Q: IP归属地显示"查询中..."不更新**
```
A: 网络API访问问题
1. 检查网络连接是否正常
2. 确认IP地址格式正确
3. 等待API响应(通常1-3秒)
4. 域名会先解析为IP再查询
```

**Q: CSV导入失败**
```
A: 文件格式检查
1. 确保文件编码为UTF-8
2. 检查CSV格式是否正确
3. 验证必填字段(名称、类型、IP、端口)
4. 查看详细错误报告
```

## 🔒 安全提醒

- ⚠️ **代理服务器安全**: 仅使用可信的代理服务器
- 🔐 **认证信息**: 密码信息加密存储在本地
- 🌐 **网络隐私**: 了解代理服务器可能记录您的网络活动
- 📱 **权限范围**: 扩展仅在您主动启用时影响网络连接
- 🚫 **法律合规**: 请遵守当地法律法规使用代理服务

## 🐛 问题反馈

遇到问题？我们来帮您解决！

### 📝 反馈前的检查清单
- [ ] Chrome版本 >= 88
- [ ] 已尝试重启浏览器
- [ ] 已检查代理服务器状态
- [ ] 已查看浏览器控制台错误信息

### 🔍 如何提供有效信息
1. **错误描述**: 详细说明问题现象
2. **重现步骤**: 提供完整的操作步骤
3. **环境信息**: Chrome版本、操作系统
4. **错误日志**: 浏览器控制台的错误信息
5. **截图**: 如果可能，提供界面截图

### 📬 联系方式
- 🐛 **Bug报告**: 创建GitHub Issue
- 💡 **功能建议**: 提交Feature Request
- 📧 **其他问题**: 发送邮件至开发团队

## � 致谢与技术栈

### 核心技术支持
- 🚀 **[Plasmo Framework](https://www.plasmo.com/)** - 现代化Chrome扩展开发框架
- ⚛️ **[React](https://react.dev/)** - 用户界面构建库
- 📘 **[TypeScript](https://www.typescriptlang.org/)** - 类型安全的JavaScript超集
- 🎨 **[Lucide React](https://lucide.dev/)** - 精美的开源图标系统
- 📊 **[Papa Parse](https://www.papaparse.com/)** - 高性能CSV解析引擎

### API服务提供商
- 🌍 **[ip-api.com](https://ip-api.com/)** - 免费IP地理位置API服务
- 📍 **[ipinfo.io](https://ipinfo.io/)** - 备用IP信息查询服务

### 开发工具链
- 🛠️ **[Vite](https://vitejs.dev/)** - 快速构建工具
- 💅 **[Prettier](https://prettier.io/)** - 代码格式化工具
- 🎯 **[ESLint](https://eslint.org/)** - 代码质量检查

---

## 📜 许可协议

本项目采用 **MIT 许可证** 开源发布 - 详见 [LICENSE](LICENSE) 文件

```
MIT License - 允许商业使用、修改、分发和私人使用
Copyright (c) 2025 Proxy Switch Team
```

---

## ⚖️ 免责声明

**重要提醒**: 本工具仅用于合法的网络访问需求，请用户：

- ✅ 遵守当地法律法规
- ✅ 仅连接可信的代理服务器  
- ✅ 保护个人隐私和数据安全
- ❌ 不用于违法违规活动
- ❌ 不侵犯他人合法权益

**技术支持**: 如有技术问题，欢迎通过GitHub Issues或邮件联系开发团队。
