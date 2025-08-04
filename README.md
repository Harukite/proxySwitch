# Modern Proxy Switch

一个现代化的Chrome浏览器代理切换扩展，基于Plasmo框架开发，提供优雅的用户界面和强大的代理管理功能。

## ✨ 功能特性

- 🎨 **现代化UI**: 简洁优雅的界面设计，支持浅色/深色主题
- 🔄 **快速切换**: 一键切换不同代理服务器
- 📝 **代理管理**: 添加、编辑、删除代理配置
- 📊 **批量操作**: 支持CSV格式的批量导入/导出
- 🔐 **认证支持**: 支持用户名密码认证
- 📡 **多协议**: 支持HTTP、HTTPS、SOCKS4、SOCKS5协议
- 🏷️ **状态显示**: 浏览器图标角标显示当前代理状态
- 🔔 **通知提醒**: 连接状态变化实时通知
- ⚡ **性能优化**: 基于Manifest V3，安全高效

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

## 📁 项目结构

```
├── background.ts           # Service Worker后台脚本
├── popup.tsx              # 弹窗界面
├── options.tsx            # 设置页面
├── components/            # React组件
│   ├── UI.tsx            # 通用UI组件
│   ├── ProxyCard.tsx     # 代理卡片组件
│   ├── ProxyForm.tsx     # 代理表单组件
│   └── ImportExport.tsx  # 导入导出组件
├── utils/                 # 工具函数
│   ├── types.ts          # TypeScript类型定义
│   ├── storage.ts        # 存储管理
│   ├── proxy.ts          # 代理操作
│   └── csv.ts            # CSV处理
├── styles/               # 样式文件
│   └── global.css        # 全局样式
└── assets/               # 静态资源
```

## 🔧 技术栈

- **框架**: [Plasmo](https://www.plasmo.com/) - Chrome扩展开发框架
- **前端**: React + TypeScript
- **样式**: CSS3 + CSS变量
- **图标**: [Lucide React](https://lucide.dev/)
- **工具**: Papa Parse (CSV处理)

## 📖 使用说明

### 添加代理

1. 点击"添加代理"按钮
2. 填写代理信息：
   - 名称：便于识别的代理名称
   - 类型：HTTP/HTTPS/SOCKS4/SOCKS5
   - 服务器地址：代理服务器IP或域名
   - 端口：代理服务器端口
   - 用户名/密码：认证信息（可选）
3. 点击"保存"

### 切换代理

- 在弹窗界面中点击代理卡片右侧的开关按钮
- 激活的代理会在浏览器图标上显示角标
- 可随时点击"断开"按钮关闭代理

### 批量导入

1. 点击"导入/导出"按钮
2. 选择"导入"选项卡
3. 准备CSV文件，格式为：`名称,类型,IP地址,端口,用户名,密码`
4. 选择文件并确认导入

### CSV格式示例

```csv
名称,类型,IP地址,端口,用户名,密码
代理1,HTTP,192.168.1.100,8080,user1,pass1
代理2,HTTPS,10.0.0.100,3128,user2,pass2
代理3,SOCKS5,172.16.0.100,1080,,
```

## ⚙️ 权限说明

- `proxy`: 管理浏览器代理设置
- `storage`: 保存代理配置和设置
- `webRequest`: 处理代理认证
- `webRequestAuthProvider`: 自动填充认证信息

## 🛠️ 开发指南

### 环境要求

- Node.js >= 16
- Chrome >= 88

### 开发命令

```bash
# 安装依赖
npm install

# 开发模式（热重载）
npm run dev

# 构建生产版本
npm run build

# 打包扩展
npm run package
```

### 代码规范

- 使用TypeScript进行类型检查
- 遵循React Hooks最佳实践
- 使用语义化的Git提交信息
- 保持组件单一职责原则

## 🐛 问题反馈

如果您在使用过程中遇到问题或有功能建议，请：

1. 查看浏览器控制台是否有错误信息
2. 确保Chrome版本支持Manifest V3
3. 检查代理服务器配置是否正确
4. 创建Issue描述问题详情

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Plasmo](https://www.plasmo.com/) - 优秀的Chrome扩展开发框架
- [Lucide](https://lucide.dev/) - 精美的开源图标库
- [Papa Parse](https://www.papaparse.com/) - 强大的CSV解析库

---

**注意**: 使用代理时请遵守当地法律法规，本工具仅用于合法的网络访问需求。
