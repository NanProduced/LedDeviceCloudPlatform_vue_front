import { defineStore } from 'pinia'
import roleService from '@/services/roleService'
import type {
  RoleInfo,
  CreateRoleRequest,
  UpdateRoleRequest,
  PermissionInfo,
} from '@/services/roleService'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [] as RoleInfo[],
    permissions: [] as PermissionInfo[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getRoleById: (state) => (rid: number) => state.roles.find((role) => role.rid === rid),

    // 按权限过滤角色
    getRolesByPermission: (state) => (permissionId: number) => {
      return state.roles.filter(
        (role) => role.permissions && role.permissions.includes(permissionId),
      )
    },
  },

  actions: {
    // 加载角色列表
    async loadRoles() {
      this.loading = true
      try {
        const response = await roleService.getRoles()
        console.log('roleStore.loadRoles 收到响应:', response)

        // 处理不同的响应格式
        if (response.data && response.data.visibleRoles) {
          this.roles = response.data.visibleRoles
        } else if (response.data && response.data.data && response.data.data.visibleRoles) {
          this.roles = response.data.data.visibleRoles
        } else if (
          response.data &&
          response.data.data &&
          response.data.data.data &&
          response.data.data.data.visibleRoles
        ) {
          this.roles = response.data.data.data.visibleRoles
        } else {
          console.warn('角色数据格式异常:', response)
          this.roles = []
        }

        this.error = null
      } catch (error: any) {
        console.error('加载角色列表失败:', error)
        this.error = error.message || '获取角色列表失败'
        if (process.env.NODE_ENV === 'development') {
          this.roles = roleService.mockRoles()
        }
      } finally {
        this.loading = false
      }
    },
    // 加载权限列表
    async loadPermissions() {
      this.loading = true
      try {
        const response = await roleService.getPermissions()
        console.log('roleStore.loadPermissions 收到响应:', response)

        // 处理不同的响应格式
        if (response.data && response.data.data) {
          this.permissions = response.data.data
        } else if (response.data) {
          this.permissions = response.data
        } else {
          console.warn('权限数据格式异常:', response)
          this.permissions = []
        }

        this.error = null
      } catch (error: any) {
        console.error('加载权限列表失败:', error)
        this.error = error.message || '获取权限列表失败'
        if (process.env.NODE_ENV === 'development') {
          this.permissions = roleService.mockPermissions()
        }
      } finally {
        this.loading = false
      }
    },
    // 创建角色
    async createRole(roleData: CreateRoleRequest) {
      this.loading = true
      try {
        await roleService.createRole(roleData)
        await this.loadRoles()
        this.error = null
      } catch (error: any) {
        this.error = error.message || '创建角色失败'
        throw error
      } finally {
        this.loading = false
      }
    },
    // 更新角色
    async updateRole(roleData: UpdateRoleRequest) {
      this.loading = true
      try {
        await roleService.updateRole(roleData)
        await this.loadRoles()
        this.error = null
      } catch (error: any) {
        this.error = error.message || '更新角色失败'
        throw error
      } finally {
        this.loading = false
      }
    },
    // 删除角色
    async deleteRole(rid: number) {
      this.loading = true
      try {
        await roleService.deleteRole(rid)
        await this.loadRoles()
        this.error = null
      } catch (error: any) {
        this.error = error.message || '删除角色失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 重置状态
    reset() {
      this.roles = []
      this.permissions = []
      this.error = null
    },
  },
})
