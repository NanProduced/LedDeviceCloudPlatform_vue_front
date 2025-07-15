import axios from 'axios'
import type { AxiosResponse, AxiosError } from 'axios'

// API响应接口
export interface ApiResponse<T> {
  code?: number
  msg?: string
  data: T
}

// 创建axios实例
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  withCredentials: true, // 确保跨域请求发送Cookie
  timeout: 30000,
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 对于core-service的请求，添加前缀
    if (config.url && !config.url.startsWith('/oauth2') && !config.url.startsWith('/auth')) {
      // 如果是访问core-service的接口，添加/core/api前缀
      if (
        config.url.startsWith('/user/') ||
        config.url.startsWith('/role/') ||
        config.url.startsWith('/org/') ||
        config.url.startsWith('/user-group/')
      ) {
        config.url = `/core/api${config.url}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 检查响应数据结构，适配不同的后端API返回格式
    if (response.data && response.data.hasOwnProperty('code')) {
      // 如果是包含code字段的标准响应格式
      if (response.data.code !== 200 && response.data.code !== 0) {
        // 业务逻辑错误
        const error = new Error(response.data.msg || '操作失败') as any
        error.response = response
        error.code = response.data.code
        return Promise.reject(error)
      }
      // 成功，返回data字段
      return response
    }
    // 直接返回原始响应
    return response
  },
  (error: AxiosError) => {
    // 处理HTTP错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 未授权，重定向到登录页面
          window.location.href = '/login'
          break
        case 403:
          // 权限不足
          console.error('权限不足，无法执行此操作')
          break
        case 404:
          // 资源不存在
          console.error('请求的资源不存在')
          break
        case 500:
          // 服务器错误
          console.error('服务器错误，请稍后再试')
          break
        default:
          console.error(`请求失败: ${error.message}`)
      }
    } else if (error.request) {
      // 请求已发送但未收到响应
      console.error('无法连接到服务器，请检查您的网络连接')
    } else {
      // 请求配置错误
      console.error(`请求错误: ${error.message}`)
    }
    return Promise.reject(error)
  },
)

// 用户信息类型
export interface UserInfo {
  uid: number
  username: string
  oid: number
  orgName: string
  ugid: number
  ugName: string
  email: string
  phone: string
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
