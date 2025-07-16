import axios from 'axios'
import type { AxiosError } from 'axios'

// API响应接口
export interface ApiResponse<T> {
  code?: number
  msg?: string
  data: T
}

// 创建axios实例
const api = axios.create({
  baseURL: '/core/api', // 只写代理前缀，确保开发环境走Vite代理
  withCredentials: true, // 确保跨域请求发送Cookie
  timeout: 30000,
})

console.log('API基础URL配置为:', api.defaults.baseURL)

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    console.log('发送请求:', config.method, config.url, config.data || config.params)
    // 不再自动加/core/api前缀，直接返回config
    return config
  },
  (error) => {
    console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    console.log('收到响应:', response.config.url, response.data)

    // 检查响应结构
    if (response.data && response.data.hasOwnProperty('code')) {
      console.log('响应包含code字段:', response.data.code)

      if (response.data.code !== 200 && response.data.code !== 0) {
        const error = new Error(response.data.msg || '操作失败') as Error & {
          response: typeof response
          code: number
        }
        error.response = response
        error.code = response.data.code
        console.error('响应错误码:', response.data.code, response.data.msg)
        return Promise.reject(error)
      }

      // 成功，返回完整响应以便访问data字段
      console.log('响应成功，返回完整响应:', response)
      return response
    }

    console.log('响应不包含code字段，返回完整响应:', response)
    return response
  },
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          window.location.href = '/'
          break
        case 403:
          console.error('权限不足，无法执行此操作')
          break
        case 404:
          console.error('请求的资源不存在')
          break
        case 500:
          console.error('服务器错误，请稍后再试')
          break
        default:
          console.error(`请求失败: ${error.message}`)
      }
    } else if (error.request) {
      console.error('无法连接到服务器，请检查您的网络连接')
    } else {
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
    // 调用Gateway的登出端点，添加redirect_uri参数
    window.location.href =
      'http://192.168.1.222:8082/logout?redirect_uri=http://192.168.1.222:5179/'
  },
}

// 业务API接口
export const userService = {
  // 获取当前用户信息
  getCurrentUser: async (): Promise<UserInfo> => {
    try {
      // 使用正确的API路径
      const response = await api.get<UserInfo>('/user/current')
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
      const response = await api.get<Device[]>('/devices')
      return response.data
    } catch (error) {
      console.error('获取设备列表失败', error)
      // 模拟数据，实际开发时移除
      return [
        {
          id: 'dev001',
          name: 'LED屏幕-A区',
          status: 'online',
          type: 'LED屏幕',
          lastActive: '2023-05-15 14:30',
        },
        {
          id: 'dev002',
          name: 'LED屏幕-B区',
          status: 'offline',
          type: 'LED屏幕',
          lastActive: '2023-05-14 09:15',
        },
        {
          id: 'dev003',
          name: '控制器-主厅',
          status: 'online',
          type: '控制器',
          lastActive: '2023-05-15 15:45',
        },
      ]
    }
  },

  // 获取设备详情
  getDeviceById: async (id: string): Promise<Device> => {
    try {
      const response = await api.get<Device>(`/devices/${id}`)
      return response.data
    } catch (error) {
      console.error(`获取设备${id}详情失败`, error)
      throw error
    }
  },

  // 控制设备
  controlDevice: async (id: string, command: string): Promise<void> => {
    try {
      await api.post(`/devices/${id}/control`, { command })
    } catch (error) {
      console.error(`控制设备${id}失败`, error)
      throw error
    }
  },
}

export default api
