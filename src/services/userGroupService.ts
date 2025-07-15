import api, { ApiResponse } from './api'

// 用户组树节点类型
export interface UserGroupTreeNode {
  ugid: number
  ugName: string
  parent: number
  path: string
  pathMap: Record<string, string>
  children: UserGroupTreeNode[]
}

// 组织信息类型
export interface OrganizationDTO {
  oid: number
  orgName: string
  suffix: number
}

// 用户组树响应类型
export interface UserGroupTreeResponse {
  organization: OrganizationDTO
  root: UserGroupTreeNode
}

// 用户角色类型
export interface UserRole {
  rid: number
  oid: number
  roleName: string
}

// 用户信息类型
export interface UserListItem {
  uid: number
  username: string
  ugid: number
  ugName: string
  email: string
  active: number
  roles: UserRole[]
  updateTime: string
  createTime: string
}

// 分页查询参数
export interface PageParams {
  pageNum: number
  pageSize: number
  sortField?: string
  sortOrder?: string
}

// 用户组用户查询参数
export interface UserGroupUserQueryParams extends PageParams {
  params: {
    ugid: number
    includeSubGroups?: boolean
    userNameKeyword?: string
    emailKeyword?: string
    phoneKeyword?: string
  }
}

// 分页响应类型
export interface PageResponse<T> {
  pageNum: number
  pageSize: number
  total: number
  totalPages: number
  records: T[]
  hasNext: boolean
  hasPrevious: boolean
}

// 用户组服务
const userGroupService = {
  // 获取用户组树结构
  getUserGroupTree: () => {
    return api.get<ApiResponse<UserGroupTreeResponse>>('/user-group/tree/init')
  },

  // 根据用户组Id查询用户列表
  getUserListByGroup: (queryParams: UserGroupUserQueryParams) => {
    return api.post<ApiResponse<PageResponse<UserListItem>>>('/user-group/list', queryParams)
  },

  // TODO: 创建用户组 (待后端实现)
  createUserGroup: (parentUgid: number, ugName: string) => {
    return api.post<ApiResponse<any>>('/user-group/create', { parentUgid, ugName })
  },

  // TODO: 更新用户组 (待后端实现)
  updateUserGroup: (ugid: number, ugName: string) => {
    return api.post<ApiResponse<any>>('/user-group/update', { ugid, ugName })
  },

  // TODO: 删除用户组 (待后端实现)
  deleteUserGroup: (ugid: number) => {
    return api.post<ApiResponse<any>>(`/user-group/delete?ugid=${ugid}`)
  },
}

export default userGroupService
