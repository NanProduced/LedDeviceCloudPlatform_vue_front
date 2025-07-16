<template>
  <div class="user-group-user-list">
    <div class="mb-4 flex justify-between items-center">
      <h2 class="text-xl font-bold">{{ title }}</h2>
      <div class="flex space-x-2">
        <button
          v-if="showAddButton"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          @click="$emit('add-user')"
        >
          添加用户
        </button>
        <div class="flex items-center space-x-2">
          <label class="text-sm">包含子组：</label>
          <input type="checkbox" v-model="includeSubGroups" @change="handleFilterChange" />
        </div>
      </div>
    </div>

    <!-- 搜索筛选 -->
    <div class="mb-4 flex flex-wrap gap-2">
      <div class="flex-1 min-w-[200px]">
        <input
          type="text"
          v-model="filters.userNameKeyword"
          placeholder="用户名"
          class="w-full px-3 py-2 border rounded"
          @input="handleFilterChange"
        />
      </div>
      <div class="flex-1 min-w-[200px]">
        <input
          type="text"
          v-model="filters.emailKeyword"
          placeholder="邮箱"
          class="w-full px-3 py-2 border rounded"
          @input="handleFilterChange"
        />
      </div>
      <div class="flex-1 min-w-[200px]">
        <input
          type="text"
          v-model="filters.phoneKeyword"
          placeholder="电话"
          class="w-full px-3 py-2 border rounded"
          @input="handleFilterChange"
        />
      </div>
    </div>

    <!-- 用户列表表格 -->
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white border">
        <thead class="bg-gray-100">
          <tr>
            <th class="py-2 px-4 border text-left">用户名</th>
            <th class="py-2 px-4 border text-left">邮箱</th>
            <th class="py-2 px-4 border text-left">用户组</th>
            <th class="py-2 px-4 border text-left">角色</th>
            <th class="py-2 px-4 border text-left">状态</th>
            <th class="py-2 px-4 border text-left">创建时间</th>
            <th class="py-2 px-4 border text-left">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading" class="text-center">
            <td colspan="7" class="py-4">加载中...</td>
          </tr>
          <tr v-else-if="!userList.length" class="text-center">
            <td colspan="7" class="py-4">暂无数据</td>
          </tr>
          <tr v-for="user in userList" :key="user.uid" class="hover:bg-gray-50">
            <td class="py-2 px-4 border">{{ user.username }}</td>
            <td class="py-2 px-4 border">{{ user.email }}</td>
            <td class="py-2 px-4 border">{{ user.ugName }}</td>
            <td class="py-2 px-4 border">
              <span v-for="(role, index) in user.roles" :key="role.rid">
                {{ role.roleName }}{{ index < user.roles.length - 1 ? ', ' : '' }}
              </span>
            </td>
            <td class="py-2 px-4 border">
              <span
                :class="{
                  'text-green-500': user.active === 1,
                  'text-red-500': user.active === 0,
                }"
              >
                {{ user.active === 1 ? '启用' : '禁用' }}
              </span>
            </td>
            <td class="py-2 px-4 border">{{ formatDate(user.createTime) }}</td>
            <td class="py-2 px-4 border">
              <div class="flex space-x-2">
                <button class="text-blue-500 hover:text-blue-700" @click="$emit('edit-user', user)">
                  编辑
                </button>
                <button
                  v-if="user.active === 1"
                  class="text-red-500 hover:text-red-700"
                  @click="$emit('deactivate-user', user)"
                >
                  禁用
                </button>
                <button
                  v-else
                  class="text-green-500 hover:text-green-700"
                  @click="$emit('activate-user', user)"
                >
                  启用
                </button>
                <button class="text-red-500 hover:text-red-700" @click="$emit('delete-user', user)">
                  删除
                </button>
                <button class="text-blue-500 hover:text-blue-700" @click="$emit('move-user', user)">
                  移动
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 分页控件 -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-sm text-gray-500">
        共 {{ pagination.total }} 条记录，当前第 {{ pagination.pageNum }}/{{
          pagination.totalPages
        }}
        页
      </div>
      <div class="flex space-x-2">
        <button
          :disabled="!pagination.hasPrevious"
          @click="handlePageChange(pagination.pageNum - 1)"
          class="px-3 py-1 border rounded"
          :class="{
            'bg-gray-200 cursor-not-allowed': !pagination.hasPrevious,
            'hover:bg-gray-100': pagination.hasPrevious,
          }"
        >
          上一页
        </button>
        <button
          :disabled="!pagination.hasNext"
          @click="handlePageChange(pagination.pageNum + 1)"
          class="px-3 py-1 border rounded"
          :class="{
            'bg-gray-200 cursor-not-allowed': !pagination.hasNext,
            'hover:bg-gray-100': pagination.hasNext,
          }"
        >
          下一页
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import type { UserListItem } from '@/services/userGroupService'
import { storeToRefs } from 'pinia'

const props = defineProps({
  ugid: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    default: '用户列表',
  },
  showAddButton: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits([
  'add-user',
  'edit-user',
  'activate-user',
  'deactivate-user',
  'delete-user',
  'move-user',
])

const userStore = useUserStore()
const { userListItems, pagination, loading } = storeToRefs(userStore)

// 本地状态
const pageSize = ref(10)
const currentPage = ref(1)
const includeSubGroups = ref(false)
const filters = ref({
  userNameKeyword: '',
  emailKeyword: '',
  phoneKeyword: '',
})

// 计算属性
const userList = computed(() => userListItems.value)

// 加载用户列表
const loadUserList = async () => {
  try {
    await userStore.loadUserListByGroup({
      pageNum: currentPage.value,
      pageSize: pageSize.value,
      params: {
        ugid: props.ugid,
        includeSubGroups: includeSubGroups.value,
        userNameKeyword: filters.value.userNameKeyword || undefined,
        emailKeyword: filters.value.emailKeyword || undefined,
        phoneKeyword: filters.value.phoneKeyword || undefined,
      },
    })
  } catch (error) {
    console.error('加载用户列表失败', error)
  }
}

// 格式化日期
const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  return date.toLocaleString()
}

// 处理页码变化
const handlePageChange = (page: number) => {
  currentPage.value = page
  loadUserList()
}

// 处理筛选条件变化
const handleFilterChange = () => {
  currentPage.value = 1 // 重置到第一页
  loadUserList()
}

// 监听ugid变化
watch(
  () => props.ugid,
  (newUgid) => {
    if (newUgid) {
      currentPage.value = 1
      loadUserList()
    }
  },
)

// 组件挂载时加载数据
onMounted(() => {
  if (props.ugid) {
    loadUserList()
  }
})
</script>

<style scoped>
.user-group-user-list {
  @apply bg-white p-4 rounded shadow;
}
</style>
