// 用户类型
declare interface User {
  uid: number
  username: string
  oid: number
  orgName: string
  ugid: number
  ugName: string
  email: string
  phone: string
  active: number // 0:正常, 1:封禁
  roles: Role[]
  createdAt?: string
  updatedAt?: string
}

// 角色类型
declare interface Role {
  rid: number
  oid: number
  roleName: string
  displayName?: string
  permissions?: number[]
}

// 权限类型
declare interface Permission {
  permissionId: number
  permissionName: string
  permissionDescription: string
  permissionType: string
}

// 用户组类型
declare interface UserGroup {
  ugid: number
  ugName: string
  parent: number
  path: string
  pathMap: Record<string, string>
  children?: UserGroup[]
}

// 组织类型
declare interface Organization {
  oid: number
  orgName: string
  suffix: number
}
