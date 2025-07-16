import api from './api'
import type { ApiResponse, UserInfo } from './api'

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

// 分配角色请求参数
export interface AssignRolesRequest {
  targetUid: number
  rids: number[]
}

// 移动用户请求参数
export interface MoveUserRequest {
  uid: number
  sourceUgid: number
  targetUgid: number
}

// 用户列表请求参数
export interface QueryUserListRequest {
  ugid: number
  includeSubGroups?: boolean
  userNameKeyword?: string
  emailKeyword?: string
  phoneKeyword?: string
  status?: number | null // 0:正常, 1:封禁, null:全部
}

export interface PageRequestDTOQueryUserListRequest {
  pageNum: number
  pageSize: number
  sortField?: string
  sortOrder?: string
  params: QueryUserListRequest
}

// 用户列表响应
export interface UserListResponse {
  uid: number
  username: string
  ugid: number
  ugName: string
  email: string
  active: number
  roles: any[]
  updateTime: string
  createTime: string
}

export interface PageVOUserListResponse {
  pageNum: number
  pageSize: number
  total: number
  totalPages: number
  records: UserListResponse[]
  hasNext: boolean
  hasPrevious: boolean
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

  // 分配角色
  assignRoles: (assignData: AssignRolesRequest) => {
    return api.post<ApiResponse<any>>('/user/assign-roles', assignData)
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

  // 获取用户列表（按用户组）
  getUserList: (pageParams: PageRequestDTOQueryUserListRequest) => {
    return api.post<PageVOUserListResponse>('/user-group/list', pageParams)
  },
}

export default userService
