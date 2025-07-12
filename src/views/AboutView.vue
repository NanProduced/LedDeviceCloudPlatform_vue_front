<template>
  <div class="about">
    <h1>关于LED设备云平台</h1>
    <div class="about-content">
      <div class="section">
        <h2>项目介绍</h2>
        <p>
          LED设备云平台是一个用于管理和控制LED设备的云服务平台，基于微服务架构设计。用户可以通过该平台远程监控和控制LED设备，实现智能照明管理。
        </p>
      </div>

      <div class="section">
        <h2>系统架构</h2>
        <p>本系统采用微服务架构，包括以下几个主要组件：</p>
        <ul>
          <li>
            <strong>Auth-server (端口8081)</strong>：基于OAuth2+OIDC的认证服务器，负责用户认证和授权
          </li>
          <li>
            <strong>Gateway (端口8082)</strong>：业务网关，作为OAuth2 Client，处理用户登录和请求路由
          </li>
          <li><strong>Core-service</strong>：核心业务逻辑服务，处理LED设备管理的主要功能</li>
          <li><strong>前端应用</strong>：基于Vue3的单页应用，提供用户界面和交互</li>
        </ul>
      </div>

      <div class="section">
        <h2>技术栈</h2>
        <ul>
          <li><strong>后端</strong>：Spring Boot、Spring Cloud、Spring Security OAuth2</li>
          <li><strong>前端</strong>：Vue3、TypeScript、Axios</li>
          <li><strong>数据存储</strong>：MySQL、Redis</li>
          <li><strong>其他</strong>：Docker、Nginx</li>
        </ul>
      </div>

      <div class="section">
        <h2>联系我们</h2>
        <p>如有问题或建议，请联系系统管理员。</p>
      </div>
    </div>
  </div>
</template>

<style>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.about h1 {
  color: #1867c0;
  margin-bottom: 30px;
  text-align: center;
}

.about-content {
  background-color: white;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  color: #333;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.section p {
  line-height: 1.6;
  color: #444;
}

.section ul {
  padding-left: 20px;
}

.section li {
  margin-bottom: 10px;
  line-height: 1.6;
  color: #444;
}
</style>
