import axios from 'axios'
import type { AxiosResponse } from 'axios'

// 创建axios实例
const api = axios.create({
  // 移除baseURL，使用相对路径，让Vite代理处理请求
  timeout: 10000, // 超时时间
  withCredentials: true, // 确保跨域请求发送cookie
  headers: {
    'Content-Type': 'application/json',
  },
})

// 响应拦截器，处理未认证错误
api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response
  },
  (error: unknown): Promise<never> => {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        // 未认证，重定向到首页（将由首页判断是否需要登录）
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  },
)

// 用户信息类型
export interface UserInfo {
  username: string
  roles?: string[]
  [key: string]: unknown
}

// 设备信息类型
export interface Device {
  id: string
  name: string
  status: string
  type: string
  lastActive?: string
  [key: string]: unknown
}

// API服务接口定义
export const authService = {
  // 登出
  logout: (): void => {
    // 调用Gateway的登出端点
    window.location.href = 'http://192.168.1.222:8082/logout'
  },
}

// 业务API接口
export const userService = {
  // 获取当前用户信息
  getCurrentUser: async (): Promise<UserInfo> => {
    try {
      // 使用正确的API路径：/core/api/user/current
      const response = await api.get<UserInfo>('/core/api/user/current')
      return response.data
    } catch (error) {
      console.error('获取用户信息失败', error)
      throw error
    }
  },
}

// 设备API接口
export const deviceService = {
  // 获取设备列表
  getDevices: async (): Promise<Device[]> => {
    try {
      const response = await api.get<Device[]>('/core/api/devices')
      return response.data
    } catch (error) {
      console.error('获取设备列表失败', error)
      throw error
    }
  },

  // 获取设备详情
  getDeviceById: async (id: string): Promise<Device> => {
    try {
      const response = await api.get<Device>(`/core/api/devices/${id}`)
      return response.data
    } catch (error) {
      console.error(`获取设备${id}详情失败`, error)
      throw error
    }
  },

  // 控制设备
  controlDevice: async (id: string, command: string): Promise<void> => {
    try {
      await api.post(`/core/api/devices/${id}/control`, { command })
    } catch (error) {
      console.error(`控制设备${id}失败`, error)
      throw error
    }
  },
}

export default api
