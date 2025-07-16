import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LandingView from '../views/LandingView.vue'
import DashboardView from '../views/DashboardView.vue'
import OAuth2CallbackView from '../views/OAuth2CallbackView.vue'
import { useUserStore } from '@/stores/userStore'

// 懒加载路由
const UserListView = () => import('../views/UserListView.vue')
const ProfileView = () => import('../views/ProfileView.vue')
const OrganizationView = () => import('../views/OrganizationView.vue')
const UserGroupView = () => import('../views/UserGroupView.vue')
const RolesView = () => import('../views/RolesView.vue')
const TerminalListView = () => import('../views/TerminalListView.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingView,
      meta: { requiresAuth: false, layout: 'none' },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: '/oauth2/callback',
      name: 'oauth2-callback',
      component: OAuth2CallbackView,
      meta: { requiresAuth: false, layout: 'none' },
    },
    {
      path: '/terminals',
      name: 'terminals',
      component: TerminalListView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    // 用户管理路由
    {
      path: '/users',
      name: 'users',
      component: UserListView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: '/organizations',
      name: 'organizations',
      component: OrganizationView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: '/user-groups',
      name: 'user-groups',
      component: UserGroupView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    {
      path: '/roles',
      name: 'roles',
      component: RolesView,
      meta: { requiresAuth: true, layout: 'app' },
    },
    // 捕获所有未匹配的路由，重定向到首页
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

// 路由守卫，确保认证状态
router.beforeEach(async (to, from, next) => {
  // 获取布局类型
  const layout = to.meta.layout || 'app'

  if (to.meta.requiresAuth) {
    const userStore = useUserStore()

    // 如果尚未加载用户信息，尝试加载
    if (!userStore.isAuthenticated && !userStore.loading) {
      try {
        await userStore.loadCurrentUser()
      } catch (error) {
        console.error('Failed to load user data:', error)
      }
    }

    // 检查认证状态
    if (userStore.isAuthenticated) {
      next()
    } else {
      // 重定向到首页而不是登录页
      next({ path: '/' })
    }
  } else {
    next()
  }
})

export default router
