<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
    <!-- 导航栏 -->
    <header
      class="fixed w-full z-50 bg-opacity-80 backdrop-blur-md bg-gray-900 border-b border-gray-800"
    >
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <!-- Logo可以替换为实际的SVG或图片 -->
          <div
            class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
          >
            <span class="font-bold text-xl">L</span>
          </div>
          <span
            class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            LED云平台
          </span>
        </div>
        <button
          @click="handleLogin"
          class="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        >
          登录
        </button>
      </div>
    </header>

    <!-- Hero区域 -->
    <section class="pt-32 pb-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span
              class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
            >
              智能LED设备云平台
            </span>
          </h1>
          <p class="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            专业的LED设备管理方案，随时随地远程控制，智能化管理您的设备
          </p>
          <button
            @click="handleLogin"
            class="px-8 py-3 text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
          >
            立即体验
          </button>
        </div>

        <!-- 3D展示图或模拟界面 -->
        <div class="relative w-full h-64 md:h-96 mb-20">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-gray-700 shadow-2xl flex items-center justify-center"
          >
            <div class="text-center">
              <div class="animate-pulse mb-4">
                <div
                  class="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
                >
                  <span class="text-2xl">⚡</span>
                </div>
              </div>
              <p class="text-gray-300">智能控制面板</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 特性部分 -->
    <section class="py-20 px-4 md:px-8 bg-gray-900 bg-opacity-60">
      <div class="container mx-auto max-w-6xl">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          强大的平台特性
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- 特性卡片1 -->
          <div
            class="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
          >
            <div
              class="w-14 h-14 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:bg-opacity-30 transition-all duration-300"
            >
              <span class="text-2xl">📊</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-blue-400">实时监控</h3>
            <p class="text-gray-400">24小时不间断监控您的设备状态和性能，及时发现并解决问题</p>
          </div>

          <!-- 特性卡片2 -->
          <div
            class="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <div
              class="w-14 h-14 rounded-lg bg-purple-500 bg-opacity-20 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:bg-opacity-30 transition-all duration-300"
            >
              <span class="text-2xl">🔄</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-purple-400">远程控制</h3>
            <p class="text-gray-400">随时随地通过云平台控制您的LED设备，灵活调整显示内容和参数</p>
          </div>

          <!-- 特性卡片3 -->
          <div
            class="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
          >
            <div
              class="w-14 h-14 rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:bg-opacity-30 transition-all duration-300"
            >
              <span class="text-2xl">📱</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-blue-400">多端支持</h3>
            <p class="text-gray-400">支持手机、电脑等多种设备访问管理，随时掌控设备运行状态</p>
          </div>

          <!-- 特性卡片4 -->
          <div
            class="bg-gray-800 bg-opacity-50 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 group"
          >
            <div
              class="w-14 h-14 rounded-lg bg-purple-500 bg-opacity-20 flex items-center justify-center mb-6 group-hover:bg-purple-500 group-hover:bg-opacity-30 transition-all duration-300"
            >
              <span class="text-2xl">🔒</span>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-purple-400">安全可靠</h3>
            <p class="text-gray-400">采用OAuth2安全认证，多层加密保障，确保您的数据和设备安全</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 产品展示部分 -->
    <section class="py-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          专业LED解决方案
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div
            class="bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <h3 class="text-xl font-semibold mb-4 text-blue-400">图像处理系统</h3>
            <p class="text-gray-400 mb-4">
              高性能视频处理器和拼接器，支持多种信号输入，实现高质量显示效果
            </p>
            <div class="flex justify-end">
              <button class="text-blue-400 hover:text-blue-300 transition-colors">
                了解更多 →
              </button>
            </div>
          </div>

          <div
            class="bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-300"
          >
            <h3 class="text-xl font-semibold mb-4 text-purple-400">云联网控制</h3>
            <p class="text-gray-400 mb-4">基于云平台的远程控制系统，实现设备的集中管理和智能调度</p>
            <div class="flex justify-end">
              <button class="text-purple-400 hover:text-purple-300 transition-colors">
                了解更多 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 客户评价 -->
    <section class="py-20 px-4 md:px-8 bg-gray-900 bg-opacity-60">
      <div class="container mx-auto max-w-6xl">
        <h2
          class="text-3xl md:text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          客户评价
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700">
            <p class="text-gray-300 mb-6">
              "LED云平台帮助我们实现了设备的智能化管理，大大提高了工作效率，减少了人力成本。"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
              <div>
                <p class="font-medium">张经理</p>
                <p class="text-sm text-gray-400">某科技有限公司</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700">
            <p class="text-gray-300 mb-6">
              "远程控制功能非常实用，让我们可以随时调整显示内容，响应市场需求。"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-purple-500 mr-3"></div>
              <div>
                <p class="font-medium">李总监</p>
                <p class="text-sm text-gray-400">某传媒集团</p>
              </div>
            </div>
          </div>

          <div class="bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700">
            <p class="text-gray-300 mb-6">
              "系统稳定性很好，自从使用以来从未出现过严重故障，售后服务也很及时。"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 rounded-full bg-blue-500 mr-3"></div>
              <div>
                <p class="font-medium">王工程师</p>
                <p class="text-sm text-gray-400">某电子科技公司</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部CTA区域 -->
    <section class="py-20 px-4 md:px-8">
      <div class="container mx-auto max-w-4xl text-center">
        <h2
          class="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
        >
          立即开始使用LED云平台
        </h2>
        <p class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          加入我们，体验专业的LED设备云管理平台，提升您的设备管理效率
        </p>
        <button
          @click="handleLogin"
          class="px-8 py-3 text-lg rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
        >
          立即登录
        </button>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="py-10 px-4 md:px-8 bg-gray-900 border-t border-gray-800">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="mb-6 md:mb-0">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <span class="font-bold text-sm">L</span>
              </div>
              <span
                class="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              >
                LED云平台
              </span>
            </div>
          </div>
          <div class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} LED设备云平台 版权所有
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// OAuth2登录处理
const handleLogin = () => {
  // 动态获取当前主机地址作为回调URL
  const currentHost = window.location.origin
  const callbackUrl = `${currentHost}/oauth2/callback`

  // 跳转到Gateway OAuth2认证入口，并带上前端回调地址
  window.location.href = `http://192.168.1.222:8082/oauth2/authorization/gateway-server?redirect_uri=${encodeURIComponent(callbackUrl)}`
}
</script>
