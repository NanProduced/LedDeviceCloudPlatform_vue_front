import { defineStore } from 'pinia'
import userService, {
  CreateUserRequest,
  MoveUserRequest,
  ChangePasswordRequest,
} from '@/services/userService'
import userGroupService, {
  UserGroupUserQueryParams,
  UserListItem,
  PageResponse,
} from '@/services/userGroupService'
import { UserInfo } from '@/services/api'

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as UserInfo | null,
    isAuthenticated: false,
    users: [] as UserInfo[],
    userListItems: [] as UserListItem[],
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    },
    loading: false,
    error: null as string | null,
  }),

  getters: {
    getUserById: (state) => (id: number) => state.users.find((user) => user.uid === id),
  },

  actions: {
    // 加载当前用户信息
    async loadCurrentUser() {
      this.loading = true
      try {
        const response = await userService.getCurrentUser()
        this.currentUser = response.data.data
        this.isAuthenticated = true
        this.error = null
      } catch (error: any) {
        this.error = error.message || '获取用户信息失败'
        this.isAuthenticated = false
      } finally {
        this.loading = false
      }
    },

    // 加载指定用户组的用户列表 (旧方法，保留兼容)
    async loadUsersInGroup(ugid: number) {
      this.loading = true
      try {
        const response = await userService.getUsersInGroup(ugid)
        this.users = response.data.data
        this.error = null
      } catch (error: any) {
        this.error = error.message || '获取用户列表失败'
      } finally {
        this.loading = false
      }
    },

    // 根据用户组ID查询用户列表（分页）
    async loadUserListByGroup(queryParams: UserGroupUserQueryParams) {
      this.loading = true
      try {
        const response = await userGroupService.getUserListByGroup(queryParams)
        const pageData = response.data.data
        this.userListItems = pageData.records
        this.pagination = {
          pageNum: pageData.pageNum,
          pageSize: pageData.pageSize,
          total: pageData.total,
          totalPages: pageData.totalPages,
          hasNext: pageData.hasNext,
          hasPrevious: pageData.hasPrevious,
        }
        this.error = null
        return pageData
      } catch (error: any) {
        this.error = error.message || '获取用户列表失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 创建用户
    async createUser(userData: CreateUserRequest) {
      this.loading = true
      try {
        const response = await userService.createUser(userData)
        this.error = null

        // 如果当前已加载了用户列表，将新用户添加到列表中
        if (this.users.length > 0 && response.data.data) {
          this.users.push(response.data.data)
        }

        return response.data.data
      } catch (error: any) {
        this.error = error.message || '创建用户失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 修改密码
    async changePassword(passwordData: ChangePasswordRequest) {
      this.loading = true
      try {
        await userService.changePassword(passwordData)
        this.error = null
      } catch (error: any) {
        this.error = error.message || '修改密码失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 启用用户
    async activateUser(uid: number) {
      this.loading = true
      try {
        await userService.activateUser(uid)

        // 更新本地用户状态
        const user = this.users.find((u) => u.uid === uid)
        if (user) {
          user.status = 'active'
        }

        // 同时更新userListItems中的状态
        const userItem = this.userListItems.find((u) => u.uid === uid)
        if (userItem) {
          userItem.active = 1
        }

        this.error = null
      } catch (error: any) {
        this.error = error.message || '启用用户失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 禁用用户
    async deactivateUser(uid: number) {
      this.loading = true
      try {
        await userService.deactivateUser(uid)

        // 更新本地用户状态
        const user = this.users.find((u) => u.uid === uid)
        if (user) {
          user.status = 'inactive'
        }

        // 同时更新userListItems中的状态
        const userItem = this.userListItems.find((u) => u.uid === uid)
        if (userItem) {
          userItem.active = 0
        }

        this.error = null
      } catch (error: any) {
        this.error = error.message || '禁用用户失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 删除用户
    async deleteUser(uid: number) {
      this.loading = true
      try {
        await userService.deleteUser(uid)
        // 从本地用户列表中移除
        this.users = this.users.filter((user) => user.uid !== uid)
        // 同时从userListItems中移除
        this.userListItems = this.userListItems.filter((user) => user.uid !== uid)
        this.error = null
      } catch (error: any) {
        this.error = error.message || '删除用户失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 移动用户
    async moveUser(moveData: MoveUserRequest) {
      this.loading = true
      try {
        await userService.moveUser(moveData)
        this.error = null

        // 更新本地用户的用户组信息
        // 注意：这里需要重新加载用户列表，因为移动后用户组信息变更
        if (moveData.sourceUgid === moveData.targetUgid) {
          // 如果是在同一组内移动，可能不需要重新加载
          return
        }

        // 如果当前展示的是源用户组，从列表中移除该用户
        const currentUgid = this.users.length > 0 ? this.users[0].ugid : null
        if (currentUgid === moveData.sourceUgid) {
          this.users = this.users.filter((user) => user.uid !== moveData.uid)
        }

        // 同样处理userListItems
        const currentListUgid = this.userListItems.length > 0 ? this.userListItems[0].ugid : null
        if (currentListUgid === moveData.sourceUgid) {
          this.userListItems = this.userListItems.filter((user) => user.uid !== moveData.uid)
          // 更新总数
          this.pagination.total -= 1
        }
      } catch (error: any) {
        this.error = error.message || '移动用户失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 登出
    logout() {
      this.currentUser = null
      this.isAuthenticated = false
      this.users = []
      this.userListItems = []
      this.pagination = {
        pageNum: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
        hasNext: false,
        hasPrevious: false,
      }
    },
  },
})
