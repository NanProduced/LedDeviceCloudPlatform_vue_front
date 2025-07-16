import { defineStore } from 'pinia'
import permissionService from '@/services/permissionService'
import type { Permission } from '@/services/permissionService'

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    permissions: {} as Record<string, Permission[]>,
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
  },

  actions: {
    async loadPermissions() {
      this.loading = true
      try {
        const response = await permissionService.getCurrentUserPermissions()
        console.log('permissionStore.loadPermissions 收到响应:', response)

        // 处理不同的响应格式
        if (response.data && response.data.data) {
          this.permissions = response.data.data
        } else if (response.data) {
          this.permissions = response.data
        } else {
          console.warn('权限数据格式异常:', response)
          this.permissions = {}
        }

        this.error = null
      } catch (error: any) {
        console.error('permissionStore.loadPermissions 错误:', error)
        this.error = error.message || '获取权限失败'
        throw error
      } finally {
        this.loading = false
      }
    },
    reset() {
      this.permissions = {}
      this.error = null
    },
  },
})
