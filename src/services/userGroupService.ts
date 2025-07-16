import api from './api'
import type { ApiResponse } from './api'

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
  displayName: string // 添加显示名称字段
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
    status?: number // 新增状态筛选字段：null-全部，0-正常，1-封禁
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
    console.log('调用API: /user-group/tree/init')
    return api
      .get<ApiResponse<UserGroupTreeResponse>>('/user-group/tree/init')
      .then((response) => {
        console.log('getUserGroupTree API响应:', response)

        // 处理不同的响应格式
        if (response.data && response.data.data) {
          return response.data.data
        } else if (response.data) {
          return response.data
        } else {
          console.warn('用户组树响应格式异常:', response)
          throw new Error('获取用户组树失败：响应格式异常')
        }
      })
      .catch((error) => {
        console.error('getUserGroupTree API调用失败:', error)
        throw error
      })
  },

  // 根据用户组Id查询用户列表
  getUserListByGroup: (queryParams: UserGroupUserQueryParams) => {
    // 确保请求体中包含ugid参数
    if (!queryParams.params || !queryParams.params.ugid) {
      console.error('缺少必要参数ugid')
      throw new Error('缺少必要参数ugid')
    }

    // 使用POST方法，直接将参数作为请求体传递
    return api.post<ApiResponse<PageResponse<UserListItem>>>('/user-group/list', queryParams)
  },

  // 创建用户组
  createUserGroup: (parentUgid: number, userGroupName: string, description?: string) => {
    return api.post<ApiResponse<any>>('/user-group/create', {
      parentUgid,
      userGroupName,
      description,
    })
  },

  // 更新用户组（如有后端支持，可补充实现）
  // updateUserGroup: (ugid: number, userGroupName: string, description?: string) => {
  //   return api.post<ApiResponse<any>>('/user-group/update', { ugid, userGroupName, description })
  // },

  // 删除用户组
  deleteUserGroup: (ugid: number) => {
    return api.post<ApiResponse<any>>(`/user-group/delete?ugid=${ugid}`)
  },
}

export default userGroupService
