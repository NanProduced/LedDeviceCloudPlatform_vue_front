import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LandingView from '../views/LandingView.vue'
import OAuth2CallbackView from '../views/OAuth2CallbackView.vue'
import DashboardView from '../views/DashboardView.vue'
import { userService } from '../services/api'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { requiresAuth: false },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/oauth2/callback',
      name: 'oauth2-callback',
      component: OAuth2CallbackView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true },
    },
  ],
})

// 全局路由守卫，检查用户是否已经登录
router.beforeEach(async (to, from, next) => {
  console.log(`路由守卫: 从 ${from.path} 到 ${to.path}`)

  // 检查路由是否需要身份验证
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    try {
      // 尝试获取用户信息，如果失败则表示未登录
      // Gateway会处理cookie中的认证信息
      console.log('路由守卫: 尝试获取用户信息')
      await userService.getCurrentUser()
      // 成功获取用户信息，允许访问
      console.log('路由守卫: 用户已登录，允许访问')
      next()
    } catch (error) {
      console.error('认证检查失败', error)
      // 未登录，重定向到landing页面
      console.log('路由守卫: 用户未登录，重定向到landing页面')
      next({ name: 'landing' })
    }
  } else if (to.path === '/' && to.name === 'landing') {
    try {
      // 检查是否已登录，如果已登录则直接进入dashboard
      console.log('路由守卫: 访问首页，检查是否已登录')
      await userService.getCurrentUser()
      console.log('路由守卫: 用户已登录，重定向到dashboard')
      next({ name: 'dashboard' })
    } catch {
      // 未登录，允许访问landing页面
      console.log('路由守卫: 用户未登录，允许访问landing页面')
      next()
    }
  } else {
    // 不需要验证的路由，直接访问
    console.log('路由守卫: 不需要验证的路由，直接访问')
    next()
  }
})

export default router
