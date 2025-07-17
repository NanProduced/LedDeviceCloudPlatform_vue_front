# CLAUDE.md

此文件为 Claude Code (claude.ai/code) 在此仓库中工作时提供指导。

## 开发命令

### 核心命令
- `npm run dev` - 启动开发服务器 (主机: 192.168.1.222:5179，代理到网关)
- `npm run build` - 构建生产版本
- `npm run preview` - 预览生产构建
- `npm run type-check` - 运行 TypeScript 类型检查
- `npm run lint` - 运行 ESLint 并自动修复
- `npm run format` - 使用 Prettier 格式化代码

### 构建和部署
- 构建过程使用 Vite 和 TypeScript 编译
- 生产构建需要同时运行 `type-check` 和 `build-only` 命令
- 开发环境下应用通过网关 (192.168.1.222:8082) 代理

## 架构概览

### 后端集成
此 Vue.js 前端连接到微服务后端架构：
- **Auth-Server** (8081): OAuth2/OIDC 认证服务器
- **Gateway** (8082): OAuth2 客户端和 API 网关，处理认证和请求路由
- **Core-Service** (8083): 核心业务逻辑服务

### 认证流程
1. 用户点击登录 → 重定向到网关 OAuth2 端点 (`/oauth2/authorization/gateway-server`)
2. 网关处理与认证服务器的 OAuth2 流程
3. 认证成功后，网关将认证令牌写入 cookie
4. 前端使用基于 cookie 的认证（所有请求包含 `withCredentials: true`）
5. 网关验证 cookie 并将请求转发到相应的后端服务

### API 架构
- **基础 URL**: `/core/api` (通过 Vite 开发服务器代理到网关)
- **响应格式**: 标准化的 `code`、`msg`、`data` 字段
- **错误处理**: 全面的 HTTP 状态码处理 (401, 403, 404, 500)
- **请求日志**: 详细的请求/响应日志用于调试

### 状态管理 (Pinia)
- **userStore**: 当前用户信息、登录状态、登出处理
- **roleStore**: 角色管理、权限、CRUD 操作
- **permissionStore**: 权限定义和分组
- **organizationStore**: 组织和用户组层次结构
- **userGroupStore**: 用户组树结构和操作

### 关键组件架构
- **布局**: `AppLayout.vue` 包含导航和用户菜单
- **表单**: 角色创建/编辑与权限选择
- **树形结构**: 用户组层次结构支持拖拽操作
- **模态框**: 复杂的模态框管理用于 CRUD 操作
- **表格**: 数据表格支持搜索、过滤和分页

### Vue.js 开发标准
- 使用 Composition API 和 `<script setup>` 语法
- TypeScript 集成与适当的类型定义
- 使用 Pinia 进行模块化状态管理
- Headless UI 组件配合 Tailwind CSS 样式
- 使用 `ref` 和 `reactive` 进行响应式数据处理
- 适当的生命周期管理和清理

### 权限系统
三层权限结构：
- **API**: 后端 API 访问权限
- **MENU**: 导航菜单可见性
- **FUNCTION**: 组件级功能访问

权限分组包括：
- 用户管理
- 用户组管理  
- 角色管理

### 开发环境设置
- **Vite 代理**: 开发请求代理到网关 (192.168.1.222:8082)
- **CORS**: 网关必须允许前端源 (192.168.1.222:5179)
- **Mock 数据**: 后端 API 不可用时的降级 mock 数据
- **错误处理**: 优雅降级与用户友好的错误消息

### 测试账号
- 用户名: GoogleManager
- 组织后缀: 12462
- 密码: rofN%UF$4y

### 后端 API 文档
- OpenAPI 文档地址: 192.168.1.222:8083/v3/api-docs
- 网关通过 `/core/api` 前缀路由 core-service API

## 重要注意事项

### 认证要求
- 所有 API 调用必须包含 `withCredentials: true` 以进行 cookie 认证
- 前端不处理令牌管理 - 完全由网关处理
- 通过网关端点登出以清除认证 cookie

### 开发工作流程
1. 启动后端服务 (Auth-Server, Gateway, Core-Service)
2. 运行 `npm run dev` 启动前端开发服务器
3. 如果未认证，系统会重定向到登录页面
4. 登录后，完整的系统功能可用

### 代码规范
- 遵循 Vue.js 风格指南和组合式 API 模式
- 使用 TypeScript 保证类型安全
- 保持一致的错误处理模式
- 保持组件专注和可复用
- 使用 Tailwind CSS 进行样式设计

### LED 设备管理
- 支持 LED 屏幕和控制器设备类型
- 设备状态监控和控制功能
- 设备按区域管理（A区、B区、主厅等）
- 实时设备状态更新和最后活跃时间tracking