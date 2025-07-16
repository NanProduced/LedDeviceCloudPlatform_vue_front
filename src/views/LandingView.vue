<template>
  <div class="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
    <!-- 导航栏 -->
    <header
      class="fixed w-full z-50 bg-opacity-80 backdrop-blur-md bg-black border-b border-gray-800"
    >
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <!-- Logo可以替换为实际的SVG或图片 -->
          <div
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
          >
            <span class="font-bold text-lg sm:text-xl">L</span>
          </div>
          <span
            class="text-lg sm:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
          >
            LED Cloud Platform
          </span>
        </div>
        <!-- 修改导航栏上方的登录按钮 -->
        <a
          href="http://192.168.1.222:8082/oauth2/authorization/gateway-server?redirect_uri=http://192.168.1.222:5179/dashboard"
          class="px-4 sm:px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 text-sm sm:text-base inline-block"
        >
          Login Now
        </a>
      </div>
    </header>

    <!-- Hero区域 - 1区域 -->
    <section
      id="home"
      class="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 md:px-8 relative overflow-hidden"
    >
      <!-- 动态背景效果 -->
      <div class="absolute inset-0 overflow-hidden">
        <!-- 网格背景 -->
        <div class="absolute inset-0 opacity-10">
          <div class="h-full w-full grid grid-cols-12 gap-4">
            <div v-for="i in 12" :key="i" class="border-r border-blue-400/20 h-full"></div>
          </div>
          <div class="h-full w-full grid grid-rows-12 gap-4">
            <div v-for="i in 12" :key="i" class="border-b border-blue-400/20 w-full"></div>
          </div>
        </div>

        <!-- 粒子效果 -->
        <div class="absolute w-2 h-2 rounded-full bg-blue-400 top-1/4 left-1/4 animate-pulse"></div>
        <div
          class="absolute w-1 h-1 rounded-full bg-purple-400 top-1/3 right-1/3 animate-pulse"
        ></div>
        <div
          class="absolute w-2 h-2 rounded-full bg-blue-400 bottom-1/4 right-1/4 animate-pulse"
        ></div>
        <div class="absolute w-1 h-1 rounded-full bg-blue-300 top-1/2 left-1/3 animate-pulse"></div>
        <div
          class="absolute w-1 h-1 rounded-full bg-purple-300 bottom-1/3 left-2/3 animate-pulse"
        ></div>
      </div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="text-center md:text-left md:pr-12" data-aos="fade-right">
            <!-- 修改标题样式与原型一致 - 增大文字并拓宽 -->
            <h1
              class="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 sm:mb-10 leading-tight"
            >
              <span class="text-white relative overflow-hidden inline-block">
                <span class="animate-slide-up">Dream Big</span> </span
              ><br />
              <span
                class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 relative overflow-hidden inline-block"
              >
                <span class="animate-slide-up delay-300">Think Different</span>
              </span>
            </h1>
            <p
              class="text-2xl sm:text-3xl md:text-4xl text-gray-300 max-w-xl mx-auto md:mx-0 mb-6 sm:mb-8 animate-fade-in opacity-0"
              style="animation-delay: 0.6s"
            >
              Your gateway to LED excellence
            </p>
            <p
              class="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-lg mx-auto md:mx-0 mb-8 sm:mb-10 animate-fade-in opacity-0"
              style="animation-delay: 0.8s"
            >
              Transform your digital signage with our cloud platform
            </p>
            <!-- 修改中间部分的Get Started按钮 -->
            <a
              href="http://192.168.1.222:8082/oauth2/authorization/gateway-server?redirect_uri=http://192.168.1.222:5179/dashboard"
              class="px-8 sm:px-10 md:px-12 py-4 md:py-5 text-lg sm:text-xl md:text-2xl rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1 animate-fade-in opacity-0 inline-block"
              style="animation-delay: 1s"
            >
              Get Started
            </a>

            <div
              class="mt-16 md:mt-20 max-w-lg mx-auto md:mx-0 animate-fade-in opacity-0"
              style="animation-delay: 1.2s"
            >
              <div class="flex items-center mb-6 justify-center md:justify-start">
                <div
                  class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-blue-500 flex items-center justify-center mr-5 border-2 border-blue-400"
                >
                  <span class="font-bold text-white text-2xl md:text-3xl">CS</span>
                </div>
                <div>
                  <p class="font-medium text-xl md:text-2xl">James Wilson</p>
                  <p class="text-gray-400 text-lg">Chief Technology Officer</p>
                </div>
              </div>
              <p class="text-gray-300 italic text-xl md:text-2xl">
                "This platform revolutionized how we manage our LED displays worldwide."
              </p>
              <p class="text-gray-400 mt-3 text-lg md:text-xl">
                Experience the next generation of digital signage management
              </p>
            </div>
          </div>

          <!-- 2区域 - 云朵图案 - 优化为更好看的设计 -->
          <div class="relative mt-10 md:mt-0" data-aos="fade-left">
            <div class="relative">
              <!-- 更好的发光效果 -->
              <div
                class="absolute -inset-8 bg-gradient-to-r from-blue-600/30 to-purple-600/30 opacity-40 blur-3xl rounded-full"
              ></div>

              <!-- 创建更符合原型的云朵SVG -->
              <div class="w-full h-auto relative z-10 max-w-md mx-auto">
                <svg
                  viewBox="0 0 400 300"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-auto animate-float"
                >
                  <!-- 发光底座 -->
                  <ellipse
                    cx="200"
                    cy="230"
                    rx="150"
                    ry="35"
                    fill="url(#platform-gradient)"
                    opacity="0.7"
                  />

                  <!-- 显示器/屏幕元素 -->
                  <rect
                    x="150"
                    y="100"
                    width="100"
                    height="80"
                    rx="5"
                    fill="url(#display-gradient)"
                    stroke="#5B8DEF"
                    stroke-width="2"
                  />

                  <!-- 显示器屏幕内容 -->
                  <rect x="155" y="105" width="90" height="70" fill="#1E293B" />

                  <!-- 显示器上的图表/数据可视化 -->
                  <polyline
                    points="155,155 170,140 185,150 200,130 215,145 225,120 240,135"
                    stroke="#4B9FFF"
                    stroke-width="2"
                    fill="none"
                  />

                  <!-- 云朵主体 -->
                  <path
                    d="M280,180 C310,180 330,160 330,130 C330,100 310,80 280,80 C280,50 260,20 220,20 C180,20 150,50 150,90 C120,90 90,110 90,150 C90,190 120,210 150,210 C160,220 180,230 220,230 C260,230 270,210 280,180 Z"
                    fill="url(#cloud-gradient)"
                    opacity="0.85"
                    filter="url(#glow-filter)"
                  />

                  <!-- 连接线和数据点 -->
                  <line
                    x1="180"
                    y1="230"
                    x2="180"
                    y2="260"
                    stroke="#4B9FFF"
                    stroke-width="2"
                    opacity="0.7"
                  />
                  <line
                    x1="220"
                    y1="230"
                    x2="220"
                    y2="270"
                    stroke="#4B9FFF"
                    stroke-width="2"
                    opacity="0.7"
                  />
                  <line
                    x1="260"
                    y1="210"
                    x2="290"
                    y2="240"
                    stroke="#4B9FFF"
                    stroke-width="2"
                    opacity="0.7"
                  />

                  <circle cx="180" cy="260" r="4" fill="#4B9FFF" />
                  <circle cx="220" cy="270" r="4" fill="#4B9FFF" />
                  <circle cx="290" cy="240" r="4" fill="#4B9FFF" />

                  <!-- 设备小图标 -->
                  <circle
                    cx="120"
                    cy="170"
                    r="10"
                    fill="#2C3E8C"
                    stroke="#5B8DEF"
                    stroke-width="1"
                  />
                  <circle
                    cx="290"
                    cy="120"
                    r="8"
                    fill="#2C3E8C"
                    stroke="#5B8DEF"
                    stroke-width="1"
                  />
                  <circle cx="230" cy="60" r="6" fill="#2C3E8C" stroke="#5B8DEF" stroke-width="1" />

                  <!-- 渐变定义 -->
                  <defs>
                    <linearGradient id="cloud-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#5B8DEF" />
                      <stop offset="100%" stop-color="#2C3E8C" />
                    </linearGradient>

                    <linearGradient id="platform-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#3361D8" />
                      <stop offset="100%" stop-color="#5B34DD" />
                    </linearGradient>

                    <linearGradient id="display-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stop-color="#5B8DEF" />
                      <stop offset="100%" stop-color="#2C3E8C" />
                    </linearGradient>

                    <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="10" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                </svg>
              </div>

              <!-- 添加浮动粒子效果 -->
              <div
                class="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
              >
                <div
                  class="w-2 h-2 rounded-full bg-blue-400 absolute top-1/4 left-1/4 animate-pulse"
                ></div>
                <div
                  class="w-3 h-3 rounded-full bg-purple-400 absolute bottom-1/3 right-1/4 animate-pulse"
                ></div>
                <div
                  class="w-2 h-2 rounded-full bg-blue-300 absolute top-2/3 right-1/3 animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 添加滚动指示 -->
        <div class="hidden sm:flex justify-center mt-12 sm:mt-16">
          <a
            href="#products"
            class="animate-bounce flex flex-col items-center text-gray-400 hover:text-gray-300"
          >
            <span class="text-sm mb-2">向下滚动</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L10 14.586l5.293-5.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- 添加红圈部分内容 - 客户评价板块 -->
    <section class="py-8 sm:py-12 px-4 sm:px-6 md:px-8 bg-gray-900 relative overflow-hidden">
      <div class="container mx-auto max-w-7xl">
        <div class="bg-gray-800 bg-opacity-80 rounded-xl p-6 sm:p-8 border border-gray-700">
          <div class="text-center">
            <h2
              class="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
            >
              "This platform revolutionized how we manage our LED displays worldwide."
            </h2>
            <p class="text-base sm:text-lg md:text-xl text-gray-400">
              Experience the next generation of digital signage management
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 数据统计部分 - 原型图中的数字 -->
    <section class="py-12 sm:py-16 px-4 sm:px-6 md:px-8 bg-black bg-opacity-80 relative">
      <div class="container mx-auto max-w-7xl">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <!-- 数据1 -->
          <div class="text-center" data-aos="zoom-in" data-aos-delay="100">
            <div
              class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
            >
              1000+
            </div>
            <div class="text-sm sm:text-base text-gray-400">活跃客户</div>
          </div>

          <!-- 数据2 -->
          <div class="text-center" data-aos="zoom-in" data-aos-delay="200">
            <div
              class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
            >
              5000+
            </div>
            <div class="text-sm sm:text-base text-gray-400">已连接设备</div>
          </div>

          <!-- 数据3 -->
          <div class="text-center" data-aos="zoom-in" data-aos-delay="300">
            <div
              class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
            >
              99.9%
            </div>
            <div class="text-sm sm:text-base text-gray-400">系统稳定性</div>
          </div>

          <!-- 数据4 -->
          <div class="text-center" data-aos="zoom-in" data-aos-delay="400">
            <div
              class="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-2"
            >
              24/7
            </div>
            <div class="text-sm sm:text-base text-gray-400">全天候技术支持</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Products部分 -->
    <section
      id="products"
      class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-black bg-opacity-60 relative"
    >
      <!-- 添加背景效果 -->
      <div class="absolute inset-0 bg-gradient-to-b from-gray-900 to-black opacity-80"></div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
          data-aos="fade-up"
        >
          Products
        </h2>

        <div
          class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
        >
          <!-- 产品卡片1 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="100">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">📺</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Video Splicer
            </h3>
          </div>

          <!-- 产品卡片2 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="150">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">⚙️</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Super Processor
            </h3>
          </div>

          <!-- 产品卡片3 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="200">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">💻</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Professional Processor
            </h3>
          </div>

          <!-- 产品卡片4 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="250">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">🌐</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">AV over IP</h3>
          </div>

          <!-- 产品卡片5 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="300">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">📊</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">Software</h3>
          </div>

          <!-- 产品卡片6 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="350">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">📡</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">Sender</h3>
          </div>

          <!-- 产品卡片7 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="100">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">📟</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Receiving Card
            </h3>
          </div>

          <!-- 产品卡片8 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="150">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">🔌</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">Accessories</h3>
          </div>

          <!-- 产品卡片9 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="200">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">🔍</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Calibration System
            </h3>
          </div>

          <!-- 产品卡片10 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="250">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">🤖</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              AI Media Station
            </h3>
          </div>

          <!-- 产品卡片11 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="300">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">▶️</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Cloud Player
            </h3>
          </div>

          <!-- 产品卡片12 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="350">
            <div
              class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto rounded-lg bg-blue-500 bg-opacity-20 flex items-center justify-center mb-3 sm:mb-4 hover-effect transition-colors duration-300"
            >
              <span class="text-blue-400 text-xl sm:text-2xl">☁️</span>
            </div>
            <h3 class="text-sm sm:text-base md:text-lg font-medium mb-2 text-white">
              Cloud Server
            </h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Solutions部分 -->
    <section
      id="solutions"
      class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black to-gray-900"
    >
      <div class="container mx-auto max-w-7xl">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
          data-aos="fade-up"
        >
          Solutions
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <!-- 解决方案1 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                Rhino AV over IP System
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              高效率、低延迟的AV over IP解决方案
            </p>
          </div>

          <!-- 解决方案2 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                5G+8K UHD LED Display Solution
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">基于5G技术的超高清LED显示解决方案</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <!-- 解决方案3 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="300">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">ST2110 & IPMX Solution</h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">专业级IP媒体传输解决方案</p>
          </div>

          <!-- 解决方案4 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="400">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                Ultra-high Resolution Solution
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">支持16K+超高分辨率LED显示系统</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <!-- 解决方案5 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">In-Camera VFX</h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              虚拟制作解决方案，支持实时特效处理
            </p>
          </div>

          <!-- 解决方案6 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                Creative Display Solution
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              创意LED显示解决方案，支持不规则形状设计
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
          <!-- 解决方案7 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="300">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                3D Display Control Solution
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              3D显示控制系统，支持多层次立体呈现
            </p>
          </div>

          <!-- 解决方案8 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="400">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">Cluster Management</h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              大规模集群管理系统，支持千台设备同步控制
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          <!-- 解决方案9 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="100">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                COB Screen Calibration Solution
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              COB屏幕校准解决方案，确保色彩精准还原
            </p>
          </div>

          <!-- 解决方案10 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="200">
            <div class="flex items-center mb-2 sm:mb-3">
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              <h3 class="text-lg sm:text-xl font-semibold text-blue-400">
                All-in-one Solution for Meeting
              </h3>
            </div>
            <p class="ml-6 text-gray-400 text-sm sm:text-base">
              会议一体化解决方案，支持多地远程协作
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3D示意图部分 -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
      <!-- 背景效果 -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5"></div>

      <div class="container mx-auto max-w-7xl text-center relative z-10">
        <div class="relative w-full max-w-xl sm:max-w-2xl mx-auto" data-aos="zoom-in">
          <!-- 3D立方体图 -->
          <div class="w-full h-48 sm:h-64 md:h-96 relative">
            <div class="absolute inset-0 flex items-center justify-center">
              <div
                class="absolute w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-blue-500 opacity-5 blur-3xl"
              ></div>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 300 300"
                class="text-blue-500 animate-pulse-slow max-w-full"
                style="max-height: 300px"
              >
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

          <div class="mt-6 sm:mt-8" data-aos="fade-up" data-aos-delay="200">
            <ul class="text-left space-y-3 sm:space-y-4 max-w-sm mx-auto">
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">•</span>
                <span class="text-gray-300">Storage mode</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">•</span>
                <span class="text-gray-300">Cloud Synchronization Solution</span>
              </li>
              <li class="flex items-center">
                <span class="text-blue-400 mr-2">•</span>
                <span class="text-gray-300">Enhanced Level View with mode</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Cases部分 -->
    <section
      id="cases"
      class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-gray-900 to-black"
    >
      <div class="container mx-auto max-w-7xl">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
          data-aos="fade-up"
        >
          Cases
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <!-- 案例类别1 -->
          <div class="case-card" data-aos="fade-right">
            <h3
              class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-400 flex items-center"
            >
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              Classic Cases
            </h3>
            <p class="text-gray-400 ml-6 text-base sm:text-lg">
              Industry-leading examples of our platform in action
            </p>
            <div class="mt-3 sm:mt-4 ml-6">
              <div class="flex items-center text-sm sm:text-base mb-2 sm:mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></span>
                <span class="text-gray-300">International Event Displays</span>
              </div>
              <div class="flex items-center text-sm sm:text-base mb-2 sm:mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></span>
                <span class="text-gray-300">Broadcast Studio Solutions</span>
              </div>
              <div class="flex items-center text-sm sm:text-base mb-2 sm:mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></span>
                <span class="text-gray-300">Concert & Event Visualization</span>
              </div>
            </div>
          </div>

          <!-- 案例类别2 -->
          <div class="case-card" data-aos="fade-left">
            <h3
              class="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-blue-400 flex items-center"
            >
              <span class="text-blue-400 mr-2 sm:mr-3 text-xl sm:text-2xl">•</span>
              Application Cases
            </h3>
            <p class="text-gray-400 ml-6 text-base sm:text-lg">
              Real-world applications across various industries
            </p>
            <div class="mt-3 sm:mt-4 ml-6">
              <div class="flex items-center text-sm sm:text-base mb-2 sm:mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></span>
                <span class="text-gray-300">Virtual Production Studios</span>
              </div>
              <div class="flex items-center text-sm sm:text-base mb-2 sm:mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></span>
                <span class="text-gray-300">Control Room Implementations</span>
              </div>
              <div class="flex items-center text-sm sm:text-base mb-2 sm:mb-3">
                <span class="w-2 h-2 bg-blue-500 rounded-full mr-2 sm:mr-3"></span>
                <span class="text-gray-300">Exhibition & Museum Displays</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support部分 -->
    <section
      id="support"
      class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-black bg-opacity-90 relative overflow-hidden"
    >
      <!-- 背景效果 -->
      <div class="absolute inset-0 bg-gradient-to-r from-blue-900/5 to-purple-900/5"></div>

      <div class="container mx-auto max-w-7xl relative z-10">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
          data-aos="fade-up"
        >
          Support
        </h2>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        >
          <!-- 支持项目1 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Downloads</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">
              Software, drivers, and documentation for our products
            </p>
          </div>

          <!-- 支持项目2 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="150">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Tutorial Videos</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">
              Step-by-step video guides for setup and configuration
            </p>
          </div>

          <!-- 支持项目3 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">CCE Training</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">Certified Cloud Engineer training programs</p>
          </div>

          <!-- 支持项目4 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="250">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Company Map</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">Global offices and service centers</p>
          </div>

          <!-- 支持项目5 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Colorlight Developer</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">API documentation and development resources</p>
          </div>

          <!-- 支持项目6 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="350">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Distributor</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">Authorized distributor network worldwide</p>
          </div>

          <!-- 支持项目7 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="400">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Partner</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">Strategic technology and integration partners</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us部分 -->
    <section
      id="about"
      class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-gradient-to-b from-black to-gray-900"
    >
      <div class="container mx-auto max-w-7xl">
        <h2
          class="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 md:mb-20 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300"
          data-aos="fade-up"
        >
          About Us
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <!-- 关于我们项目1 -->
          <div class="about-card" data-aos="flip-up" data-aos-delay="100">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">History</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">Our journey from startup to industry leader</p>
          </div>

          <!-- 关于我们项目2 -->
          <div class="about-card" data-aos="flip-up" data-aos-delay="200">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Corporate Vision</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">Shaping the future of display technology</p>
          </div>

          <!-- 关于我们项目3 -->
          <div class="about-card" data-aos="flip-up" data-aos-delay="300">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Corporate Mission</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">
              Empowering creativity through innovative technology
            </p>
          </div>

          <!-- 关于我们项目4 -->
          <div class="about-card" data-aos="flip-up" data-aos-delay="400">
            <div class="flex items-center mb-3">
              <span class="text-blue-400 mr-3 text-2xl">•</span>
              <h3 class="text-xl font-semibold text-blue-400">Corporate Values</h3>
            </div>
            <p class="text-gray-400 text-sm ml-6">
              Innovation, quality, integrity and customer focus
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 动态光环部分 -->
    <section class="py-16 sm:py-20 px-4 sm:px-6 md:px-8 bg-black relative overflow-hidden">
      <div class="container mx-auto max-w-7xl relative z-10">
        <div
          class="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 mx-auto mb-8 sm:mb-12"
          data-aos="zoom-in"
        >
          <!-- 蓝色发光环 -->
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-36 sm:w-40 md:w-48 h-36 sm:h-40 md:h-48 rounded-full bg-blue-500 opacity-10 blur-xl animate-pulse-slow"
            ></div>
            <div
              class="w-32 sm:w-36 md:w-40 h-32 sm:h-36 md:h-40 rounded-full border-4 border-blue-400 opacity-40 animate-spin-slow"
            ></div>
            <div
              class="w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32 rounded-full border-2 border-blue-300 opacity-70"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="py-8 sm:py-10 px-4 sm:px-6 md:px-8 bg-gray-900 border-t border-gray-800">
      <div class="container mx-auto max-w-7xl">
        <div class="flex flex-col md:flex-row justify-between items-center mb-8">
          <div class="mb-6 md:mb-0">
            <div class="flex items-center space-x-2">
              <div
                class="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center"
              >
                <span class="font-bold text-xs sm:text-sm">L</span>
              </div>
              <span
                class="text-base sm:text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500"
              >
                LED Cloud Platform
              </span>
            </div>
          </div>

          <div class="flex space-x-6 mb-6 md:mb-0">
            <a href="#home" class="text-gray-400 hover:text-white transition-colors">首页</a>
            <a href="#products" class="text-gray-400 hover:text-white transition-colors">产品</a>
            <a href="#solutions" class="text-gray-400 hover:text-white transition-colors"
              >解决方案</a
            >
            <a href="#cases" class="text-gray-400 hover:text-white transition-colors">案例</a>
            <a href="#support" class="text-gray-400 hover:text-white transition-colors">支持</a>
            <a href="#about" class="text-gray-400 hover:text-white transition-colors">关于我们</a>
          </div>

          <div class="flex space-x-4">
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 8c0 .557-.447 1.008-1 1.008s-1-.45-1-1.008c0-.557.447-1.008 1-1.008s1 .452 1 1.008zm0 2h-2v6h2v-6zm3 0h-2v6h2v-2.861c0-1.722 2.002-1.881 2.002 0v2.861h1.998v-3.359c0-3.284-3.128-3.164-4-1.548v-1.093z"
                />
              </svg>
            </a>
            <a href="#" class="text-gray-400 hover:text-white transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 10h-2v2h2v6h3v-6h1.82l.18-2h-2v-.833c0-.478.096-.667.558-.667h1.442v-2.5h-2.404c-1.798 0-2.596.792-2.596 2.308v1.692z"
                />
              </svg>
            </a>
          </div>
        </div>

        <hr class="border-gray-800 mb-8" />

        <div class="flex flex-col md:flex-row justify-between items-center text-sm">
          <div class="text-gray-400 text-xs sm:text-sm mb-4 md:mb-0">
            &copy; {{ new Date().getFullYear() }} LED Cloud Platform. All rights reserved.
          </div>
          <div class="flex space-x-6 text-xs sm:text-sm text-gray-500">
            <a href="#" class="hover:text-gray-400 transition-colors">隐私政策</a>
            <a href="#" class="hover:text-gray-400 transition-colors">服务条款</a>
            <a href="#" class="hover:text-gray-400 transition-colors">联系我们</a>
          </div>
        </div>
      </div>
    </footer>

    <!-- 回到顶部按钮 -->
    <button
      @click="scrollToTop"
      class="fixed bottom-6 right-6 p-2 rounded-full bg-blue-500 text-white shadow-lg z-50 hover:bg-blue-600 transition-all duration-300 transform hover:scale-110"
      :class="{
        'translate-y-20 opacity-0': !showBackToTop,
        'translate-y-0 opacity-100': showBackToTop,
      }"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

// 滚动相关函数和状态

// 滚动相关状态
const isScrolled = ref(false)
const showBackToTop = ref(false)

// 滚动监听函数
const handleScroll = () => {
  const scrollPosition = window.scrollY
  isScrolled.value = scrollPosition > 50
  showBackToTop.value = scrollPosition > 500

  // 如果有ID锚点，处理滚动导航高亮
  const sections = document.querySelectorAll('section[id]')
  sections.forEach((section) => {
    const sectionTop = (section as HTMLElement).offsetTop - 100
    const sectionHeight = (section as HTMLElement).offsetHeight
    const sectionId = section.getAttribute('id')

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-link').forEach((link) => {
        link.classList.remove('active')
      })
      document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active')
    }
  })
}

// 生命周期钩子
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 回到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<style>
/* 自定义动画 */
@keyframes pulse-slow {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.4;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animate-spin-slow {
  animation: spin-slow 12s linear infinite;
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-slide-up {
  animation: slide-up 0.8s ease-out forwards;
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

.delay-300 {
  animation-delay: 300ms;
}

/* 统一卡片样式 */
.product-card {
  @apply bg-gray-800 bg-opacity-30 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 text-center transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10;
}

/* 添加 group 类到 HTML 标签上而不是通过 @apply */
.product-card.group:hover .hover-effect {
  @apply bg-blue-500/30;
}

.solution-card {
  @apply bg-gray-800 bg-opacity-30 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10;
}

.case-card {
  @apply bg-gray-800 bg-opacity-30 p-4 sm:p-5 md:p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10;
}

.support-card {
  @apply bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10;
}

.about-card {
  @apply bg-gray-800 bg-opacity-30 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10;
}

/* 添加媒体查询，根据屏幕大小调整布局 */
@media screen and (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

@media screen and (min-width: 1536px) {
  .container.max-w-7xl {
    max-width: 90rem; /* 1440px */
  }
}
</style>
