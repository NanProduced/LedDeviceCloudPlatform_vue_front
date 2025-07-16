import api from './api'
import type { ApiResponse } from './api'

// 角色信息类型
export interface RoleInfo {
  rid: number
  oid: number
  roleName: string
  displayName?: string
  permissions?: number[]
}

// 权限信息类型
export interface PermissionInfo {
  pid: number
  name: string
  description: string
  apiPath?: string
  type: string // API, MENU, FUNCTION 等类型
}

// 可见角色响应类型
export interface VisibleRolesResponse {
  uid: number
  visibleRoles: RoleInfo[]
}

// 创建角色请求
export interface CreateRoleRequest {
  roleName: string
  displayName?: string
  permissions: number[]
}

// 更新角色请求
export interface UpdateRoleRequest {
  rid: number
  roleName?: string
  displayName?: string
  permissions?: number[]
}

// 角色服务
const roleService = {
  // 创建角色
  createRole: (roleData: CreateRoleRequest) => {
    console.log('API调用: createRole', roleData)
    return api
      .post<ApiResponse<any>>('/role/create', roleData)
      .then((response) => {
        console.log('createRole 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('createRole 调用失败:', error)
        throw error
      })
  },

  // 获取当前用户可见的角色列表
  getRoles: () => {
    console.log('API调用: getRoles')
    return api
      .get<ApiResponse<VisibleRolesResponse>>('/role/get/visible')
      .then((response) => {
        console.log('getRoles 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('getRoles 调用失败:', error)
        throw error
      })
  },

  // 更新角色
  updateRole: (roleData: UpdateRoleRequest) => {
    console.log('API调用: updateRole', roleData)
    return api
      .post<ApiResponse<any>>('/role/update', roleData)
      .then((response) => {
        console.log('updateRole 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('updateRole 调用失败:', error)
        throw error
      })
  },

  // 删除角色
  deleteRole: (rid: number) => {
    console.log('API调用: deleteRole', rid)
    return api
      .post<ApiResponse<any>>(`/role/delete?rid=${rid}`)
      .then((response) => {
        console.log('deleteRole 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('deleteRole 调用失败:', error)
        throw error
      })
  },

  // 获取权限列表
  getPermissions: () => {
    console.log('API调用: getPermissions')
    return api
      .get<ApiResponse<PermissionInfo[]>>('/permission/get')
      .then((response) => {
        console.log('getPermissions 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('getPermissions 调用失败:', error)
        throw error
      })
  },

  // ---- 模拟数据（实际开发时移除） ----

  // 模拟权限数据
  mockPermissions: (): PermissionInfo[] => {
    return [
      { pid: 1, name: '用户查看', description: '查看用户列表', apiPath: '/user/list', type: 'API' },
      { pid: 2, name: '用户创建', description: '创建新用户', apiPath: '/user/create', type: 'API' },
      {
        pid: 3,
        name: '用户编辑',
        description: '编辑用户信息',
        apiPath: '/user/update',
        type: 'API',
      },
      { pid: 4, name: '用户删除', description: '删除用户', apiPath: '/user/delete', type: 'API' },
      { pid: 5, name: '角色管理', description: '管理角色', apiPath: '/role/*', type: 'MENU' },
      {
        pid: 6,
        name: '终端查看',
        description: '查看终端列表',
        apiPath: '/terminal/list',
        type: 'API',
      },
      {
        pid: 7,
        name: '终端控制',
        description: '控制终端设备',
        apiPath: '/terminal/control',
        type: 'FUNCTION',
      },
      {
        pid: 8,
        name: '系统配置',
        description: '配置系统参数',
        apiPath: '/system/config',
        type: 'MENU',
      },
    ]
  },

  // 模拟角色数据
  mockRoles: (): RoleInfo[] => {
    return [
      {
        rid: 1,
        oid: 1,
        roleName: 'admin',
        displayName: '管理员',
        permissions: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      { rid: 2, oid: 1, roleName: 'user', displayName: '普通用户', permissions: [1, 6] },
      { rid: 3, oid: 1, roleName: 'operator', displayName: '操作员', permissions: [1, 3, 6, 7] },
    ]
  },
}

export default roleService
