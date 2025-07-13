<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService, deviceService, authService } from '../services/api'
import type { UserInfo, Device } from '../services/api'
import { Dialog, Menu } from '@headlessui/vue'
import { TransitionRoot } from '@headlessui/vue'
import { Motion } from 'motion-v'
import {
  ArrowPathIcon,
  BellIcon,
  ChevronDownIcon,
  CogIcon,
  PowerIcon,
  SignalIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'

const userInfo = ref<UserInfo | null>(null)
const devices = ref<Device[]>([])
const loading = ref(true)
const error = ref('')
const isRefreshing = ref(false)
const showLogoutConfirm = ref(false)

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
  loading.value = true
  error.value = ''

  try {
    // 获取当前用户信息，Gateway会自动处理cookie认证
    const userData = await userService.getCurrentUser()
    userInfo.value = userData

    // 尝试获取设备列表
    try {
      const deviceData = await deviceService.getDevices()
      devices.value = deviceData
    } catch (deviceError) {
      console.error('获取设备列表失败', deviceError)
      // 设备获取失败不影响页面整体展示
    }
  } catch (err: unknown) {
    console.error('获取用户信息失败', err)
    error.value = '无法获取用户信息，您可能需要重新登录'
  } finally {
    loading.value = false
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

// 登出
const handleLogout = () => {
  authService.logout()
  showLogoutConfirm.value = false
  // 页面会被重定向到登录页
}

onMounted(loadData)
</script>

<template>
  <div
    class="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
  >
    <!-- 主内容区域 -->
    <div class="w-full h-full pt-16 pb-10">
      <!-- 页面标题和操作栏 -->
      <div class="w-full px-4 sm:px-6 lg:px-8 py-6 mb-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1
              class="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              设备管理中心
            </h1>
            <p class="text-gray-400">查看和管理您的所有LED设备</p>
          </div>

          <div class="flex items-center space-x-3 mt-4 md:mt-0">
            <button
              @click="refreshData"
              class="flex items-center px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
              :class="{ 'opacity-70 cursor-not-allowed': isRefreshing }"
              :disabled="isRefreshing"
            >
              <ArrowPathIcon class="w-5 h-5 mr-2" :class="{ 'animate-spin': isRefreshing }" />
              {{ isRefreshing ? '刷新中...' : '刷新' }}
            </button>

            <Menu as="div" class="relative">
              <Menu.Button
                class="flex items-center px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <CogIcon class="w-5 h-5 mr-2" />
                操作
                <ChevronDownIcon class="w-4 h-4 ml-1" />
              </Menu.Button>

              <TransitionRoot
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-in"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Menu.Items
                  class="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-gray-800 border border-gray-700 shadow-lg py-1 z-10"
                >
                  <Menu.Item v-slot="{ active }">
                    <button
                      class="flex items-center w-full text-left px-4 py-2 text-sm"
                      :class="active ? 'bg-gray-700 text-white' : 'text-gray-300'"
                    >
                      <BellIcon class="w-5 h-5 mr-2" />
                      通知设置
                    </button>
                  </Menu.Item>
                  <Menu.Item v-slot="{ active }">
                    <button
                      class="flex items-center w-full text-left px-4 py-2 text-sm"
                      :class="active ? 'bg-gray-700 text-white' : 'text-gray-300'"
                    >
                      <CogIcon class="w-5 h-5 mr-2" />
                      系统设置
                    </button>
                  </Menu.Item>
                  <div class="border-t border-gray-700 my-1"></div>
                  <Menu.Item v-slot="{ active }">
                    <button
                      @click="showLogoutConfirm = true"
                      class="flex items-center w-full text-left px-4 py-2 text-sm"
                      :class="active ? 'bg-gray-700 text-red-400' : 'text-red-400'"
                    >
                      <PowerIcon class="w-5 h-5 mr-2" />
                      退出登录
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </TransitionRoot>
            </Menu>
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
        <div
          v-else-if="error"
          class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-xl p-8 text-center"
        >
          <div
            class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 text-red-400 mb-4"
          >
            <ExclamationTriangleIcon class="w-8 h-8" />
          </div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ error }}</h2>
          <p class="text-gray-300 mb-6">请检查您的网络连接或重新登录</p>
          <button
            @click="refreshData"
            class="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            重试
          </button>
        </div>

        <!-- 内容区域 -->
        <div v-else class="w-full">
          <!-- 用户信息卡片 -->
          <div
            v-if="userInfo"
            class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-xl overflow-hidden mb-8 w-full"
          >
            <div
              class="p-6 md:p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-b border-gray-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div class="flex items-center">
                <div
                  class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-2xl font-bold mr-4"
                >
                  {{ userInfo.username?.charAt(0).toUpperCase() || 'U' }}
                </div>
                <div>
                  <h2 class="text-2xl font-bold text-white mb-1">{{ userInfo.username }}</h2>
                  <p class="text-gray-300">{{ userInfo.roles?.join(', ') || '未指定角色' }}</p>
                </div>
              </div>
              <div class="flex space-x-3">
                <button
                  class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
                >
                  查看详情
                </button>
              </div>
            </div>
          </div>

          <!-- 设备统计卡片 -->
          <div class="mb-8 w-full">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div
                class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6 hover:border-blue-500 transition-all duration-300"
              >
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
              </div>

              <div
                class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6 hover:border-green-500 transition-all duration-300"
              >
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
              </div>

              <div
                class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 p-6 hover:border-red-500 transition-all duration-300"
              >
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
              </div>
            </div>
          </div>

          <!-- 设备列表 -->
          <div
            class="bg-gray-800 bg-opacity-50 rounded-xl border border-gray-700 shadow-xl overflow-hidden w-full"
          >
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
                <button
                  class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  添加设备
                </button>
              </div>

              <div
                v-else
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6"
              >
                <Motion
                  v-for="device in devices"
                  :key="device.id"
                  :initial="{ opacity: 0, scale: 0.95 }"
                  :enter="{ opacity: 1, scale: 1 }"
                  :transition="{ duration: 0.3, delay: 0.05 * devices.indexOf(device) }"
                  class="bg-gray-700 bg-opacity-50 rounded-xl border border-gray-600 overflow-hidden hover:border-blue-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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
                      <button
                        class="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm"
                      >
                        控制
                      </button>
                      <button
                        class="flex-1 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm"
                      >
                        详情
                      </button>
                    </div>
                  </div>
                </Motion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 登出确认对话框 -->
  <TransitionRoot appear as="template" :show="showLogoutConfirm">
    <Dialog as="div" class="relative z-50" @close="showLogoutConfirm = false">
      <div class="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel
          class="w-full max-w-md rounded-xl bg-gray-800 border border-gray-700 p-6 shadow-xl"
        >
          <Dialog.Title class="text-lg font-medium text-white mb-2">确认退出</Dialog.Title>
          <Dialog.Description class="text-gray-300 mb-6">
            您确定要退出登录吗？退出后需要重新登录才能访问系统。
          </Dialog.Description>

          <div class="flex justify-end space-x-4">
            <button
              @click="showLogoutConfirm = false"
              class="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors text-white"
            >
              取消
            </button>
            <button
              @click="handleLogout"
              class="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white"
            >
              确认退出
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
