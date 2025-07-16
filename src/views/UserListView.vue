<template>
  <div class="p-6 text-white">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">用户管理</h1>
      <Button @click="showCreateUserModal = true" variant="primary">
        <span class="flex items-center"> <span class="mr-1">+</span> 创建用户 </span>
      </Button>
    </div>

    <!-- 两栏布局：左侧用户组树，右侧用户列表 -->
    <div class="flex flex-col md:flex-row gap-6">
      <!-- 左侧：用户组树 -->
      <div class="w-full md:w-1/4 lg:w-1/5">
        <Card variant="bordered" class="h-full">
          <div class="p-3 border-b border-gray-700 mb-3">
            <h2 class="text-lg font-semibold">用户组结构</h2>
          </div>
          <div
            class="user-tree-container"
            style="max-height: calc(100vh - 250px); overflow-y: auto"
          >
            <!-- 加载状态 -->
            <div v-if="loadingUserGroupTree" class="flex justify-center items-center py-10">
              <div
                class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
              ></div>
            </div>

            <!-- 树形结构 -->
            <UserGroupTree v-else :selected-id="selectedGroupId" @select="handleGroupSelect" />
          </div>
        </Card>
      </div>

      <!-- 右侧：用户列表 -->
      <div class="w-full md:w-3/4 lg:w-4/5">
        <!-- 搜索和筛选区域 -->
        <Card class="mb-6" variant="bordered">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">当前用户组</label>
              <div
                class="p-2 bg-gray-700 rounded-md border border-gray-600 text-white flex items-center justify-between"
              >
                <span>{{ currentGroupName }}</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">搜索用户</label>
              <div class="relative">
                <input
                  v-model="searchKeyword"
                  type="text"
                  placeholder="搜索用户名、邮箱或手机号"
                  class="w-full p-2 pl-10 bg-gray-700 rounded-md border border-gray-600 text-white"
                  @input="handleSearch"
                />
                <span class="absolute left-3 top-2.5 text-gray-400">🔍</span>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">搜索类型</label>
              <select
                v-model="searchType"
                class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                @change="handleSearch"
              >
                <option value="username">用户名</option>
                <option value="email">邮箱</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">状态筛选</label>
              <select
                v-model="statusFilter"
                class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                @change="loadUsers"
              >
                <option value="all">全部状态</option>
                <option value="normal">正常</option>
                <option value="banned">封禁</option>
              </select>
            </div>
          </div>

          <div class="mt-4 flex items-center justify-between">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="includeSubGroups"
                v-model="includeSubGroups"
                class="mr-2"
                @change="loadUsers"
              />
              <label for="includeSubGroups" class="text-sm">包含子组用户</label>
            </div>
            <div>
              <Button @click="loadUsers" variant="primary">查询</Button>
              <Button @click="resetFilters" variant="ghost" class="ml-2">重置</Button>
            </div>
          </div>
        </Card>

        <!-- 加载状态 -->
        <div v-if="loading" class="flex justify-center items-center py-10">
          <div
            class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>

        <!-- 错误信息 -->
        <div
          v-else-if="error"
          class="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-md mb-6"
        >
          {{ error }}
        </div>

        <!-- 用户列表 -->
        <Card v-else-if="userListItems.length > 0" variant="bordered">
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-700">
              <thead class="bg-gray-700 bg-opacity-30">
                <tr>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    用户名
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    用户组
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    邮箱
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    角色
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    状态
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    创建时间
                  </th>
                  <th
                    scope="col"
                    class="px-4 py-3 text-center text-xs font-medium text-gray-300 uppercase tracking-wider"
                  >
                    操作
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-700">
                <tr
                  v-for="user in userListItems"
                  :key="user.uid"
                  class="hover:bg-gray-700 hover:bg-opacity-30"
                >
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm font-medium">{{ user.username }}</div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm">{{ user.ugName }}</div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm">{{ user.email }}</div>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex flex-wrap gap-1">
                      <span
                        v-for="role in user.roles"
                        :key="role.rid"
                        class="px-2 py-0.5 text-xs rounded-full bg-blue-900 bg-opacity-40"
                      >
                        {{ role.displayName || role.roleName }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <span
                      v-if="user.active === 0"
                      class="px-2 py-0.5 rounded-full text-xs bg-green-900 text-green-200"
                    >
                      正常
                    </span>
                    <span v-else class="px-2 py-0.5 rounded-full text-xs bg-red-900 text-red-200">
                      封禁
                    </span>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap">
                    <div class="text-sm">{{ formatDate(user.createTime) }}</div>
                  </td>
                  <td class="px-4 py-3 whitespace-nowrap text-center">
                    <div class="flex justify-center items-center space-x-2">
                      <button
                        @click="handleAssignRoles(user)"
                        class="text-blue-400 hover:text-blue-300"
                        title="分配角色"
                      >
                        👥
                      </button>
                      <button
                        v-if="user.active === 0"
                        @click="handleDeactivateUser(user)"
                        class="text-yellow-400 hover:text-yellow-300"
                        title="禁用用户"
                      >
                        🔒
                      </button>
                      <button
                        v-else
                        @click="handleActivateUser(user)"
                        class="text-green-400 hover:text-green-300"
                        title="启用用户"
                      >
                        🔓
                      </button>
                      <button
                        @click="handleMoveUser(user)"
                        class="text-purple-400 hover:text-purple-300"
                        title="移动用户"
                      >
                        ↔
                      </button>
                      <button
                        @click="handleDeleteUser(user)"
                        class="text-red-400 hover:text-red-300"
                        title="删除用户"
                      >
                        🗑
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- 分页控件 -->
          <div class="flex justify-between items-center mt-4">
            <div class="text-sm text-gray-400">
              共 {{ pagination.total }} 条记录，第 {{ pagination.pageNum }}/{{
                pagination.totalPages
              }}
              页
            </div>
            <div class="flex items-center space-x-2">
              <Button
                @click="handlePageChange(pagination.pageNum - 1)"
                :disabled="!pagination.hasPrevious"
                variant="ghost"
                size="sm"
              >
                上一页
              </Button>
              <Button
                v-for="pageNumber in displayedPageNumbers"
                :key="pageNumber"
                @click="handlePageChange(pageNumber)"
                variant="ghost"
                size="sm"
                :class="{ 'bg-blue-700': pageNumber === pagination.pageNum }"
              >
                {{ pageNumber }}
              </Button>
              <Button
                @click="handlePageChange(pagination.pageNum + 1)"
                :disabled="!pagination.hasNext"
                variant="ghost"
                size="sm"
              >
                下一页
              </Button>
            </div>
          </div>
        </Card>

        <div v-else-if="!loading" class="text-center py-10 bg-gray-800 bg-opacity-50 rounded-md">
          <div class="text-xl font-medium text-gray-400 mb-2">暂无用户数据</div>
          <div class="text-sm text-gray-500 mb-4">请选择用户组或调整搜索条件</div>
          <Button @click="showCreateUserModal = true" variant="primary">创建新用户</Button>
        </div>

        <!-- 创建用户模态框 -->
        <div
          v-if="showCreateUserModal"
          class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <Card variant="bordered" class="w-full max-w-lg mx-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">创建新用户</h2>
              <button @click="showCreateUserModal = false" class="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <form @submit.prevent="handleCreateUser">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium mb-1"
                    >用户名 <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="newUser.username"
                    type="text"
                    required
                    class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1"
                    >所属用户组 <span class="text-red-500">*</span></label
                  >
                  <select
                    v-model="newUser.ugid"
                    required
                    class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                  >
                    <option v-if="userGroupTree" :value="userGroupTree.root.ugid">
                      {{ userGroupTree.root.ugName }}
                    </option>
                    <template v-if="userGroupTree && userGroupTree.root.children">
                      <option
                        v-for="group in flattenUserGroups(userGroupTree.root.children)"
                        :key="group.ugid"
                        :value="group.ugid"
                      >
                        {{ '—'.repeat(getGroupLevel(group.path)) }} {{ group.ugName }}
                      </option>
                    </template>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1"
                    >角色 <span class="text-red-500">*</span></label
                  >
                  <div
                    class="flex flex-wrap gap-2 p-2 bg-gray-700 rounded-md border border-gray-600"
                  >
                    <label
                      v-for="role in availableRoles"
                      :key="role.rid"
                      class="inline-flex items-center"
                    >
                      <input
                        type="checkbox"
                        :value="role.rid"
                        v-model="newUser.roles"
                        class="mr-1"
                      />
                      <span>{{ role.displayName || role.roleName }}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1"
                    >密码 <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="newUser.password"
                    type="password"
                    required
                    class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1"
                    >邮箱 <span class="text-red-500">*</span></label
                  >
                  <input
                    v-model="newUser.email"
                    type="email"
                    required
                    class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium mb-1">手机号</label>
                  <input
                    v-model="newUser.phone"
                    type="text"
                    class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
                  />
                </div>
              </div>

              <div class="flex justify-end mt-6 space-x-3">
                <Button @click="showCreateUserModal = false" variant="ghost">取消</Button>
                <Button type="submit" variant="primary">创建</Button>
              </div>
            </form>
          </Card>
        </div>

        <!-- 移动用户模态框 -->
        <div
          v-if="showMoveUserModal && userToMove"
          class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <Card variant="bordered" class="w-full max-w-md mx-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">移动用户</h2>
              <button @click="showMoveUserModal = false" class="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div class="text-gray-300 mb-4">
              将用户 <span class="text-blue-300">{{ userToMove.username }}</span> 移动到新的用户组：
            </div>

            <select
              v-model="targetGroupId"
              class="w-full p-2 mb-4 bg-gray-700 rounded-md border border-gray-600 text-white"
            >
              <option v-if="userGroupTree" :value="userGroupTree.root.ugid">
                {{ userGroupTree.root.ugName }}
              </option>
              <template v-if="userGroupTree && userGroupTree.root.children">
                <option
                  v-for="group in flattenUserGroups(userGroupTree.root.children)"
                  :key="group.ugid"
                  :value="group.ugid"
                >
                  {{ '—'.repeat(getGroupLevel(group.path)) }} {{ group.ugName }}
                </option>
              </template>
            </select>

            <div class="flex justify-end space-x-3">
              <Button @click="showMoveUserModal = false" variant="ghost">取消</Button>
              <Button @click="confirmMoveUser" variant="primary">确认移动</Button>
            </div>
          </Card>
        </div>

        <!-- 分配角色模态框 -->
        <div
          v-if="showAssignRolesModal && userToAssignRoles"
          class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
        >
          <Card variant="bordered" class="w-full max-w-lg mx-4">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-xl font-bold">分配角色</h2>
              <button @click="showAssignRolesModal = false" class="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            <div class="text-gray-300 mb-4">
              为 <span class="text-blue-300">{{ userToAssignRoles.username }}</span> 分配角色：
            </div>

            <div
              class="flex flex-wrap gap-2 p-2 bg-gray-700 rounded-md border border-gray-600 mb-4"
            >
              <label
                v-for="role in availableRoles"
                :key="role.rid"
                class="inline-flex items-center"
              >
                <input type="checkbox" :value="role.rid" v-model="selectedRoles" class="mr-1" />
                <span>{{ role.displayName || role.roleName }}</span>
              </label>
            </div>

            <div class="flex justify-end space-x-3">
              <Button @click="showAssignRolesModal = false" variant="ghost">取消</Button>
              <Button @click="confirmAssignRoles" variant="primary">确认分配</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useUserGroupStore } from '@/stores/userGroupStore'
import { storeToRefs } from 'pinia'
import userService from '@/services/userService'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import userGroupService from '@/services/userGroupService'
import type {
  UserGroupTreeResponse,
  UserGroupTreeNode,
  UserRole,
} from '@/services/userGroupService'
import type { UserListItem } from '@/services/userGroupService'
import roleService from '@/services/roleService'
import UserGroupTree from '@/components/UserGroupTree.vue'

// 初始化状态
const userStore = useUserStore()
const userGroupStore = useUserGroupStore()
const { userListItems, pagination, loading, error } = storeToRefs(userStore)
const { userGroupTree: userGroupTreeState, loading: loadingUserGroupTree } =
  storeToRefs(userGroupStore)

const userGroupTree = ref<UserGroupTreeResponse | null>(null)
const availableRoles = ref<UserRole[]>([])

// 查询和筛选条件
const selectedGroupId = ref(0)
const searchKeyword = ref('')
const searchType = ref('username') // 默认搜索用户名
const statusFilter = ref('all')
const currentPage = ref(1)
const pageSize = ref(10)
const includeSubGroups = ref(false) // 是否包含子组用户

// 计算当前选中的用户组名称
const currentGroupName = computed(() => {
  if (!selectedGroupId.value || !userGroupTreeState.value) return '未选择'

  // 如果选中的是根组
  if (userGroupTreeState.value.ugid === selectedGroupId.value) {
    return userGroupTreeState.value.ugName
  }

  // 在子组中查找
  const findGroupName = (node: UserGroupTreeNode): string => {
    if (node.ugid === selectedGroupId.value) {
      return node.ugName
    }

    if (node.children) {
      for (const child of node.children) {
        const result = findGroupName(child)
        if (result) return result
      }
    }

    return ''
  }

  const name = findGroupName(userGroupTreeState.value)
  return name || '未知用户组'
})

// 模态框状态
const showCreateUserModal = ref(false)
const showMoveUserModal = ref(false)
const showAssignRolesModal = ref(false)
const userToMove = ref<UserListItem | null>(null)
const userToAssignRoles = ref<UserListItem | null>(null)
const targetGroupId = ref<number>(0)
const selectedRoles = ref<number[]>([])

// 新用户表单数据
const newUser = reactive({
  ugid: 0,
  roles: [] as number[],
  username: '',
  password: '',
  email: '',
  phone: '',
})

// 分页计算属性
const displayedPageNumbers = computed(() => {
  const total = pagination.value.totalPages
  const current = pagination.value.pageNum

  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total]
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})

// 展平用户组树，转换为列表
const flattenUserGroups = (groups: UserGroupTreeNode[]): UserGroupTreeNode[] => {
  return groups.reduce((acc: UserGroupTreeNode[], group: UserGroupTreeNode) => {
    acc.push(group)
    if (group.children && group.children.length > 0) {
      acc.push(...flattenUserGroups(group.children))
    }
    return acc
  }, [])
}

// 获取用户组在层次结构中的级别
const getGroupLevel = (path: string): number => {
  return (path.match(/\//g) || []).length
}

// 日期格式化
const formatDate = (dateString: string): string => {
  if (!dateString) return '-'

  const date = new Date(dateString)
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 加载用户组树
const loadUserGroupTree = async () => {
  try {
    console.log('开始加载用户组树...')
    await userGroupStore.loadUserGroupTree()
    console.log('用户组树加载成功:', userGroupStore.userGroupTree)

    // 如果加载成功，构建适配视图需要的结构
    if (userGroupStore.userGroupTree) {
      userGroupTree.value = {
        organization: userGroupStore.organization!,
        root: userGroupStore.userGroupTree,
      }

      // 如果当前没有选择用户组，默认选择根用户组
      if (selectedGroupId.value === 0 && userGroupTree.value) {
        selectedGroupId.value = userGroupTree.value.root.ugid
        console.log('自动选择根用户组:', selectedGroupId.value)
      }
    } else {
      console.warn('用户组树数据为空')
    }
  } catch (error) {
    console.error('加载用户组树失败:', error)
  }
}

// 加载角色列表
const loadRoles = async () => {
  try {
    const response = await roleService.getRoles()
    // 兼容response结构，避免undefined报错
    if (response && response.visibleRoles) {
      availableRoles.value = response.visibleRoles
    } else if (response && response.data && response.data.visibleRoles) {
      availableRoles.value = response.data.visibleRoles
    } else {
      availableRoles.value = []
      console.error('角色列表数据格式不正确', response)
    }
  } catch (err) {
    console.error('加载角色列表失败', err)
    availableRoles.value = []
  }
}

// 加载用户列表
const loadUsers = async () => {
  if (!selectedGroupId.value) {
    console.error('未选择用户组，无法加载用户列表')
    return
  }
  const params = {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    params: {
      ugid: selectedGroupId.value,
      includeSubGroups: includeSubGroups.value,
    } as {
      ugid: number
      includeSubGroups: boolean
      userNameKeyword?: string
      emailKeyword?: string
      phoneKeyword?: string
      status?: number
    },
  }
  if (searchKeyword.value) {
    if (searchType.value === 'username') {
      params.params.userNameKeyword = searchKeyword.value
    } else if (searchType.value === 'email') {
      params.params.emailKeyword = searchKeyword.value
    } else if (searchType.value === 'phone') {
      params.params.phoneKeyword = searchKeyword.value
    }
  }
  if (statusFilter.value !== 'all') {
    params.params.status = statusFilter.value === 'normal' ? 0 : 1
  }
  try {
    await userStore.loadUserList(params)
  } catch (err) {
    console.error('加载用户列表失败', err)
  }
}

// 处理用户组选择
const handleGroupSelect = (ugid: number) => {
  selectedGroupId.value = ugid
  currentPage.value = 1
  loadUsers()
}

// 处理用户组变更
const handleGroupChange = () => {
  currentPage.value = 1
  loadUsers()
}

// 处理搜索
const handleSearch = () => {
  currentPage.value = 1
  loadUsers()
}

// 重置筛选条件
const resetFilters = () => {
  searchKeyword.value = ''
  searchType.value = 'username'
  statusFilter.value = 'all'
  includeSubGroups.value = false
  if (userGroupTree.value) {
    selectedGroupId.value = userGroupTree.value.root.ugid
  } else {
    selectedGroupId.value = 0
  }
  currentPage.value = 1
  loadUsers()
}

// 处理分页变更
const handlePageChange = (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return
  currentPage.value = page
  loadUsers()
}

// 处理创建用户
const handleCreateUser = async () => {
  try {
    // 检查是否选择了角色
    if (newUser.roles.length === 0) {
      alert('请至少选择一个角色')
      return
    }

    await userStore.createUser(newUser)
    showCreateUserModal.value = false

    // 重置表单
    newUser.username = ''
    newUser.password = ''
    newUser.email = ''
    newUser.phone = ''
    newUser.roles = []

    // 重新加载用户列表
    loadUsers()
  } catch (err) {
    console.error('创建用户失败', err)
  }
}

// 处理移动用户
const handleMoveUser = (user: UserListItem) => {
  userToMove.value = user
  targetGroupId.value = user.ugid
  showMoveUserModal.value = true
}

const confirmMoveUser = async () => {
  if (!userToMove.value || targetGroupId.value === userToMove.value.ugid) {
    showMoveUserModal.value = false
    return
  }

  try {
    await userStore.moveUser({
      uid: userToMove.value.uid,
      sourceUgid: userToMove.value.ugid,
      targetUgid: targetGroupId.value,
    })

    showMoveUserModal.value = false
    userToMove.value = null

    // 重新加载用户列表
    loadUsers()
  } catch (err) {
    console.error('移动用户失败', err)
  }
}

// 处理分配角色
const handleAssignRoles = (user: UserListItem) => {
  userToAssignRoles.value = user
  selectedRoles.value = user.roles.map((role) => role.rid)
  showAssignRolesModal.value = true
}

const confirmAssignRoles = async () => {
  if (!userToAssignRoles.value) return

  if (selectedRoles.value.length === 0) {
    alert('请至少选择一个角色')
    return
  }

  try {
    await userStore.assignRoles({
      targetUid: userToAssignRoles.value.uid,
      rids: selectedRoles.value,
    })

    showAssignRolesModal.value = false
    userToAssignRoles.value = null
    selectedRoles.value = []

    // 重新加载用户列表
    loadUsers()
  } catch (err) {
    console.error('分配角色失败', err)
  }
}

// 处理启用用户
const handleActivateUser = async (user: UserListItem) => {
  try {
    await userStore.activateUser(user.uid)
    // 重新加载用户列表
    loadUsers()
  } catch (err) {
    console.error('启用用户失败', err)
  }
}

// 处理禁用用户
const handleDeactivateUser = async (user: UserListItem) => {
  try {
    await userStore.deactivateUser(user.uid)
    // 重新加载用户列表
    loadUsers()
  } catch (err) {
    console.error('禁用用户失败', err)
  }
}

// 处理删除用户
const handleDeleteUser = async (user: UserListItem) => {
  if (!confirm(`确定要删除用户 ${user.username} 吗？此操作不可恢复！`)) {
    return
  }

  try {
    await userStore.deleteUser(user.uid)
    // 重新加载用户列表
    loadUsers()
  } catch (err) {
    console.error('删除用户失败', err)
  }
}

// 初始化数据
onMounted(async () => {
  try {
    console.log('UserListView组件挂载，开始初始化数据...')
    // 先加载用户组树
    await loadUserGroupTree()
    console.log('用户组树加载完成，userGroupTree:', userGroupTree.value)

    // 加载角色列表
    await loadRoles()
    console.log('角色列表加载完成，availableRoles:', availableRoles.value)

    // 自动选中根组并加载用户列表
    if (!selectedGroupId.value && userGroupTree.value && userGroupTree.value.root) {
      selectedGroupId.value = userGroupTree.value.root.ugid
      console.log('自动选择根用户组:', selectedGroupId.value)
    }

    if (selectedGroupId.value) {
      console.log('开始加载用户列表，选中的用户组ID:', selectedGroupId.value)
      await loadUsers()
    } else {
      console.warn('未选择用户组，无法加载用户列表')
    }
  } catch (error) {
    console.error('初始化数据失败', error)
  }
})
</script>

<style scoped>
.user-tree-container {
  /* 滚动条样式 */
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.user-tree-container::-webkit-scrollbar {
  width: 6px;
}

.user-tree-container::-webkit-scrollbar-track {
  background: #1f2937;
}

.user-tree-container::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 6px;
}
</style>
