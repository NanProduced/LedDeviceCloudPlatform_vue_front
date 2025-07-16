<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppLayout from './components/layout/AppLayout.vue'
import { computed } from 'vue'

const route = useRoute()
const needsLayout = computed(() => {
  // 检查当前路由是否需要应用布局
  return route.meta.layout !== 'none'
})
</script>

<template>
  <!-- 根据路由元数据决定是否应用布局 -->
  <AppLayout v-if="needsLayout">
    <RouterView />
  </AppLayout>
  <RouterView v-else />
</template>

<style>
/* 确保整个页面和应用容器没有宽度限制 */
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  width: 100%;
  height: 100%;
  max-width: none;
  margin: 0;
  padding: 0;
  background-color: #0f172a; /* 深色背景 */
  color: #ffffff;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
}
</style>
