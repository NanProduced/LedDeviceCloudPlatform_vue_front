<template>
  <div class="callback-container">
    <div class="loading-spinner" v-if="loading"></div>
    <div class="success-message" v-if="success">登录成功，正在跳转...</div>
    <div class="error-message" v-if="error">{{ error }}</div>
    <div class="debug-info" v-if="debugInfo">
      <h3>调试信息</h3>
      <pre>{{ debugInfo }}</pre>
    </div>
    <div class="debug-actions" v-if="!success">
      <button @click="manualRedirect" class="btn-debug">手动跳转到Dashboard</button>
      <button @click="testDirectApi" class="btn-debug">直接测试API</button>
      <button @click="goHome" class="btn-debug">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchCurrentUser } from '@/services/user'
import axios from 'axios'

const router = useRouter()
const loading = ref(true)
const error = ref('')
const success = ref(false)
const debugInfo = ref('')

// 手动跳转到Dashboard
const manualRedirect = () => {
  debugInfo.value += '手动跳转到Dashboard...\n'
  router.push('/dashboard')
}

// 直接测试API
const testDirectApi = async () => {
  debugInfo.value += '直接测试API...\n'
  try {
    const response = await axios.get('/core/api/user/current', {
      withCredentials: true,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })

    debugInfo.value += `HTTP状态码: ${response.status}\n`
    debugInfo.value += `响应头: ${JSON.stringify(response.headers, null, 2)}\n`
    debugInfo.value += `响应数据: ${JSON.stringify(response.data, null, 2)}\n`
  } catch (error) {
    debugInfo.value += `请求失败: ${error instanceof Error ? error.message : '未知错误'}\n`
    if (axios.isAxiosError(error) && error.response) {
      debugInfo.value += `HTTP状态码: ${error.response.status}\n`
      debugInfo.value += `响应数据: ${JSON.stringify(error.response.data, null, 2)}\n`
    }
  }
}

// 返回首页
const goHome = () => {
  router.push('/')
}

onMounted(async () => {
  // 记录调试信息
  debugInfo.value = `当前URL: ${window.location.href}\n`
  debugInfo.value += `当前主机: ${window.location.origin}\n`
  debugInfo.value += `Cookie: ${document.cookie || '无cookie'}\n`

  // 分析Cookie属性
  if (document.cookie) {
    debugInfo.value += '\n分析Cookie属性:\n'
    const cookies = document.cookie.split(';')
    cookies.forEach((cookie) => {
      debugInfo.value += `- ${cookie.trim()}\n`
    })
    debugInfo.value += '\n注意：JavaScript无法直接读取Cookie的SameSite和Secure属性\n'
  }

  try {
    // Gateway已经完成OAuth2认证流程并设置了cookie
    // 直接尝试获取用户信息验证登录状态
    debugInfo.value += '尝试通过cookie获取用户信息...\n'

    // 先尝试直接用axios请求，获取更多调试信息
    try {
      debugInfo.value += '发送HTTP请求到 /core/api/user/current...\n'
      const response = await axios.get('/core/api/user/current', {
        withCredentials: true,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      debugInfo.value += `HTTP状态码: ${response.status}\n`
      debugInfo.value += `响应头: ${JSON.stringify(response.headers, null, 2)}\n`
      debugInfo.value += `响应数据: ${JSON.stringify(response.data, null, 2)}\n`

      // 检查Set-Cookie头
      const setCookieHeader = response.headers['set-cookie']
      if (setCookieHeader) {
        debugInfo.value += `\nSet-Cookie头: ${JSON.stringify(setCookieHeader, null, 2)}\n`
      }

      if (response.data && response.data.code === 200) {
        const userInfo = response.data.data
        debugInfo.value += '认证成功，已获取用户信息\n'
        debugInfo.value += `用户名: ${userInfo.username}\n`
        loading.value = false
        success.value = true

        // 延迟跳转到dashboard
        setTimeout(() => {
          debugInfo.value += '执行跳转到dashboard\n'
          router.push('/dashboard')
        }, 5000) // 延长时间以便查看调试信息
      } else {
        debugInfo.value += `API返回非成功状态码: ${response.data?.code || '无code'}\n`
        throw new Error('API返回非成功状态码')
      }
    } catch (axiosError) {
      debugInfo.value += `直接HTTP请求失败: ${axiosError instanceof Error ? axiosError.message : '未知错误'}\n`
      if (axios.isAxiosError(axiosError) && axiosError.response) {
        debugInfo.value += `HTTP状态码: ${axiosError.response.status}\n`
        debugInfo.value += `响应数据: ${JSON.stringify(axiosError.response.data, null, 2)}\n`

        // 检查响应头中的CORS信息
        debugInfo.value += '\nCORS相关响应头:\n'
        const corsHeaders = [
          'access-control-allow-origin',
          'access-control-allow-credentials',
          'access-control-allow-methods',
          'access-control-allow-headers',
        ]

        corsHeaders.forEach((header) => {
          if (axiosError.response?.headers[header]) {
            debugInfo.value += `${header}: ${axiosError.response.headers[header]}\n`
          }
        })
      }

      // 继续尝试使用封装的方法
      debugInfo.value += '尝试使用封装的fetchCurrentUser方法...\n'
      const userInfo = await fetchCurrentUser()

      if (userInfo) {
        // 成功获取用户信息，表示已登录
        debugInfo.value += '认证成功，已获取用户信息\n'
        debugInfo.value += `用户名: ${userInfo.username}\n`
        loading.value = false
        success.value = true

        // 延迟跳转到dashboard
        setTimeout(() => {
          debugInfo.value += '执行跳转到dashboard\n'
          router.push('/dashboard')
        }, 3000) // 3秒后跳转
      } else {
        // 未获取到用户信息
        loading.value = false
        error.value = '获取用户信息失败，请重新登录'
        debugInfo.value += '获取用户信息失败\n'
        debugInfo.value += '\n可能的原因:\n'
        debugInfo.value += '1. Cookie未正确设置或已过期\n'
        debugInfo.value += '2. Cookie的SameSite属性限制了跨站请求\n'
        debugInfo.value += '3. Cookie的Domain属性与当前域不匹配\n'
        debugInfo.value += '4. CORS配置不允许携带凭据\n'

        // 延迟跳转回首页
        setTimeout(() => {
          debugInfo.value += '执行跳转到首页\n'
          router.push('/')
        }, 10000) // 延长时间以便查看调试信息
      }
    }
  } catch (e) {
    // API请求出错
    loading.value = false
    error.value = '认证失败，请重新登录'
    debugInfo.value += `获取用户信息出错: ${e instanceof Error ? e.message : '未知错误'}\n`

    // 延迟跳转回首页
    setTimeout(() => {
      debugInfo.value += '执行跳转到首页\n'
      router.push('/')
    }, 10000) // 延长时间以便查看调试信息
  }
})
</script>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1867c0;
  animation: spin 1s ease-in-out infinite;
}

.success-message {
  color: #4caf50;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.error-message {
  color: #e53935;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
}

.debug-info {
  margin-top: 30px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 80%;
  max-width: 800px;
  max-height: 70vh;
  overflow-y: auto;
}

.debug-info pre {
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
}

.debug-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.btn-debug {
  padding: 10px 15px;
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
