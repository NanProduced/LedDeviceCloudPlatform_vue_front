<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import {
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  UsersIcon,
  ComputerDesktopIcon,
  UserCircleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/userStore'
import { authService } from '@/services/api'

// 定义导航项
const navItems = [
  { name: '仪表盘', icon: HomeIcon, to: '/dashboard', active: true },
  { name: '终端列表', icon: ComputerDesktopIcon, to: '/terminals', active: false },
  { name: '用户列表', icon: UsersIcon, to: '/users', active: false },
  { name: '权限管理', icon: ShieldCheckIcon, to: '/roles', active: false },
  { name: '个人资料', icon: UserCircleIcon, to: '/profile', active: false },
]

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isSidebarOpen = ref(false)
const isUserMenuOpen = ref(false)

// 切换侧边栏
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// 关闭侧边栏
const closeSidebar = () => {
  isSidebarOpen.value = false
}

// 切换用户菜单
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value
}

// 关闭用户菜单
const closeUserMenu = () => {
  isUserMenuOpen.value = false
}

// 检查当前路由是否激活
const isActive = (path: string) => {
  return route.path === path
}

// 处理退出登录
const handleLogout = () => {
  // 调用网关的登出端点
  authService.logout()
}
</script>

<template>
  <div class="min-h-screen w-full bg-gray-900 flex">
    <!-- 侧边导航栏 - 移动端 -->
    <div v-show="isSidebarOpen" class="fixed inset-0 z-50 lg:hidden" @click="closeSidebar">
      <div class="fixed inset-0 bg-gray-900 bg-opacity-75"></div>
      <div
        class="fixed inset-y-0 left-0 flex flex-col w-64 max-w-xs bg-gray-900 border-r border-gray-800"
        @click.stop
      >
        <div class="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          <div class="flex items-center space-x-2">
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
            >
              <span class="font-bold text-white">L</span>
            </div>
            <span
              class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              LED云平台
            </span>
          </div>
          <button class="text-gray-400 hover:text-white" @click="closeSidebar">
            <XMarkIcon class="w-6 h-6" />
          </button>
        </div>
        <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          <RouterLink
            v-for="item in navItems"
            :key="item.name"
            :to="item.to"
            :class="[
              isActive(item.to)
                ? 'bg-gray-800 text-white'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white',
              'group flex items-center px-2 py-2 text-base font-medium rounded-md',
            ]"
            @click="closeSidebar"
          >
            <component
              :is="item.icon"
              :class="[
                isActive(item.to) ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300',
                'mr-3 flex-shrink-0 h-6 w-6',
              ]"
              aria-hidden="true"
            />
            {{ item.name }}
          </RouterLink>
        </nav>
      </div>
    </div>

    <!-- 侧边导航栏 - 桌面端 -->
    <div
      class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 border-r border-gray-800 bg-gray-900"
    >
      <div class="flex items-center h-16 px-4 border-b border-gray-800">
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
          >
            <span class="font-bold text-white">L</span>
          </div>
          <span
            class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            LED云平台
          </span>
        </div>
      </div>
      <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <RouterLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          :class="[
            isActive(item.to)
              ? 'bg-gray-800 text-white'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white',
            'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
          ]"
        >
          <component
            :is="item.icon"
            :class="[
              isActive(item.to) ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300',
              'mr-3 flex-shrink-0 h-5 w-5',
            ]"
            aria-hidden="true"
          />
          {{ item.name }}
        </RouterLink>
      </nav>
    </div>

    <!-- 主内容区域 -->
    <div class="lg:pl-64 flex flex-col flex-1 w-full">
      <!-- 顶部状态栏 -->
      <div class="sticky top-0 z-10 flex h-16 bg-gray-900 border-b border-gray-800 shadow-md">
        <button
          type="button"
          class="px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
          @click="toggleSidebar"
        >
          <span class="sr-only">打开侧边栏</span>
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex-1 flex justify-between px-4">
          <div class="flex-1 flex items-center">
            <div class="w-full max-w-lg lg:max-w-xs">
              <label for="search" class="sr-only">搜索</label>
              <div class="relative text-gray-400 focus-within:text-gray-300">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon class="h-5 w-5" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  class="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-gray-800 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:text-white sm:text-sm"
                  placeholder="搜索..."
                  type="search"
                />
              </div>
            </div>
          </div>
          <div class="flex items-center">
            <!-- 通知按钮 -->
            <button
              type="button"
              class="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 mr-4"
            >
              <span class="sr-only">查看通知</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>

            <!-- 用户头像和下拉菜单 -->
            <div class="relative">
              <div>
                <button
                  type="button"
                  class="flex items-center max-w-xs rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                  @click="toggleUserMenu"
                >
                  <span class="sr-only">打开用户菜单</span>
                  <div
                    class="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                  >
                    <span class="font-medium text-white">
                      {{ userStore.currentUser?.username?.charAt(0).toUpperCase() || 'U' }}
                    </span>
                  </div>
                  <ChevronDownIcon class="ml-1 h-4 w-4 text-gray-400" />
                </button>
              </div>

              <!-- 用户下拉菜单 -->
              <div
                v-show="isUserMenuOpen"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                @click.away="closeUserMenu"
              >
                <div class="px-4 py-2 border-b border-gray-700">
                  <p class="text-sm text-gray-300">
                    {{ userStore.currentUser?.username || '用户' }}
                  </p>
                  <p class="text-xs text-gray-500 truncate">
                    {{ userStore.currentUser?.email || '' }}
                  </p>
                </div>
                <RouterLink
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                  @click="closeUserMenu"
                >
                  个人资料
                </RouterLink>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                >
                  <div class="flex items-center">
                    <ArrowRightOnRectangleIcon class="mr-2 h-4 w-4 text-gray-400" />
                    <span>退出登录</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页面内容 -->
      <main class="flex-1 w-full">
        <slot></slot>
      </main>
    </div>
  </div>
</template>
