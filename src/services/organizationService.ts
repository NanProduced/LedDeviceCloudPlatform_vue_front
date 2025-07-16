import api from './api'
import type { ApiResponse } from './api'

// 组织信息类型
export interface OrganizationInfo {
  oid: number
  orgName: string
  suffix: number
  remark?: string
  [key: string]: unknown
}

// 创建组织请求
export interface CreateOrgRequest {
  orgName: string
  remark?: string
  managerName?: string
  email?: string
  phone?: string
}

// 创建组织响应
export interface CreateOrgResponse {
  oid: number
  orgName: string
  suffix: number
  uid: number
  username: string
  password: string
}

// 组织服务
const organizationService = {
  // 创建组织
  createOrg: (orgData: CreateOrgRequest) => {
    return api.post<ApiResponse<CreateOrgResponse>>('/org/create', orgData)
  },

  // TODO: 获取组织列表 (待后端实现)
  getOrgs: () => {
    return api.get<ApiResponse<OrganizationInfo[]>>('/org/list')
  },

  // TODO: 更新组织 (待后端实现)
  updateOrg: (oid: number, orgData: Partial<CreateOrgRequest>) => {
    return api.post<ApiResponse<any>>('/org/update', { oid, ...orgData })
  },

  // TODO: 删除组织 (待后端实现)
  deleteOrg: (oid: number) => {
    return api.post<ApiResponse<any>>(`/org/delete?oid=${oid}`)
  },

  // TODO: 获取组织详情 (待后端实现)
  getOrgDetail: (oid: number) => {
    return api.get<ApiResponse<OrganizationInfo>>(`/org/detail?oid=${oid}`)
  },
}

export default organizationService
