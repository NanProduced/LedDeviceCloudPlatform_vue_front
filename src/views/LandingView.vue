<template>
  <div class="min-h-screen bg-black text-white">
    <!-- 导航栏 -->
    <header
      class="fixed w-full z-50 bg-opacity-80 backdrop-blur-md bg-black border-b border-gray-800"
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
            LED Cloud Platform
          </span>
        </div>
        <button
          @click="handleLogin"
          class="px-6 py-2 rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
        >
          Login Now
        </button>
      </div>
    </header>

    <!-- Hero区域 -->
    <section class="pt-32 pb-20 px-4 md:px-8 relative">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute w-2 h-2 rounded-full bg-blue-400 top-1/4 left-1/4 animate-pulse"></div>
        <div
          class="absolute w-1 h-1 rounded-full bg-purple-400 top-1/3 right-1/3 animate-pulse"
        ></div>
        <div
          class="absolute w-2 h-2 rounded-full bg-blue-400 bottom-1/4 right-1/4 animate-pulse"
        ></div>
      </div>
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
              LED Cloud Platform
            </h1>
            <p class="text-xl md:text-2xl text-gray-300 max-w-xl mb-10">
              A new solution for every step
            </p>
            <p class="text-gray-400 mb-8">Optimizr your brider and man proozimaaramer</p>
            <button
              @click="handleLogin"
              class="px-8 py-3 text-lg rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
            >
              Login Now
            </button>

            <div class="mt-12">
              <div class="flex items-center mb-2">
                <img
                  src="https://placehold.co/48x48/circular"
                  class="w-12 h-12 rounded-full mr-4"
                  alt="User photo"
                />
                <div>
                  <p class="font-medium">Cliars Swith</p>
                  <p class="text-sm text-gray-400">Mooarning intector</p>
                </div>
              </div>
              <p class="text-gray-300 italic">
                "The best platform for cloud management we've most —it's leaded With teatures."
              </p>
              <p class="text-sm text-gray-400 mt-2">Are your py to use our pasform.</p>
            </div>
          </div>

          <div class="relative">
            <div class="relative">
              <!-- 3D云朵和平台图像 -->
              <img
                src="/src/assets/cloud_3d.svg"
                alt="Cloud Platform"
                class="w-full h-auto object-contain"
                onerror="this.onerror=null; this.src='https://placehold.co/600x400/3B82F6/FFFFFF?text=Cloud+Platform';"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products部分 -->
    <section class="py-20 px-4 md:px-8 bg-black">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Products</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <!-- 产品卡片1 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">📺</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Video Splicer</h3>
          </div>

          <!-- 产品卡片2 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">⚙️</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Super Processor</h3>
          </div>

          <!-- 产品卡片3 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">💻</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Professional Processor</h3>
          </div>

          <!-- 产品卡片4 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">🌐</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">AV over IP</h3>
          </div>

          <!-- 产品卡片5 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">📊</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Software</h3>
          </div>

          <!-- 产品卡片6 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">📡</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Sender</h3>
          </div>

          <!-- 产品卡片7 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">📟</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Receiving Card</h3>
          </div>

          <!-- 产品卡片8 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">🔌</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Accessories</h3>
          </div>

          <!-- 产品卡片9 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">🔍</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Calibration System</h3>
          </div>

          <!-- 产品卡片10 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">🤖</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">AI Media Station</h3>
          </div>

          <!-- 产品卡片11 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">▶️</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Cloud Player</h3>
          </div>

          <!-- 产品卡片12 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-4 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center"
          >
            <div
              class="w-12 h-12 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-4"
            >
              <span class="text-blue-400 text-xl">☁️</span>
            </div>
            <h3 class="text-sm font-medium mb-2 text-white">Cloud Server</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions部分 -->
    <section class="py-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Solutions</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <!-- 解决方案1 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-2">•</span>
              <h3 class="text-lg font-semibold text-blue-400">Heaolngomize P-Sealon</h3>
            </div>
          </div>

          <!-- 解决方案2 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-2">•</span>
              <h3 class="text-lg font-semibold text-blue-400">Domradiaci9 Siditlan</h3>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <!-- 解决方案3 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-2">•</span>
              <h3 class="text-lg font-semibold text-blue-400">So and to neoe bising solution</h3>
            </div>
          </div>

          <!-- 解决方案4 -->
          <div
            class="bg-gray-800 bg-opacity-30 p-5 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300"
          >
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-2">•</span>
              <h3 class="text-lg font-semibold text-blue-400">Oulihatu Maassngmet</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3D示意图部分 -->
    <section class="py-20 px-4 md:px-8 bg-black relative">
      <div class="container mx-auto max-w-6xl text-center">
        <div class="relative w-full max-w-2xl mx-auto">
          <!-- 3D立方体图 -->
          <div class="w-full h-64 md:h-96 relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <svg width="300" height="300" viewBox="0 0 300 300" class="text-blue-500">
                <polygon
                  points="150,20 280,100 150,180 20,100"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.6"
                />
                <polygon
                  points="150,180 280,100 280,260 150,340"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.6"
                />
                <polygon
                  points="150,180 150,340 20,260 20,100"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.6"
                />
                <line
                  x1="150"
                  y1="20"
                  x2="150"
                  y2="180"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.6"
                />
                <line
                  x1="280"
                  y1="100"
                  x2="280"
                  y2="260"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.6"
                />
                <line
                  x1="20"
                  y1="100"
                  x2="20"
                  y2="260"
                  stroke="currentColor"
                  stroke-width="2"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>

          <div class="mt-8">
            <ul class="text-left space-y-4">
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">•</span>
                <span class="text-gray-300">Gosage mode</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">•</span>
                <span class="text-gray-300">Cltiy Sactornfindeve Solution</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">•</span>
                <span class="text-gray-300">an the Levi Voep with mode</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Cases部分 -->
    <section class="py-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <h2 class="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Cases</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-xl font-semibold mb-3 text-blue-400">Daspnpment</h3>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-white">Timiled Missee</h3>
          </div>

          <div>
            <h3 class="text-xl font-semibold mb-3 text-blue-400">Company Nelp</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- 动态光环部分 -->
    <section class="py-20 px-4 md:px-8 bg-black relative overflow-hidden">
      <div class="container mx-auto max-w-6xl relative z-10">
        <div class="relative w-64 h-64 mx-auto mb-12">
          <!-- 蓝色发光环 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-48 h-48 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
            <div class="w-40 h-40 rounded-full border-4 border-blue-400 opacity-40"></div>
            <div class="w-32 h-32 rounded-full border-2 border-blue-300 opacity-70"></div>
          </div>
        </div>
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
                LED Cloud Platform
              </span>
            </div>
          </div>
          <div class="text-gray-400 text-sm">
            &copy; {{ new Date().getFullYear() }} LED Cloud Platform. All rights reserved.
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
