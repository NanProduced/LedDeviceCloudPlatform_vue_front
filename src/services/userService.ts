import api, { ApiResponse, UserInfo } from './api'

// 创建用户请求参数
export interface CreateUserRequest {
  ugid: number
  roles: number[]
  username: string
  password: string
  email: string
  phone: string
}

// 修改密码请求参数
export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}

// 移动用户请求参数
export interface MoveUserRequest {
  uid: number
  sourceUgid: number
  targetUgid: number
}

// 用户服务
export const userService = {
  // 获取当前登录用户信息
  getCurrentUser: () => {
    return api.get<ApiResponse<UserInfo>>('/user/current')
  },

  // 创建用户
  createUser: (userData: CreateUserRequest) => {
    return api.post<ApiResponse<any>>('/user/create', userData)
  },

  // 修改密码
  changePassword: (passwordData: ChangePasswordRequest) => {
    return api.post<ApiResponse<any>>('/user/modify/pwd', passwordData)
  },

  // 解封用户
  activateUser: (uid: number) => {
    return api.post<ApiResponse<any>>(`/user/active?uid=${uid}`)
  },

  // 封禁用户
  deactivateUser: (uid: number) => {
    return api.post<ApiResponse<any>>(`/user/inactive?uid=${uid}`)
  },

  // 删除用户
  deleteUser: (uid: number) => {
    return api.post<ApiResponse<any>>(`/user/delete?uid=${uid}`)
  },

  // 移动用户
  moveUser: (moveData: MoveUserRequest) => {
    return api.post<ApiResponse<any>>('/user/move', moveData)
  },

  // TODO: 获取用户组内用户列表 (待后端实现)
  getUsersInGroup: (ugid: number) => {
    return api.get<ApiResponse<UserInfo[]>>(`/user/list?ugid=${ugid}`)
  },
}

export default userService
