import { defineStore } from 'pinia'
import permissionService from '@/services/permissionService'
import type { Permission } from '@/services/permissionService'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: {} as Record<string, Permission[]>,
    availablePermissions: {} as Record<string, Permission[]>,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // 获取所有权限分组key
    permissionGroups: (state) => Object.keys(state.permissions),
    // 获取指定分组的权限
    getPermissionsByGroup: (state) => (group: string) => state.permissions[group] || [],
    // 扁平化所有权限
    allPermissions: (state) => Object.values(state.permissions).flat(),
    // 获取可用权限分组
    availablePermissionGroups: (state) => Object.keys(state.availablePermissions),
  },

  actions: {
    async loadPermissions() {
      this.loading = true
      try {
        const response = await permissionService.getCurrentUserPermissions()
        console.log('permissionStore.loadPermissions 收到响应:', response)

        // 直接使用服务层处理后的数据
        this.permissions = response
        console.log('解析后的权限数据:', this.permissions)
        this.error = null
      } catch (error: any) {
        console.error('permissionStore.loadPermissions 错误:', error)
        this.error = error.message || '获取权限失败'

        // 开发环境下提供模拟数据
        if (process.env.NODE_ENV === 'development') {
          console.log('开发环境: 使用模拟权限数据')
          this.permissions = permissionService.mockGroupedPermissions()
          console.log('使用模拟权限数据:', this.permissions)
        }
      } finally {
        this.loading = false
      }
    },

    // 加载可用权限（用于角色创建/编辑）
    async loadAvailablePermissions() {
      this.loading = true
      try {
        const response = await permissionService.getAvailablePermissions()
        console.log('permissionStore.loadAvailablePermissions 收到响应:', response)

        // 直接使用服务层处理后的数据
        this.availablePermissions = response
        console.log('解析后的可用权限数据:', this.availablePermissions)
        this.error = null
      } catch (error: any) {
        console.error('permissionStore.loadAvailablePermissions 错误:', error)
        this.error = error.message || '获取可用权限失败'

        // 开发环境下提供模拟数据
        if (process.env.NODE_ENV === 'development') {
          console.log('开发环境: 使用模拟权限数据')
          this.availablePermissions = permissionService.mockGroupedPermissions()
          console.log('使用模拟可用权限数据:', this.availablePermissions)
        }
      } finally {
        this.loading = false
      }
    },

    reset() {
      this.permissions = {}
      this.availablePermissions = {}
      this.error = null
    },
  },
})
