import axios from 'axios'

// 用户信息接口
export interface UserInfo {
  uid: number
  username: string
  oid: number
  orgName: string
  ugid: number
  ugName: string
  email: string
  phone: string
}

// API响应接口
interface ApiResponse<T> {
  code: number
  msg: string
  data: T
}

// 获取当前用户信息
export async function fetchCurrentUser(): Promise<UserInfo | null> {
  try {
    // 使用正确的API路径：/core/api/user/current
    const res = await axios.get<ApiResponse<UserInfo>>('/core/api/user/current', {
      // 移除baseURL，使用相对路径，让Vite代理处理请求
      withCredentials: true,
    })

    if (res.data && res.data.code === 200) {
      return res.data.data
    }
    return null
  } catch (e) {
    console.error('获取用户信息失败', e)
    return null
  }
}
