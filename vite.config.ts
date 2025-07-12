import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '192.168.1.222', // 明确指定主机IP
    port: 5179, // 使用一个可能未被占用的端口
    strictPort: false, // 如果端口被占用，尝试下一个可用端口
    proxy: {
      '/core': {
        target: 'http://192.168.1.222:8082',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
