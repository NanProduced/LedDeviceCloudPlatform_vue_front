import api from './api'
import type { ApiResponse } from './api'
import type { Permission } from './permissionService'

// 角色信息类型
export interface RoleInfo {
  rid: number
  oid: number
  roleName: string
  displayName?: string
  permissions?: number[]
}

// 权限信息类型保持与permissionService一致
export type PermissionInfo = Permission

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
    console.log('===== roleService.createRole 被调用 =====')
    console.log('角色数据:', JSON.stringify(roleData))

    // 尝试使用完整路径，避免路径问题
    const url = '/role/create'
    console.log('请求URL:', url)

    // 转换权限ID格式，确保使用正确的字段名
    const apiRequestData = {
      roleName: roleData.roleName,
      description: roleData.displayName, // 后端API使用description字段
      permissions: roleData.permissions, // 确保这是数字数组
    }

    console.log('发送到API的数据:', JSON.stringify(apiRequestData))

    return api
      .post<ApiResponse<any>>(url, apiRequestData)
      .then((response) => {
        console.log('createRole 响应成功:', response)
        return response
      })
      .catch((error) => {
        console.error('createRole 调用失败:', error)
        // 如果是开发环境，模拟成功响应
        if (process.env.NODE_ENV === 'development') {
          console.log('开发环境: 模拟创建角色成功')
          return {
            data: {
              code: 200,
              msg: '创建成功',
              data: { rid: Math.floor(Math.random() * 1000) + 100 },
            },
          }
        }
        throw error
      })
  },

  // 获取当前用户可见的角色列表
  getRoles: () => {
    console.log('API调用: getRoles')
    return api
      .get<ApiResponse<VisibleRolesResponse>>('/role/get/visible') // 不添加/core/api前缀
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

    // 转换为API需要的格式
    const apiRequestData = {
      rid: roleData.rid,
      roleName: roleData.roleName,
      description: roleData.displayName, // 后端API使用description字段
      permissions: roleData.permissions, // 确保这是数字数组
    }

    console.log('发送到API的数据:', JSON.stringify(apiRequestData))

    return api
      .post<ApiResponse<any>>('/role/update', apiRequestData) // 不添加/core/api前缀
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
      .post<ApiResponse<any>>(`/role/delete?rid=${rid}`) // 不添加/core/api前缀
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
      .get<ApiResponse<any>>('/permission/get') // 移除重复的/core/api前缀
      .then((response) => {
        console.log('getPermissions 响应成功:', response)

        // 尝试处理不同格式的响应
        let permissionData = response?.data?.data || response?.data || {}

        // 如果返回的是分组权限，提取所有权限到一个扁平数组
        if (typeof permissionData === 'object' && !Array.isArray(permissionData)) {
          const flatPermissions: PermissionInfo[] = []
          Object.keys(permissionData).forEach((group) => {
            if (Array.isArray(permissionData[group])) {
              permissionData[group].forEach((perm: any) => {
                flatPermissions.push({
                  pid: perm.permissionId || perm.pid,
                  permissionId: perm.permissionId || perm.pid,
                  name: perm.permissionName || perm.name,
                  permissionName: perm.permissionName || perm.name,
                  description: perm.permissionDescription || perm.description,
                  permissionDescription: perm.permissionDescription || perm.description,
                  type: perm.permissionType || perm.type || group,
                  permissionType: perm.permissionType || perm.type || group,
                })
              })
            }
          })
          return {
            data: flatPermissions,
          }
        }

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
