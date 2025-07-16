<template>
  <div class="w-full py-6">
    <!-- 页面标题和操作栏 -->
    <div class="w-full px-4 sm:px-6 lg:px-8 mb-6">
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1
            class="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            仪表盘
          </h1>
          <p class="text-gray-400">查看和管理您的设备和用户</p>
        </div>

        <div class="flex items-center space-x-3 mt-4 md:mt-0">
          <Button @click="refreshData" :disabled="isRefreshing" variant="ghost">
            <ArrowPathIcon class="w-5 h-5 mr-2" :class="{ 'animate-spin': isRefreshing }" />
            {{ isRefreshing ? '刷新中...' : '刷新' }}
          </Button>
        </div>
      </div>
    </div>

    <!-- 内容容器 -->
    <div class="w-full px-4 sm:px-6 lg:px-8">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex flex-col items-center justify-center py-32">
        <div
          class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"
        ></div>
        <p class="text-xl text-gray-300">正在加载数据...</p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error">
        <Card variant="bordered" padding="lg">
          <div class="text-center py-8">
            <div
              class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-4"
            >
              <ExclamationTriangleIcon class="w-8 h-8" />
            </div>
            <h2 class="text-2xl font-bold text-white mb-2">{{ error }}</h2>
            <p class="text-gray-300 mb-6">请检查您的网络连接或重新登录</p>
            <Button @click="refreshData" variant="primary">重试</Button>
          </div>
        </Card>
      </div>

      <!-- 内容区域 -->
      <div v-else class="w-full">
        <!-- 用户信息卡片 -->
        <Card v-if="currentUser" variant="bordered" class="mb-8">
          <div
            class="p-6 md:p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div class="flex items-center">
              <div
                class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mr-4"
              >
                {{ userInitials }}
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white mb-1">{{ currentUser.username }}</h2>
                <div class="flex flex-col">
                  <p class="text-gray-300">组织: {{ currentUser.orgName || '未指定组织' }}</p>
                  <p class="text-gray-300">用户组: {{ currentUser.ugName || '未指定用户组' }}</p>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="(role, index) in currentUser.roles"
                      :key="index"
                      class="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300"
                    >
                      {{ role.displayName || role.roleName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <RouterLink to="/profile">
              <Button variant="ghost">查看个人资料</Button>
            </RouterLink>
          </div>
        </Card>

        <!-- 设备统计卡片 -->
        <div class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card variant="bordered" hover>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 mb-1">总设备数</p>
                  <p class="text-3xl font-bold text-white">{{ devices.length }}</p>
                </div>
                <div
                  class="w-12 h-12 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center"
                >
                  <SignalIcon class="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card variant="bordered" hover>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 mb-1">在线设备</p>
                  <p class="text-3xl font-bold text-white">
                    {{ devices.filter((d) => d.status === 'online').length }}
                  </p>
                </div>
                <div
                  class="w-12 h-12 rounded-lg bg-green-500 bg-opacity-20 flex items-center justify-center"
                >
                  <SignalIcon class="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card variant="bordered" hover>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-gray-400 mb-1">离线设备</p>
                  <p class="text-3xl font-bold text-white">
                    {{ devices.filter((d) => d.status === 'offline').length }}
                  </p>
                </div>
                <div
                  class="w-12 h-12 rounded-lg bg-red-500 bg-opacity-20 flex items-center justify-center"
                >
                  <SignalIcon class="w-6 h-6 text-red-400" />
                </div>
              </div>
            </Card>
          </div>
        </div>

        <!-- 设备列表 -->
        <Card variant="bordered" class="mb-8">
          <div class="p-6 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-semibold text-white">设备列表</h2>
            <div class="flex items-center space-x-2">
              <input
                type="text"
                placeholder="搜索设备..."
                class="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div class="p-6">
            <div v-if="devices.length === 0" class="text-center py-12">
              <p class="text-gray-400 text-lg">暂无设备数据</p>
              <Button variant="primary" class="mt-4">添加设备</Button>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <Card
                v-for="device in devices"
                :key="device.id"
                variant="bordered"
                padding="none"
                hover
              >
                <div class="p-5 border-b border-gray-600 flex justify-between items-center">
                  <h3 class="font-medium text-white">{{ device.name }}</h3>
                  <div class="flex items-center">
                    <span
                      class="inline-block w-2 h-2 rounded-full mr-2"
                      :class="statusMap[device.status]?.color || 'bg-gray-500'"
                    ></span>
                    <span class="text-sm text-gray-300">{{
                      statusMap[device.status]?.text || device.status
                    }}</span>
                  </div>
                </div>

                <div class="p-5">
                  <div class="space-y-3 mb-5">
                    <div class="flex justify-between">
                      <span class="text-gray-400">设备ID</span>
                      <span class="text-white">{{ device.id }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-400">设备类型</span>
                      <span class="text-white">{{ device.type }}</span>
                    </div>
                    <div class="flex justify-between" v-if="device.lastActive">
                      <span class="text-gray-400">最后活动</span>
                      <span class="text-white">{{ device.lastActive }}</span>
                    </div>
                  </div>

                  <div class="flex justify-between space-x-2">
                    <Button variant="primary" fullWidth size="sm">控制</Button>
                    <Button variant="ghost" fullWidth size="sm">详情</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import { deviceService } from '../services/api'
import type { Device } from '../services/api'
import { ArrowPathIcon, SignalIcon, ExclamationTriangleIcon } from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { RouterLink } from 'vue-router'

// 使用Pinia store获取当前用户信息
const userStore = useUserStore()
const { currentUser, loading, error } = storeToRefs(userStore)

const devices = ref<Device[]>([])
const isRefreshing = ref(false)

// 计算用户名首字母作为头像显示
const userInitials = computed(() => {
  if (!currentUser.value?.username) return '?'
  return currentUser.value.username.substring(0, 2).toUpperCase()
})

// 设备状态映射
interface StatusMapType {
  [key: string]: { color: string; text: string }
}

const statusMap: StatusMapType = {
  online: { color: 'bg-green-500', text: '在线' },
  offline: { color: 'bg-gray-500', text: '离线' },
  warning: { color: 'bg-yellow-500', text: '警告' },
  error: { color: 'bg-red-500', text: '错误' },
}

// 加载数据
const loadData = async () => {
  if (!currentUser.value && !loading.value) {
    try {
      console.log('开始加载当前用户信息...')
      await userStore.loadCurrentUser()
      console.log('当前用户信息加载成功:', currentUser.value)
    } catch (err) {
      console.error('获取用户信息失败', err)
    }
  }

  // 尝试获取设备列表
  try {
    console.log('开始加载设备列表...')
    const deviceData = await deviceService.getDevices()
    console.log('设备列表加载成功:', deviceData)
    devices.value = deviceData
  } catch (deviceError) {
    console.error('获取设备列表失败', deviceError)
    // 设备获取失败不影响页面整体展示
    // 使用模拟数据
    devices.value = [
      {
        id: 'dev001',
        name: 'LED屏幕-A区',
        status: 'online',
        type: 'LED屏幕',
        lastActive: '2023-05-15 14:30',
      },
      {
        id: 'dev002',
        name: 'LED屏幕-B区',
        status: 'offline',
        type: 'LED屏幕',
        lastActive: '2023-05-14 09:15',
      },
      {
        id: 'dev003',
        name: '控制器-主厅',
        status: 'online',
        type: '控制器',
        lastActive: '2023-05-15 15:45',
      },
    ]
  }
}

// 刷新数据
const refreshData = async () => {
  if (isRefreshing.value) return

  isRefreshing.value = true
  try {
    await loadData()
  } finally {
    isRefreshing.value = false
  }
}

onMounted(loadData)
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
