import api from './api'

// 权限信息类型
export interface Permission {
  pid: number // 主键ID
  permissionId?: number // API返回的字段
  name?: string // 前端使用的字段
  permissionName?: string // API返回的字段
  description?: string // 前端使用的字段
  permissionDescription?: string // API返回的字段
  type?: string // 权限类型
  permissionType?: string // API返回的字段
  apiPath?: string // 可选的API路径字段
}

// 将API返回的权限数据转换为统一格式
const normalizePermission = (perm: any): Permission => {
  // 确保返回的对象包含所有可能的字段
  return {
    pid: perm.permissionId || perm.pid || 0,
    permissionId: perm.permissionId || perm.pid,
    name: perm.permissionName || perm.name,
    permissionName: perm.permissionName || perm.name,
    description: perm.permissionDescription || perm.description,
    permissionDescription: perm.permissionDescription || perm.description,
    type: perm.permissionType || perm.type || '其他',
    permissionType: perm.permissionType || perm.type,
    apiPath: perm.apiPath,
  }
}

// 获取当前用户可用权限
export const permissionService = {
  // 获取当前用户权限（已分组）
  getCurrentUserPermissions: () => {
    console.log('API调用: getCurrentUserPermissions')
    return api
      .get<Record<string, any[]>>('/permission/get') // 移除重复的/core/api前缀
      .then((response) => {
        console.log('getCurrentUserPermissions 响应成功:', response)

        // 处理API返回的数据格式
        const normalizedData: Record<string, Permission[]> = {}

        // 获取响应数据，可能在data.data中或直接在data中
        const responseData = response.data?.data || response.data || {}

        for (const group in responseData) {
          if (Array.isArray(responseData[group])) {
            normalizedData[group] = responseData[group].map(normalizePermission)
          }
        }

        console.log('规范化后的权限数据:', normalizedData)
        return normalizedData
      })
      .catch((error) => {
        console.error('getCurrentUserPermissions 调用失败:', error)

        // 开发环境下提供模拟数据
        if (process.env.NODE_ENV === 'development') {
          console.log('开发环境: 使用模拟权限数据')
          return permissionService.mockGroupedPermissions()
        }

        throw error
      })
  },

  // 获取用户可用权限（用于角色创建/编辑时选择）
  getAvailablePermissions: () => {
    console.log('API调用: getAvailablePermissions')
    return api
      .get<Record<string, any[]>>('/permission/get') // 移除重复的/core/api前缀
      .then((response) => {
        console.log('getAvailablePermissions 响应成功:', response)

        // 处理API返回的数据格式
        const normalizedData: Record<string, Permission[]> = {}

        // 获取响应数据，可能在data.data中或直接在data中
        const responseData = response.data?.data || response.data || {}

        for (const group in responseData) {
          if (Array.isArray(responseData[group])) {
            normalizedData[group] = responseData[group].map(normalizePermission)
          }
        }

        console.log('规范化后的权限数据:', normalizedData)
        return normalizedData
      })
      .catch((error) => {
        console.error('getAvailablePermissions 调用失败:', error)
        // 如果接口不存在，回退到使用getCurrentUserPermissions
        console.log('尝试回退到getCurrentUserPermissions')
        return permissionService.getCurrentUserPermissions()
      })
  },

  // 模拟权限数据（用于开发环境测试）
  mockGroupedPermissions: (): Record<string, Permission[]> => {
    return {
      用户管理: [
        { pid: 1, name: '用户查看', description: '查看用户列表', type: 'API' },
        { pid: 2, name: '用户创建', description: '创建用户', type: 'API' },
        { pid: 3, name: '用户编辑', description: '编辑用户信息', type: 'API' },
        { pid: 4, name: '用户删除', description: '删除用户', type: 'API' },
        { pid: 5, name: '用户导出', description: '导出用户数据', type: 'API' },
        { pid: 6, name: '用户导入', description: '导入用户数据', type: 'API' },
      ],
      用户组管理: [
        { pid: 7, name: '用户组查看', description: '查看用户组列表', type: 'API' },
        { pid: 8, name: '用户组创建', description: '创建用户组', type: 'API' },
        { pid: 9, name: '用户组编辑', description: '编辑用户组', type: 'API' },
        { pid: 10, name: '用户组删除', description: '删除用户组', type: 'API' },
      ],
      角色管理: [
        { pid: 11, name: '角色查看', description: '查看角色列表', type: 'API' },
        { pid: 12, name: '角色创建', description: '创建角色', type: 'API' },
        { pid: 13, name: '角色删除', description: '删除角色', type: 'API' },
      ],
    }
  },
}

export default permissionService
