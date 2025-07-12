<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24 px-4 pb-10"
  >
    <div class="container mx-auto max-w-6xl">
      <!-- 用户信息面板 -->
      <div
        v-if="user"
        class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-xl overflow-hidden"
      >
        <!-- 顶部信息栏 -->
        <div
          class="p-6 md:p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div class="flex items-center">
            <div
              class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mr-4"
            >
              {{ user.username?.charAt(0).toUpperCase() || 'U' }}
            </div>
            <div>
              <h2 class="text-2xl font-bold text-white mb-1">{{ user.username }}</h2>
              <p class="text-gray-300">{{ user.orgName || '未指定组织' }}</p>
            </div>
          </div>
          <div class="flex space-x-3">
            <button
              class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white"
            >
              修改资料
            </button>
            <button
              class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
            >
              退出登录
            </button>
          </div>
        </div>

        <!-- 用户详细信息 -->
        <div class="p-6 md:p-8">
          <h3 class="text-xl font-semibold mb-6 text-blue-400">账户信息</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <div class="flex flex-col">
                <span class="text-gray-400 text-sm mb-1">用户ID</span>
                <span class="text-white">{{ user.uid || '未设置' }}</span>
              </div>

              <div class="flex flex-col">
                <span class="text-gray-400 text-sm mb-1">用户组</span>
                <span class="text-white">{{ user.ugName || '未设置' }}</span>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex flex-col">
                <span class="text-gray-400 text-sm mb-1">电子邮箱</span>
                <span class="text-white">{{ user.email || '未设置' }}</span>
              </div>

              <div class="flex flex-col">
                <span class="text-gray-400 text-sm mb-1">联系电话</span>
                <span class="text-white">{{ user.phone || '未设置' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 加载状态 -->
      <div v-else-if="loading" class="flex flex-col items-center justify-center py-20">
        <div
          class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-xl text-gray-300">正在加载用户信息...</p>
      </div>

      <!-- 错误状态 -->
      <div
        v-else
        class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-xl p-6 md:p-8"
      >
        <div class="text-center mb-8">
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">加载用户信息失败</h2>
          <p class="text-gray-300">请检查您的网络连接或重新登录</p>
        </div>

        <!-- 调试信息 -->
        <div class="bg-gray-900 bg-opacity-50 rounded-lg border border-gray-700 p-4 mt-6">
          <h3 class="text-lg font-medium text-gray-300 mb-3">调试信息</h3>
          <pre class="text-gray-400 text-sm overflow-x-auto whitespace-pre-wrap">{{
            debugInfo
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { fetchCurrentUser } from '@/services/user'
import type { UserInfo } from '@/services/user'
import { useRouter } from 'vue-router'
import axios, { AxiosError } from 'axios'

const user = ref<UserInfo | null>(null)
const router = useRouter()
const loading = ref(true)
const debugInfo = ref('')

onMounted(async () => {
  debugInfo.value = '开始获取用户信息...\n'
  debugInfo.value += `当前Cookie: ${document.cookie || '无cookie'}\n`

  try {
    // 尝试直接获取用户信息
    debugInfo.value += '调用fetchCurrentUser()...\n'
    user.value = await fetchCurrentUser()

    if (user.value) {
      debugInfo.value += `获取用户信息成功: ${JSON.stringify(user.value, null, 2)}\n`
      loading.value = false
    } else {
      debugInfo.value += '获取用户信息失败: 返回null\n'
      loading.value = false

      // 尝试直接调用API进行调试
      debugInfo.value += '尝试直接调用API...\n'
      try {
        const response = await axios.get('/core/api/user/current', {
          withCredentials: true,
        })
        debugInfo.value += `API直接调用结果: ${JSON.stringify(response.data, null, 2)}\n`
      } catch (apiError) {
        const error = apiError as AxiosError
        debugInfo.value += `API直接调用错误: ${error.message || '未知错误'}\n`
        if (error.response) {
          debugInfo.value += `状态码: ${error.response.status}\n`
          debugInfo.value += `响应数据: ${JSON.stringify(error.response.data, null, 2)}\n`
        }
      }

      // 5秒后跳转回首页
      setTimeout(() => {
        router.push('/')
      }, 10000)
    }
  } catch (error) {
    const axiosError = error as AxiosError
    debugInfo.value += `获取用户信息异常: ${axiosError.message || '未知错误'}\n`
    if (axiosError.response) {
      debugInfo.value += `状态码: ${axiosError.response.status}\n`
      debugInfo.value += `响应数据: ${JSON.stringify(axiosError.response.data, null, 2)}\n`
    }
    loading.value = false

    // 5秒后跳转回首页
    setTimeout(() => {
      router.push('/')
    }, 10000)
  }
})
</script>

<style scoped>
.dashboard-container {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #eee;
  padding: 32px;
}
.loading {
  text-align: center;
  margin-top: 100px;
  color: #888;
}
.error-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px #eee;
}
.debug-info {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.debug-info pre {
  white-space: pre-wrap;
  word-break: break-all;
  font-family: monospace;
  font-size: 14px;
  max-height: 400px;
  overflow-y: auto;
}
</style>
