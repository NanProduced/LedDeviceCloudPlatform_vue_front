import api, { ApiResponse } from './api'

// 角色信息类型
export interface RoleInfo {
  id: number
  roleName: string
  permissions: number[]
  [key: string]: unknown
}

// 创建角色请求
export interface CreateRoleRequest {
  roleName: string
  permissions: number[]
}

// 角色服务
const roleService = {
  // 创建角色
  createRole: (roleData: CreateRoleRequest) => {
    return api.post<ApiResponse<any>>('/role/create', roleData)
  },

  // TODO: 获取角色列表 (待后端实现)
  getRoles: () => {
    return api.get<ApiResponse<RoleInfo[]>>('/role/list')
  },

  // TODO: 更新角色 (待后端实现)
  updateRole: (id: number, roleData: Partial<CreateRoleRequest>) => {
    return api.post<ApiResponse<any>>('/role/update', { id, ...roleData })
  },

  // TODO: 删除角色 (待后端实现)
  deleteRole: (id: number) => {
    return api.post<ApiResponse<any>>(`/role/delete?id=${id}`)
  },

  // TODO: 获取权限列表 (待后端实现)
  getPermissions: () => {
    return api.get<ApiResponse<any[]>>('/role/permissions')
  },
}

export default roleService
