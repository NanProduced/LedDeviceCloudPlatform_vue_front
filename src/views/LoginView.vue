<template>
  <div class="login-container">
    <div class="login-box">
      <h1>LED设备云平台</h1>
      <div class="form-group">
        <label for="username">用户名</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="请输入用户名"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="请输入密码"
          class="form-control"
        />
      </div>
      <div class="form-actions">
        <button @click="handleLogin" class="btn-login">登录</button>
        <div class="options">
          <a href="#" @click.prevent="forgotPassword">忘记密码？</a>
        </div>
      </div>

      <div class="test-account">
        <h3>测试账号信息</h3>
        <p>用户名: GoogleManager</p>
        <p>组织后缀: 12462</p>
        <p>密码: rofN%UF$4y</p>
      </div>

      <div class="debug-section">
        <h3>调试工具</h3>
        <div class="debug-buttons">
          <button @click="checkCookie" class="btn-debug">检查Cookie</button>
          <button @click="testApi" class="btn-debug">测试API</button>
          <button @click="clearCookies" class="btn-debug">清除Cookie</button>
        </div>
        <div v-if="debugInfo" class="debug-info">
          <pre>{{ debugInfo }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'

const username = ref('')
const password = ref('')
const debugInfo = ref('')

// OAuth2登录处理
const handleLogin = () => {
  // 动态获取当前主机地址作为redirect_uri参数
  const currentHost = window.location.origin
  const callbackUrl = `${currentHost}/oauth2/callback`

  console.log(`当前主机地址: ${currentHost}`)
  console.log(`回调URL: ${callbackUrl}`)

  // 跳转到Gateway OAuth2认证入口，并带上前端回调地址
  window.location.href = `http://localhost:8082/oauth2/authorization/gateway-server?redirect_uri=${encodeURIComponent(callbackUrl)}`
}

const forgotPassword = () => {
  alert('请联系管理员重置密码')
}

// 调试函数：检查Cookie
const checkCookie = () => {
  debugInfo.value = `当前Cookie: ${document.cookie || '无cookie'}\n`
}

// 调试函数：测试API
const testApi = async () => {
  debugInfo.value = '正在测试API...\n'
  try {
    const response = await axios.get('/core/api/user/current', {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    debugInfo.value += `HTTP状态码: ${response.status}\n`
    debugInfo.value += `响应数据: ${JSON.stringify(response.data, null, 2)}\n`
  } catch (error) {
    debugInfo.value += `请求失败: ${error instanceof Error ? error.message : '未知错误'}\n`
    if (axios.isAxiosError(error) && error.response) {
      debugInfo.value += `HTTP状态码: ${error.response.status}\n`
      debugInfo.value += `响应数据: ${JSON.stringify(error.response.data, null, 2)}\n`
    }
  }
}

// 调试函数：清除Cookie
const clearCookies = () => {
  document.cookie.split(';').forEach((cookie) => {
    const [name] = cookie.trim().split('=')
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
  })
  debugInfo.value = '已尝试清除所有Cookie\n'
  debugInfo.value += `清除后的Cookie: ${document.cookie || '无cookie'}\n`
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-box {
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #1867c0;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #1867c0;
  outline: none;
}

.form-actions {
  margin-top: 30px;
}

.btn-login {
  width: 100%;
  padding: 12px;
  background-color: #1867c0;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-login:hover {
  background-color: #0d47a1;
}

.options {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.options a {
  color: #1867c0;
  text-decoration: none;
}

.options a:hover {
  text-decoration: underline;
}

.test-account {
  margin-top: 40px;
  padding: 15px;
  background-color: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 4px;
}

.test-account h3 {
  margin-top: 0;
  color: #333;
  font-size: 16px;
}

.test-account p {
  margin: 5px 0;
  font-family: monospace;
}

.debug-section {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.debug-section h3 {
  margin-top: 0;
  color: #333;
  font-size: 16px;
}

.debug-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.btn-debug {
  padding: 8px 12px;
  background-color: #607d8b;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-debug:hover {
  background-color: #455a64;
}

.debug-info {
  margin-top: 15px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: auto;
}

.debug-info pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
}
</style>
