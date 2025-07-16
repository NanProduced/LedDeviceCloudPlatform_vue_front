<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6 text-white">个人资料</h1>

    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-md mb-6"
    >
      {{ error }}
    </div>

    <div v-else-if="currentUser">
      <div class="grid md:grid-cols-2 gap-6">
        <!-- 个人信息卡片 -->
        <Card variant="bordered" hover>
          <div class="flex items-start mb-4">
            <div class="flex-shrink-0 mr-4">
              <div
                class="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ userInitials }}
              </div>
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">{{ currentUser.username }}</h2>
              <Badge class="mt-2">{{
                currentUser.roles?.length
                  ? currentUser.roles[0].displayName || currentUser.roles[0].roleName
                  : '普通用户'
              }}</Badge>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-4 mt-6">
            <div class="flex flex-col space-y-1">
              <span class="text-gray-400 text-sm">用户 ID</span>
              <span class="text-white">{{ currentUser.uid }}</span>
            </div>

            <div class="flex flex-col space-y-1">
              <span class="text-gray-400 text-sm">组织</span>
              <span class="text-white">{{ currentUser.orgName }}</span>
            </div>

            <div class="flex flex-col space-y-1">
              <span class="text-gray-400 text-sm">用户组</span>
              <span class="text-white">{{ currentUser.ugName }}</span>
            </div>
          </div>
        </Card>

        <!-- 联系方式卡片 -->
        <Card variant="bordered" hover>
          <h2 class="text-xl font-bold text-white mb-4">联系方式</h2>

          <div class="grid grid-cols-1 gap-4">
            <div class="flex flex-col space-y-1">
              <span class="text-gray-400 text-sm">电子邮箱</span>
              <span class="text-white">{{ currentUser.email || '未设置' }}</span>
            </div>

            <div class="flex flex-col space-y-1">
              <span class="text-gray-400 text-sm">手机号码</span>
              <span class="text-white">{{ currentUser.phone || '未设置' }}</span>
            </div>
          </div>

          <div class="mt-6">
            <Button variant="primary" @click="showChangePasswordModal = true">修改密码</Button>
          </div>
        </Card>
      </div>
    </div>

    <div v-else class="bg-blue-500 bg-opacity-20 border border-blue-500 text-white p-4 rounded-md">
      无法获取用户信息，请重新登录
    </div>

    <!-- 修改密码模态框 -->
    <div
      v-if="showChangePasswordModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-white">修改密码</h3>
          <button @click="showChangePasswordModal = false" class="text-gray-400 hover:text-white">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <form @submit.prevent="handleChangePassword">
          <div class="mb-4">
            <label for="old-password" class="block text-sm font-medium text-gray-400 mb-1"
              >当前密码</label
            >
            <input
              id="old-password"
              type="password"
              v-model="passwordForm.oldPassword"
              class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mb-4">
            <label for="new-password" class="block text-sm font-medium text-gray-400 mb-1"
              >新密码</label
            >
            <input
              id="new-password"
              type="password"
              v-model="passwordForm.newPassword"
              class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="mb-6">
            <label for="confirm-password" class="block text-sm font-medium text-gray-400 mb-1"
              >确认新密码</label
            >
            <input
              id="confirm-password"
              type="password"
              v-model="passwordForm.confirmPassword"
              class="w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p v-if="passwordMismatch" class="text-red-500 text-sm mt-1">两次输入的密码不一致</p>
          </div>

          <div class="flex justify-end space-x-3">
            <Button variant="ghost" @click="showChangePasswordModal = false">取消</Button>
            <Button variant="primary" type="submit" :disabled="passwordChangeLoading">
              <span v-if="passwordChangeLoading" class="inline-block mr-2">
                <svg
                  class="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </span>
              确认修改
            </Button>
          </div>
        </form>

        <div
          v-if="passwordChangeError"
          class="mt-4 bg-red-500 bg-opacity-20 border border-red-500 text-white p-3 rounded-md"
        >
          {{ passwordChangeError }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import Card from '@/components/ui/Card.vue'
import Badge from '@/components/ui/Badge.vue'
import Button from '@/components/ui/Button.vue'

const userStore = useUserStore()
const { currentUser, loading, error } = storeToRefs(userStore)

// 修改密码相关
const showChangePasswordModal = ref(false)
const passwordChangeLoading = ref(false)
const passwordChangeError = ref('')
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

// 判断两次输入的密码是否一致
const passwordMismatch = computed(() => {
  return (
    passwordForm.value.newPassword &&
    passwordForm.value.confirmPassword &&
    passwordForm.value.newPassword !== passwordForm.value.confirmPassword
  )
})

// 处理修改密码
const handleChangePassword = async () => {
  // 检查密码是否一致
  if (passwordMismatch.value) {
    return
  }

  passwordChangeLoading.value = true
  passwordChangeError.value = ''

  try {
    await userStore.changePassword({
      oldPassword: passwordForm.value.oldPassword,
      newPassword: passwordForm.value.newPassword,
    })

    // 成功修改密码
    showChangePasswordModal.value = false
    passwordForm.value = {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    }

    // 可以显示成功提示
    alert('密码修改成功！')
  } catch (err: any) {
    passwordChangeError.value = err.message || '修改密码失败，请重试'
  } finally {
    passwordChangeLoading.value = false
  }
}

// 计算用户名首字母作为头像显示
const userInitials = computed(() => {
  if (!currentUser.value?.username) return '?'
  return currentUser.value.username.substring(0, 2).toUpperCase()
})

onMounted(async () => {
  if (!currentUser.value) {
    try {
      console.log('开始加载个人资料页面的用户信息...')
      await userStore.loadCurrentUser()
      console.log('个人资料页面用户信息加载成功:', currentUser.value)
    } catch (err) {
      console.error('加载用户信息失败', err)
    }
  }
})
</script>
