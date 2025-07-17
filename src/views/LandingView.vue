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
            LED云平台
          </span>
        </div>
        
        <!-- 导航菜单 -->
        <div class="flex items-center space-x-8">
          <nav class="hidden md:flex space-x-8">
            <a href="#solutions" class="text-gray-300 hover:text-white transition-colors duration-300">Solutions</a>
            <a href="#pricing" class="text-gray-300 hover:text-white transition-colors duration-300">Pricing</a>
          </nav>
          
          <!-- 登录按钮 -->
          <a
            href="http://192.168.1.222:8082/oauth2/authorization/gateway-server?redirect_uri=http://192.168.1.222:5179/dashboard"
            class="px-6 py-2 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 text-sm font-medium"
          >
            Login
          </a>
        </div>
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
            <!-- 修改标题样式与原型一致 -->
            <h1
              class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-8 sm:mb-10 leading-tight"
            >
              <div class="text-white relative">
                <div class="animate-slide-up">Imagined For</div>
              </div>
              <div
                class="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 relative"
              >
                <div class="animate-slide-up delay-300">The Cloud Platform</div>
              </div>
            </h1>
            
            <!-- Login Now按钮 -->
            <a
              href="http://192.168.1.222:8082/oauth2/authorization/gateway-server?redirect_uri=http://192.168.1.222:5179/dashboard"
              class="px-8 py-3 text-lg rounded-md bg-blue-500 hover:bg-blue-600 transition-all duration-300 font-medium shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transform hover:-translate-y-1 animate-fade-in opacity-0 inline-block mb-8"
              style="animation-delay: 0.6s"
            >
              Login Now
            </a>
            
            <p
              class="text-2xl sm:text-3xl md:text-4xl text-white max-w-xl mx-auto md:mx-0 mb-6 sm:mb-8 animate-fade-in opacity-0"
              style="animation-delay: 0.8s"
            >
              A new solution for every step
            </p>
            <p
              class="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto md:mx-0 mb-8 sm:mb-10 animate-fade-in opacity-0"
              style="animation-delay: 1s"
            >
              Empower your business, with advanced services/ baddicallmanagement
            </p>

            <div
              class="mt-16 md:mt-20 max-w-lg mx-auto md:mx-0 animate-fade-in opacity-0"
              style="animation-delay: 1.2s"
            >
              <div class="flex items-center mb-6 justify-center md:justify-start">
                <div
                  class="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full bg-blue-500 flex items-center justify-center mr-5 border-2 border-blue-400"
                >
                  <span class="font-bold text-white text-2xl md:text-3xl">A</span>
                </div>
                <div>
                  <p class="font-medium text-xl md:text-2xl">Clara Smith</p>
                  <p class="text-gray-400 text-lg">Mantering Director</p>
                </div>
              </div>
              <p class="text-gray-300 italic text-xl md:text-2xl text-center">
                "The best platform for cloud management we've tried — it's loaded with features."
              </p>
              <p class="text-gray-400 mt-6 text-lg md:text-xl text-center">
                Are you nerpy to use our platform?
              </p>
            </div>
          </div>

          <!-- 2区域 - 云朵图案 - 更贴近原型的3D云朵设计 -->
          <div class="relative mt-10 md:mt-0 flex justify-center" data-aos="fade-left">
            <div class="relative">
              <!-- 更强的发光效果 -->
              <div
                class="absolute -inset-12 bg-gradient-to-r from-blue-500/40 to-purple-500/40 opacity-60 blur-3xl rounded-full"
              ></div>

              <!-- 创建更符合原型的3D云朵SVG -->
              <div class="w-96 h-96 relative z-10">
                <svg
                  viewBox="0 0 400 400"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-full h-full animate-float"
                >
                  <!-- 云朵阴影底部 -->
                  <ellipse
                    cx="200"
                    cy="320"
                    rx="120"
                    ry="25"
                    fill="url(#shadow-gradient)"
                    opacity="0.3"
                  />
                  
                  <!-- 云朵主体背景层 -->
                  <path
                    d="M200,120 C250,120 290,140 310,180 C330,160 360,170 370,200 C380,230 360,250 330,250 C310,270 270,280 200,270 C150,280 110,270 90,250 C70,230 70,200 90,180 C110,140 160,120 200,120 Z"
                    fill="url(#cloud-back-gradient)"
                    opacity="0.8"
                  />
                  
                  <!-- 云朵主体 -->
                  <path
                    d="M200,100 C245,100 285,120 305,160 C325,140 355,150 365,180 C375,210 355,230 325,230 C305,250 265,260 200,250 C155,260 115,250 95,230 C75,210 75,180 95,160 C115,120 165,100 200,100 Z"
                    fill="url(#cloud-main-gradient)"
                    opacity="0.95"
                  />
                  
                  <!-- 云朵前景层 -->
                  <path
                    d="M200,90 C240,90 275,105 290,140 C305,125 330,130 340,155 C345,175 330,190 305,190 C290,205 255,210 200,205 C165,210 130,205 115,190 C100,175 100,155 115,140 C130,105 170,90 200,90 Z"
                    fill="url(#cloud-front-gradient)"
                    opacity="0.98"
                  />
                  
                  <!-- 云朵高光 -->
                  <ellipse
                    cx="220"
                    cy="125"
                    rx="60"
                    ry="30"
                    fill="url(#highlight-gradient)"
                    opacity="0.7"
                  />
                  
                  <!-- 次级高光 -->
                  <ellipse
                    cx="180"
                    cy="140"
                    rx="25"
                    ry="15"
                    fill="url(#highlight-gradient)"
                    opacity="0.5"
                  />

                  <!-- 渐变定义 -->
                  <defs>
                    <linearGradient id="cloud-back-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#1E40AF" />
                      <stop offset="50%" stop-color="#3B82F6" />
                      <stop offset="100%" stop-color="#1E3A8A" />
                    </linearGradient>
                    
                    <linearGradient id="cloud-main-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#3B82F6" />
                      <stop offset="50%" stop-color="#60A5FA" />
                      <stop offset="100%" stop-color="#2563EB" />
                    </linearGradient>
                    
                    <linearGradient id="cloud-front-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#60A5FA" />
                      <stop offset="50%" stop-color="#93C5FD" />
                      <stop offset="100%" stop-color="#3B82F6" />
                    </linearGradient>
                    
                    <linearGradient id="highlight-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#DBEAFE" />
                      <stop offset="50%" stop-color="#BFDBFE" />
                      <stop offset="100%" stop-color="#93C5FD" />
                    </linearGradient>
                    
                    <linearGradient id="shadow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stop-color="#1E40AF" />
                      <stop offset="50%" stop-color="#3B82F6" />
                      <stop offset="100%" stop-color="#1E40AF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              <!-- 添加更多浮动粒子效果 -->
              <div
                class="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none"
              >
                <div
                  class="w-2 h-2 rounded-full bg-blue-400 absolute top-1/4 left-1/4 animate-pulse"
                ></div>
                <div
                  class="w-3 h-3 rounded-full bg-blue-300 absolute bottom-1/3 right-1/4 animate-pulse"
                ></div>
                <div
                  class="w-2 h-2 rounded-full bg-purple-400 absolute top-2/3 right-1/3 animate-pulse"
                ></div>
                <div
                  class="w-1 h-1 rounded-full bg-blue-200 absolute top-1/2 left-1/2 animate-pulse"
                ></div>
                <div
                  class="w-2 h-2 rounded-full bg-cyan-400 absolute top-1/3 left-2/3 animate-pulse"
                ></div>
                <div
                  class="w-1 h-1 rounded-full bg-blue-500 absolute bottom-1/4 left-1/3 animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 添加滚动指示 -->
        <div class="flex justify-center mt-12 sm:mt-16">
          <a
            href="#products"
            class="animate-bounce flex flex-col items-center text-gray-400 hover:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
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
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <!-- 第一行产品 -->
          <!-- 产品卡片1 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="100">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14v2H5z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Video Splicer
            </h3>
            <p class="text-gray-400 text-sm">Professional video processing solutions</p>
          </div>

          <!-- 产品卡片2 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="150">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Super Processor
            </h3>
            <p class="text-gray-400 text-sm">High-performance LED control processors</p>
          </div>

          <!-- 产品卡片3 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="200">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 6H20V16H4M20 18A2 2 0 0 0 22 16V6C22 4.89 21.1 4 20 4H4A2 2 0 0 0 2 6V16A2 2 0 0 0 4 18H0V20H24V18H20Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Professional Processor
            </h3>
            <p class="text-gray-400 text-sm">Advanced LED display processors</p>
          </div>

          <!-- 产品卡片4 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="250">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,19.93C7.05,19.44 4,16.08 4,12C4,11.38 4.08,10.78 4.21,10.21L9,15V16A1,1 0 0,0 10,17H11M17.9,17.39C17.64,16.58 16.9,16 16,16H15V13A1,1 0 0,0 14,12H8V10H10A1,1 0 0,0 11,9V7H13A2,2 0 0,0 15,5V4.59C17.93,5.77 20,8.64 20,12C20,14.08 19.2,15.97 17.9,17.39Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">AV over IP</h3>
            <p class="text-gray-400 text-sm">Audio-visual over IP solutions</p>
          </div>

          <!-- 第二行产品 -->
          <!-- 产品卡片5 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="300">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">Software</h3>
            <p class="text-gray-400 text-sm">Comprehensive LED management software</p>
          </div>

          <!-- 产品卡片6 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="350">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2,8.5C2,7.7 2.7,7 3.5,7H9C9.8,7 10.5,7.7 10.5,8.5C10.5,9.3 9.8,10 9,10H3.5C2.7,10 2,9.3 2,8.5M15.5,7H21C21.8,7 22.5,7.7 22.5,8.5C22.5,9.3 21.8,10 21,10H15.5C14.7,10 14,9.3 14,8.5C14,7.7 14.7,7 15.5,7M21,14H15.5C14.7,14 14,14.7 14,15.5C14,16.3 14.7,17 15.5,17H21C21.8,17 22.5,16.3 22.5,15.5C22.5,14.7 21.8,14 21,14M2,15.5C2,14.7 2.7,14 3.5,14H9C9.8,14 10.5,14.7 10.5,15.5C10.5,16.3 9.8,17 9,17H3.5C2.7,17 2,16.3 2,15.5M11,8.5V15.5C11,16 11.4,16.5 12,16.5C12.6,16.5 13,16 13,15.5V8.5C13,8 12.6,7.5 12,7.5C11.4,7.5 11,8 11,8.5Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">Sender</h3>
            <p class="text-gray-400 text-sm">Signal transmission devices</p>
          </div>

          <!-- 产品卡片7 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="100">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,17H7V7H17M14,2H10A2,2 0 0,0 8,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H8A2,2 0 0,0 10,22H14A2,2 0 0,0 16,20H18A2,2 0 0,0 20,18V6A2,2 0 0,0 18,4H16A2,2 0 0,0 14,2Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Receiving Card
            </h3>
            <p class="text-gray-400 text-sm">Signal receiving components</p>
          </div>

          <!-- 产品卡片8 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="150">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4,8A4,4 0 0,1 8,4A4,4 0 0,1 12,8A4,4 0 0,1 8,12A4,4 0 0,1 4,8M12,18A4,4 0 0,1 16,14A4,4 0 0,1 20,18A4,4 0 0,1 16,22A4,4 0 0,1 12,18M20,4C21.11,4 22,4.89 22,6C22,7.11 21.11,8 20,8C18.89,8 18,7.11 18,6C18,4.89 18.89,4 20,4Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">Accessories</h3>
            <p class="text-gray-400 text-sm">Supporting hardware and tools</p>
          </div>

          <!-- 第三行产品 -->
          <!-- 产品卡片9 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="200">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Calibration System
            </h3>
            <p class="text-gray-400 text-sm">Display calibration solutions</p>
          </div>

          <!-- 产品卡片10 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="250">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              AI Media Station
            </h3>
            <p class="text-gray-400 text-sm">AI-powered media processing</p>
          </div>

          <!-- 产品卡片11 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="300">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Cloud Player
            </h3>
            <p class="text-gray-400 text-sm">Cloud-based content management</p>
          </div>

          <!-- 产品卡片12 -->
          <div class="product-card group" data-aos="fade-up" data-aos-delay="350">
            <div
              class="w-16 h-16 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4 hover-effect transition-colors duration-300"
            >
              <svg class="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,3H21A1,1 0 0,1 22,4V20A1,1 0 0,1 21,21H3A1,1 0 0,1 2,20V4A1,1 0 0,1 3,3M13,13H18L16.5,9H14.5M4,6V10H12V6M13,16H18L16.5,12H14.5M4,12V16H10V12M4,18V20H18V18H4Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold mb-2 text-white">
              Cloud Server
            </h3>
            <p class="text-gray-400 text-sm">Cloud infrastructure solutions</p>
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

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <!-- 解决方案1 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="100">
            <h3 class="text-xl font-semibold text-blue-400 mb-3">
              Rhino AV over IP System
            </h3>
            <p class="text-gray-400 text-sm">
              Advanced audio-visual distribution over IP networks for scalable installations.
            </p>
          </div>

          <!-- 解决方案2 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="200">
            <h3 class="text-xl font-semibold text-blue-400 mb-3">
              5G+8K UHD LED Display Solution
            </h3>
            <p class="text-gray-400 text-sm">Ultra-high definition display solutions with 5G connectivity.</p>
          </div>

          <!-- 解决方案3 -->
          <div class="solution-card" data-aos="fade-up" data-aos-delay="300">
            <h3 class="text-xl font-semibold text-blue-400 mb-3">ST2110 & IPMX Solution</h3>
            <p class="text-gray-400 text-sm">Professional broadcast and media production solutions.</p>
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
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8"
        >
          <!-- 支持项目1 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="100">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">Downloads</h3>
            <p class="text-gray-400 text-sm">
              Access software, drivers, and documentation
            </p>
          </div>

          <!-- 支持项目2 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="150">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,10.5V7A1,1 0 0,0 16,6H4A1,1 0 0,0 3,7V17A1,1 0 0,0 4,18H16A1,1 0 0,0 17,17V13.5L21,17.5V6.5L17,10.5Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">Tutorial Videos</h3>
            <p class="text-gray-400 text-sm">
              Learn through comprehensive video guides
            </p>
          </div>

          <!-- 支持项目3 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="200">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,3L1,9L12,15L21,10.09V17H23V9M5,13.18V17.18L12,21L19,17.18V13.18L12,17L5,13.18Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">CCE Training</h3>
            <p class="text-gray-400 text-sm">Professional certification and training programs</p>
          </div>

          <!-- 支持项目4 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="250">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22S19,14.25 19,9A7,7 0 0,0 12,2Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">Company Map</h3>
            <p class="text-gray-400 text-sm">Find our global offices and service centers</p>
          </div>

          <!-- 支持项目5 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="300">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8,3A2,2 0 0,0 6,5V9A2,2 0 0,1 4,11H3V13H4A2,2 0 0,1 6,15V19A2,2 0 0,0 8,21H10V19H8V14A2,2 0 0,0 6,12A2,2 0 0,0 8,10V5H10V3M16,3A2,2 0 0,1 18,5V9A2,2 0 0,0 20,11H21V13H20A2,2 0 0,0 18,15V19A2,2 0 0,1 16,21H14V19H16V14A2,2 0 0,1 18,12A2,2 0 0,1 16,10V5H14V3H16Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">Colorlight Developer</h3>
            <p class="text-gray-400 text-sm">Developer resources and API documentation</p>
          </div>

          <!-- 支持项目6 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="350">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">Distributor</h3>
            <p class="text-gray-400 text-sm">Find authorized distributors worldwide</p>
          </div>

          <!-- 支持项目7 -->
          <div class="support-card" data-aos="zoom-in" data-aos-delay="400">
            <div class="w-12 h-12 mx-auto rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16,4C16.88,4 17.67,4.5 18,5.26L21,11H17L15.5,9.5L14.5,11H10L8.93,9.22C8.69,8.89 8.32,8.67 7.9,8.67H6.75C6.34,8.67 6,9 6,9.42V14.58C6,15 6.34,15.33 6.75,15.33H7.6C8.1,15.33 8.53,15.1 8.75,14.71L10,12.5H14.5L15.5,14L17,12.5H21L18,18.74C17.67,19.5 16.88,20 16,20H8C7.12,20 6.33,19.5 6,18.74L3,13L6,7.26C6.33,6.5 7.12,6 8,6H16M8,8.67C7.67,8.67 7.33,8.89 7.17,9.22L5.67,12L7.17,14.78C7.33,15.11 7.67,15.33 8,15.33C8.33,15.33 8.67,15.11 8.83,14.78L10.33,12L8.83,9.22C8.67,8.89 8.33,8.67 8,8.67Z"/>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-blue-400 mb-2">Partner</h3>
            <p class="text-gray-400 text-sm">Explore partnership opportunities</p>
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

/* 统一卡片样式 - 符合原型图设计 */
.product-card {
  @apply bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-300 text-center transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20;
}

/* 添加 group 类到 HTML 标签上而不是通过 @apply */
.product-card.group:hover .hover-effect {
  @apply bg-blue-500/30;
}

.solution-card {
  @apply bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20;
}

.case-card {
  @apply bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20;
}

.support-card {
  @apply bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-300 text-center transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20;
}

.about-card {
  @apply bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-600/50 hover:border-blue-400/60 transition-all duration-300 text-center transform hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20;
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
