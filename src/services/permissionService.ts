import api from './api'

// 权限信息类型
export interface Permission {
  permissionId: number
  permissionName: string
  permissionDescription: string
  permissionType: string
}

// 获取当前用户可用权限
export const permissionService = {
  getCurrentUserPermissions: () => {
    console.log('API调用: getCurrentUserPermissions')
    return api
      .get<Record<string, Permission[]>>('/permission/get')
      .then((response) => {
        console.log('getCurrentUserPermissions 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('getCurrentUserPermissions 调用失败:', error)
        throw error
      })
  },
}

export default permissionService
