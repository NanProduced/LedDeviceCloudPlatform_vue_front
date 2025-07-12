<script setup lang="ts">
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

// 检查当前是否应该显示导航栏（仅在已登录页面显示）
const showNavigation = computed(() => {
  return route.meta.requiresAuth === true
})
</script>

<template>
  <header
    v-if="showNavigation"
    class="fixed w-full z-50 bg-opacity-90 backdrop-blur-md bg-gray-900 border-b border-gray-800"
  >
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <!-- Logo可以替换为实际的SVG或图片 -->
        <div
          class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
        >
          <span class="font-bold text-xl text-white">L</span>
        </div>
        <span
          class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          LED云平台
        </span>
      </div>
      <div class="flex items-center space-x-6">
        <RouterLink to="/dashboard" class="text-gray-300 hover:text-white transition-colors"
          >首页</RouterLink
        >
        <RouterLink to="/about" class="text-gray-300 hover:text-white transition-colors"
          >关于</RouterLink
        >
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style>
/* 移除默认样式限制，使Tailwind CSS可以正常工作 */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
}

/* 自定义样式补充 */
.router-link-active {
  @apply font-medium text-blue-400;
}
</style>
