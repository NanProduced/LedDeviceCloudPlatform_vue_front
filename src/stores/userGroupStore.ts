import { defineStore } from 'pinia'
import userGroupService from '@/services/userGroupService'
import type { UserGroupTreeNode, OrganizationDTO } from '@/services/userGroupService'

export const useUserGroupStore = defineStore('userGroup', {
  state: () => ({
    userGroupTree: null as UserGroupTreeNode | null,
    organization: null as OrganizationDTO | null,
    selectedGroup: null as UserGroupTreeNode | null,
    loading: false,
    error: null as string | null,
  }),

  getters: {
    // 递归查找用户组
    findGroupById: (state) => {
      // 递归函数来搜索树
      const findNode = (node: UserGroupTreeNode | null, id: number): UserGroupTreeNode | null => {
        if (!node) return null
        if (node.ugid === id) return node
        if (node.children?.length) {
          for (const child of node.children) {
            const found = findNode(child, id)
            if (found) return found
          }
        }
        return null
      }

      return (id: number) => findNode(state.userGroupTree, id)
    },

    // 获取用户组路径（包含所有父级组）
    getGroupPath: (state) => (id: number) => {
      if (!state.userGroupTree) return []

      const path: UserGroupTreeNode[] = []
      const findPath = (node: UserGroupTreeNode, targetId: number): boolean => {
        if (node.ugid === targetId) {
          path.push(node)
          return true
        }

        if (node.children?.length) {
          for (const child of node.children) {
            if (findPath(child, targetId)) {
              path.unshift(node)
              return true
            }
          }
        }

        return false
      }

      findPath(state.userGroupTree, id)
      return path
    },
  },

  actions: {
    // 加载用户组树
    async loadUserGroupTree() {
      this.loading = true
      try {
        console.log('开始从API加载用户组树...')
        const data = await userGroupService.getUserGroupTree()
        console.log('用户组树API响应:', data)

        // 检查响应数据格式
        if (data && data.root) {
          this.userGroupTree = data.root
          this.organization = data.organization
        } else if (data && data.data && data.data.root) {
          // 处理可能的嵌套响应格式
          this.userGroupTree = data.data.root
          this.organization = data.data.organization
        } else {
          console.error('用户组树数据格式异常:', data)
          this.error = '用户组树数据格式异常'
        }

        // 默认选中根节点
        if (this.userGroupTree) {
          this.selectedGroup = this.userGroupTree
        }
      } catch (error: any) {
        console.error('获取用户组树失败:', error)
        this.error = error.message || '获取用户组树失败'
      } finally {
        this.loading = false
      }
    },

    // 选择用户组
    selectGroup(groupId: number) {
      const group = this.findGroupById(groupId)
      if (group) {
        this.selectedGroup = group
      }
    },

    // 创建用户组
    async createUserGroup(parentId: number, name: string, description?: string) {
      this.loading = true
      try {
        await userGroupService.createUserGroup(parentId, name, description)
        // 重新加载用户组树以获取最新数据
        await this.loadUserGroupTree()
        this.error = null
      } catch (error: any) {
        this.error = error.message || '创建用户组失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // // 更新用户组（如后端支持可补充实现）
    // async updateUserGroup(id: number, name: string, description?: string) {
    //   this.loading = true
    //   try {
    //     await userGroupService.updateUserGroup(id, name, description)
    //     // 更新本地状态
    //     const group = this.findGroupById(id)
    //     if (group) {
    //       group.ugName = name
    //     }
    //     this.error = null
    //   } catch (error: any) {
    //     this.error = error.message || '更新用户组失败'
    //     throw error
    //   } finally {
    //     this.loading = false
    //   }
    // },

    // 删除用户组
    async deleteUserGroup(id: number) {
      this.loading = true
      try {
        await userGroupService.deleteUserGroup(id)
        // 重新加载用户组树以获取最新数据
        await this.loadUserGroupTree()
        this.error = null
      } catch (error: any) {
        this.error = error.message || '删除用户组失败'
        throw error
      } finally {
        this.loading = false
      }
    },

    // 重置状态
    reset() {
      this.userGroupTree = null
      this.organization = null
      this.selectedGroup = null
      this.error = null
    },
  },
})
