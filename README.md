# LED设备云平台前端

LED设备云平台的Vue3前端项目，用于实现设备管理及用户认证流程。

## 项目结构

```
vue_front/
  ├── public/             # 静态资源
  ├── src/
  │   ├── assets/         # CSS和其他资源
  │   ├── components/     # Vue组件
  │   ├── router/         # 路由配置
  │   ├── services/       # API服务
  │   ├── stores/         # Pinia状态管理
  │   ├── views/          # 页面视图
  │   ├── App.vue         # 根组件
  │   └── main.ts         # 应用入口
  ├── package.json        # 项目依赖
  └── vite.config.ts      # Vite配置
```

## 技术栈

- Vue 3
- TypeScript
- Vue Router
- Axios
- Vite

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 系统说明

### 认证流程

本项目采用基于Cookie的认证方式，由Gateway服务器处理OAuth2认证流程：

1. 用户访问前端应用（http://localhost:5173）
2. 如果用户未登录，系统会重定向到登录页面
3. 用户点击登录按钮后，会重定向到网关（http://localhost:8082/oauth2/authorization/messaging-client-oidc）
4. 网关作为OAuth2 Client，将用户重定向到认证服务器（http://localhost:8081）
5. 用户在认证服务器输入用户名密码
6. 认证成功后，认证服务器重定向回网关，网关会获取token并设置在cookie中
7. 网关将用户重定向回前端的回调页面（/oauth2/callback）
8. 前端检测到认证成功，重定向到首页
9. 后续API请求会自动包含cookie，Gateway负责验证cookie中的token

### 重要说明

- 前端不需要自己处理token的获取和存储，这由Gateway完成
- API请求需要设置`withCredentials: true`以便发送和接收cookie
- 登出操作通过重定向到Gateway的登出端点完成，Gateway负责清除cookie

### 后端服务配置

确保后端服务已正确启动：

- Auth-server: 端口8081
- Gateway: 端口8082
- Core-service: 根据后端配置

### CORS配置

确保Gateway和Auth-server已配置正确的CORS头，允许前端域名：

```java
@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOrigin("http://localhost:5173"); // 前端开发服务器地址
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}
```

## 使用说明

1. 启动所有后端服务（Auth-server、Gateway、Core-service）
2. 启动前端开发服务器 `npm run dev`
3. 访问 http://localhost:5173
4. 系统会自动重定向到登录页面
5. 点击登录按钮，完成OAuth2认证流程
6. 登录成功后即可访问系统功能

## 注意事项

- 确保后端服务器已正确配置并运行
- 开发环境中可能会遇到跨域问题，需要确保后端CORS配置正确
- 如果需要部署到生产环境，需要修改API地址和CORS配置
