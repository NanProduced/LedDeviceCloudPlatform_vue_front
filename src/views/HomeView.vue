<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { userService, deviceService, authService } from '../services/api'
import type { UserInfo, Device } from '../services/api'

const userInfo = ref<UserInfo | null>(null)
const devices = ref<Device[]>([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    // 获取当前用户信息，Gateway会自动处理cookie认证
    const userData = await userService.getCurrentUser()
    userInfo.value = userData

    // 尝试获取设备列表
    try {
      const deviceData = await deviceService.getDevices()
      devices.value = deviceData
    } catch (deviceError) {
      console.error('获取设备列表失败', deviceError)
      // 设备获取失败不影响页面整体展示
    }
  } catch (err: unknown) {
    console.error('获取用户信息失败', err)
    error.value = '无法获取用户信息，您可能需要重新登录'
  } finally {
    loading.value = false
  }
})

const handleLogout = () => {
  // 调用Gateway的登出端点，Gateway会清除cookie
  authService.logout()
}
</script>

<template>
  <main>
    <div class="dashboard">
      <header class="header">
        <h1>LED设备云平台</h1>
        <div class="user-info" v-if="userInfo">
          <span>欢迎您，{{ userInfo.username }}</span>
          <button @click="handleLogout" class="logout-btn">退出登录</button>
        </div>
      </header>

      <div class="content" v-if="loading">
        <div class="loading-spinner"></div>
        <p>正在加载...</p>
      </div>

      <div class="content" v-else>
        <div v-if="error" class="error-message">{{ error }}</div>

        <div v-else class="dashboard-content">
          <div class="welcome-section">
            <h2>欢迎访问LED设备云平台</h2>
            <p>您已成功登录系统</p>
            <div class="user-details" v-if="userInfo">
              <h3>用户信息</h3>
              <p><strong>用户名：</strong> {{ userInfo.username }}</p>
              <p><strong>角色：</strong> {{ userInfo.roles && userInfo.roles.join(', ') }}</p>
            </div>
          </div>

          <div class="devices-section">
            <h3>设备列表</h3>
            <div v-if="devices.length === 0" class="no-devices">暂无设备数据</div>
            <div v-else class="device-grid">
              <div v-for="device in devices" :key="device.id" class="device-card">
                <div class="device-header">
                  <h4>{{ device.name }}</h4>
                  <span class="device-status" :class="device.status">{{ device.status }}</span>
                </div>
                <div class="device-details">
                  <p><strong>ID:</strong> {{ device.id }}</p>
                  <p><strong>类型:</strong> {{ device.type }}</p>
                  <p v-if="device.lastActive"><strong>最后活动:</strong> {{ device.lastActive }}</p>
                </div>
                <div class="device-actions">
                  <button class="btn-control">控制</button>
                  <button class="btn-details">详情</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.header h1 {
  color: #1867c0;
  margin: 0;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.logout-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #d32f2f;
}

.content {
  background-color: white;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 400px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #1867c0;
  animation: spin 1s ease-in-out infinite;
  margin: 30px auto;
}

.error-message {
  color: #e53935;
  font-size: 18px;
  text-align: center;
  padding: 20px;
}

.dashboard-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.welcome-section {
  text-align: center;
  margin-bottom: 20px;
}

.welcome-section h2 {
  color: #1867c0;
  margin-bottom: 10px;
}

.user-details {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
  text-align: left;
}

.user-details h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.devices-section {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.devices-section h3 {
  margin-top: 0;
  color: #333;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.no-devices {
  text-align: center;
  padding: 30px;
  color: #757575;
}

.device-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.device-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
}

.device-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}

.device-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.device-header h4 {
  margin: 0;
  color: #1867c0;
}

.device-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
}

.device-status.online {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.device-status.offline {
  background-color: #ffebee;
  color: #c62828;
}

.device-status.maintenance {
  background-color: #fff8e1;
  color: #f57f17;
}

.device-details {
  margin-bottom: 15px;
}

.device-details p {
  margin: 8px 0;
  font-size: 14px;
}

.device-actions {
  display: flex;
  gap: 10px;
}

.device-actions button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn-control {
  background-color: #1867c0;
  color: white;
}

.btn-control:hover {
  background-color: #0d47a1;
}

.btn-details {
  background-color: #f5f5f5;
  color: #333;
}

.btn-details:hover {
  background-color: #e0e0e0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .device-grid {
    grid-template-columns: 1fr;
  }
}
</style>
