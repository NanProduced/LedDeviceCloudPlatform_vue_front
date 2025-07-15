import { defineStore } from 'pinia'
import roleService, { RoleInfo, CreateRoleRequest } from '@/services/roleService'

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [] as RoleInfo[],
    permissions: [] as any[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getRoleById: (state) => (id: number) => state.roles.find((role) => role.id === id),

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
        this.roles = response.data.data
        this.error = null
      } catch (error: any) {
        this.error = error.message || '获取角色列表失败'
      } finally {
        this.loading = false
      }
    },

    // 加载权限列表
    async loadPermissions() {
      this.loading = true
      try {
        const response = await roleService.getPermissions()
        this.permissions = response.data.data
        this.error = null
      } catch (error: any) {
        this.error = error.message || '获取权限列表失败'
      } finally {
        this.loading = false
      }
    },

    // 创建角色
    async createRole(roleData: CreateRoleRequest) {
      this.loading = true
      try {
        const response = await roleService.createRole(roleData)

        // 重新加载角色列表以获取最新数据
        await this.loadRoles()

        this.error = null
        return response.data.data
      } catch (error: any) {
        this.error = error.message || '创建角色失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 更新角色
    async updateRole(id: number, roleData: Partial<CreateRoleRequest>) {
      this.loading = true
      try {
        await roleService.updateRole(id, roleData)

        // 更新本地状态
        const role = this.roles.find((r) => r.id === id)
        if (role) {
          if (roleData.roleName) role.roleName = roleData.roleName
          if (roleData.permissions) role.permissions = roleData.permissions
        }

        this.error = null
      } catch (error: any) {
        this.error = error.message || '更新角色失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 删除角色
    async deleteRole(id: number) {
      this.loading = true
      try {
        await roleService.deleteRole(id)

        // 从本地状态中移除
        this.roles = this.roles.filter((role) => role.id !== id)

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
