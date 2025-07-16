<template>
  <div class="p-6 text-white">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">权限管理</h1>
      <div class="flex space-x-2">
        <button
          @click="loadAll"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white flex items-center"
        >
          <span class="mr-1">🔄</span> 刷新数据
        </button>
        <button
          @click="showCreateRoleModal = true"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white flex items-center"
        >
          <span class="mr-1">+</span> 创建角色
        </button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>

    <!-- 错误信息 -->
    <div
      v-else-if="error"
      class="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-md mb-6"
    >
      {{ error }}
      <button @click="loadAll" class="ml-2 underline hover:text-blue-300">重试</button>
    </div>

    <!-- 角色列表 -->
    <div v-else>
      <!-- 角色过滤 -->
      <div class="mb-4">
        <input
          v-model="roleSearch"
          type="text"
          placeholder="搜索角色名称"
          class="w-full md:w-1/3 p-2 bg-gray-700 rounded-md border border-gray-600 text-white mb-4"
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="role in filteredRoles"
          :key="role.rid"
          class="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:border-blue-500 transition-all duration-200"
        >
          <div class="p-4 border-b border-gray-700 flex justify-between items-center">
            <h2 class="text-xl font-semibold">{{ role.displayName || role.roleName }}</h2>
            <div class="flex space-x-2">
              <button
                @click="handleEditRole(role)"
                class="p-1 text-blue-400 hover:text-blue-300"
                title="编辑角色"
              >
                ✏️
              </button>
              <button
                @click="handleDeleteRole(role)"
                class="p-1 text-red-400 hover:text-red-300"
                title="删除角色"
              >
                🗑️
              </button>
            </div>
          </div>
          <div class="p-4">
            <h3 class="text-sm font-medium text-gray-400 mb-2">拥有的权限</h3>
            <div v-if="role.permissions && role.permissions.length > 0">
              <div
                v-for="(perms, type) in getGroupedPermissions(role.permissions)"
                :key="type"
                class="mb-2"
              >
                <h4 class="text-xs font-semibold text-blue-400 mb-1">{{ type }}</h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="pid in perms"
                    :key="pid"
                    class="px-2 py-1 text-xs rounded-full bg-blue-900 bg-opacity-40"
                  >
                    {{ getPermissionName(pid) }}
                  </span>
                </div>
              </div>
            </div>
            <span v-else class="text-gray-500 text-sm">无权限</span>
          </div>
        </div>
      </div>

      <!-- 无数据状态 -->
      <div v-if="roles.length === 0" class="text-center py-10 text-gray-400">
        未找到角色数据，请创建新角色。
      </div>
    </div>

    <!-- 创建角色模态框 -->
    <div v-if="showCreateRoleModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black opacity-50" @click="showCreateRoleModal = false"></div>
        <div class="relative bg-gray-800 rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
          <h2 class="text-xl font-bold mb-4">创建角色</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1"
              >角色名称 <span class="text-red-500">*</span></label
            >
            <input
              v-model="newRole.roleName"
              type="text"
              class="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
              placeholder="输入角色名称"
            />
            <p v-if="validationErrors.roleName" class="mt-1 text-sm text-red-500">
              {{ validationErrors.roleName }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">角色显示名称</label>
            <input
              v-model="newRole.displayName"
              type="text"
              class="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
              placeholder="输入角色显示名称"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">选择权限</label>
            <div class="bg-gray-700 rounded-md border border-gray-600 p-3">
              <PermissionSelector :permissions="groupedPermissions" v-model="newRole.permissions" />
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              @click="showCreateRoleModal = false"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              取消
            </button>
            <button
              @click="createRole"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              :disabled="!newRole.roleName"
            >
              创建
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑角色模态框 -->
    <div v-if="showEditRoleModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-black opacity-50" @click="showEditRoleModal = false"></div>
        <div class="relative bg-gray-800 rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
          <h2 class="text-xl font-bold mb-4">编辑角色</h2>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1"
              >角色名称 <span class="text-red-500">*</span></label
            >
            <input
              v-model="editingRole.roleName"
              type="text"
              class="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
              placeholder="输入角色名称"
            />
            <p v-if="validationErrors.roleName" class="mt-1 text-sm text-red-500">
              {{ validationErrors.roleName }}
            </p>
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">角色显示名称</label>
            <input
              v-model="editingRole.displayName"
              type="text"
              class="w-full p-2 bg-gray-700 rounded-md border border-gray-600"
              placeholder="输入角色显示名称"
            />
          </div>
          <div class="mb-4">
            <label class="block text-sm font-medium mb-1">选择权限</label>
            <div class="bg-gray-700 rounded-md border border-gray-600 p-3">
              <PermissionSelector
                :permissions="groupedPermissions"
                v-model="editingRole.permissions"
              />
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button
              @click="showEditRoleModal = false"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              取消
            </button>
            <button
              @click="updateRole"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
              :disabled="!editingRole.roleName"
            >
              保存
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 删除确认模态框 -->
    <div v-if="showDeleteConfirmModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div
          class="fixed inset-0 bg-black opacity-50"
          @click="showDeleteConfirmModal = false"
        ></div>
        <div class="relative bg-gray-800 rounded-lg max-w-md w-full mx-auto p-6 shadow-xl">
          <h2 class="text-xl font-bold mb-4">确认删除</h2>
          <p class="mb-4">
            确定要删除角色 "{{ deletingRole?.displayName || deletingRole?.roleName }}"
            吗？此操作无法撤销。
          </p>
          <div class="flex justify-end space-x-2">
            <button
              @click="showDeleteConfirmModal = false"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md"
            >
              取消
            </button>
            <button
              @click="confirmDeleteRole"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, computed } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import { usePermissionStore } from '@/stores/permissionStore'
import PermissionSelector from '@/components/ui/PermissionSelector.vue'
import roleService from '@/services/roleService'
import type {
  RoleInfo,
  CreateRoleRequest,
  UpdateRoleRequest,
  PermissionInfo,
} from '@/services/roleService'

// 定义Permission类型，与PermissionSelector组件接口一致
interface Permission {
  permissionId: number
  permissionName: string
  permissionDescription?: string
  permissionType?: string
}

// 角色状态管理
const roleStore = useRoleStore()
const permissionStore = usePermissionStore()
const roles = computed(() => roleStore.roles)
const permissions = computed(() => roleStore.permissions)
const loading = computed(() => roleStore.loading)
const error = computed(() => roleStore.error)

// 搜索角色
const roleSearch = ref('')
const filteredRoles = computed(() => {
  if (!roleSearch.value) return roles.value
  return roles.value.filter(
    (role) =>
      role.roleName.toLowerCase().includes(roleSearch.value.toLowerCase()) ||
      (role.displayName && role.displayName.toLowerCase().includes(roleSearch.value.toLowerCase())),
  )
})

// 分组的权限列表
const groupedPermissions = computed(() => {
  const grouped: Record<string, Permission[]> = {}

  permissions.value.forEach((perm) => {
    const type = perm.type || '其他'
    if (!grouped[type]) {
      grouped[type] = []
    }
    grouped[type].push({
      permissionId: perm.pid,
      permissionName: perm.name,
      permissionDescription: perm.description,
      permissionType: perm.type,
    })
  })

  return grouped
})

// 根据角色的权限ID获取分组的权限
const getGroupedPermissions = (permissionIds: number[] = []) => {
  const result: Record<string, number[]> = {}

  permissionIds.forEach((pid) => {
    const perm = permissions.value.find((p) => p.pid === pid)
    if (perm) {
      const type = perm.type || '其他'
      if (!result[type]) {
        result[type] = []
      }
      result[type].push(pid)
    }
  })

  return result
}

// 表单验证错误
const validationErrors = ref<Record<string, string>>({})

// 新角色表单
const newRole = ref<CreateRoleRequest>({
  roleName: '',
  displayName: '',
  permissions: [],
})

// 编辑角色表单
const editingRole = ref<UpdateRoleRequest & { permissions: number[] }>({
  rid: 0,
  roleName: '',
  displayName: '',
  permissions: [],
})

// 模态框控制
const showCreateRoleModal = ref(false)
const showEditRoleModal = ref(false)
const showDeleteConfirmModal = ref(false)
const deletingRole = ref<RoleInfo | null>(null)

const loadAll = async () => {
  console.log('开始加载角色和权限数据...')
  try {
    console.log('调用roleStore.loadRoles()')
    await roleStore.loadRoles()
    console.log('角色加载成功', roleStore.roles)

    console.log('调用roleStore.loadPermissions()')
    await roleStore.loadPermissions()
    console.log('权限加载成功', roleStore.permissions)

    try {
      console.log('调用permissionStore.loadPermissions()')
      await permissionStore.loadPermissions()
      console.log('permissionStore权限加载成功', permissionStore.permissions)
    } catch (permError) {
      console.error('permissionStore.loadPermissions()失败:', permError)
      // 继续执行，不中断整个流程
    }
  } catch (error) {
    console.error('加载角色和权限数据失败:', error)
  }
}

onMounted(() => {
  console.log('RolesView组件已挂载，开始加载数据')
  loadAll()
})
onActivated(() => {
  console.log('RolesView组件已激活，开始加载数据')
  loadAll()
})

// 根据权限ID获取权限名称
const getPermissionName = (pid: number) => {
  const permission = permissions.value.find((p) => p.pid === pid)
  return permission ? permission.name : `权限 #${pid}`
}

// 验证表单
const validateRoleForm = (form: { roleName?: string }) => {
  const errors: Record<string, string> = {}

  if (!form.roleName?.trim()) {
    errors.roleName = '角色名称不能为空'
  }

  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

// 创建角色
const createRole = async () => {
  if (!validateRoleForm(newRole.value)) return

  try {
    console.log('开始创建角色:', newRole.value)
    await roleStore.createRole(newRole.value)
    console.log('角色创建成功')
    showCreateRoleModal.value = false
    // 重置表单
    newRole.value = {
      roleName: '',
      displayName: '',
      permissions: [],
    }
    validationErrors.value = {}
  } catch (error) {
    console.error('创建角色失败:', error)
    alert('创建角色失败: ' + (error instanceof Error ? error.message : String(error)))
  }
}

// 编辑角色
const handleEditRole = (role: RoleInfo) => {
  editingRole.value = {
    rid: role.rid,
    roleName: role.roleName,
    displayName: role.displayName || '',
    permissions: Array.isArray(role.permissions) ? [...role.permissions] : [],
  }
  showEditRoleModal.value = true
  validationErrors.value = {}
}

// 更新角色
const updateRole = async () => {
  if (!validateRoleForm(editingRole.value)) return

  try {
    await roleStore.updateRole(editingRole.value)
    showEditRoleModal.value = false
    validationErrors.value = {}
  } catch (error) {
    console.error('更新角色失败:', error)
  }
}

// 删除角色
const handleDeleteRole = (role: RoleInfo) => {
  deletingRole.value = role
  showDeleteConfirmModal.value = true
}

// 确认删除角色
const confirmDeleteRole = async () => {
  if (!deletingRole.value) return

  try {
    await roleStore.deleteRole(deletingRole.value.rid)
    showDeleteConfirmModal.value = false
    deletingRole.value = null
  } catch (error) {
    console.error('删除角色失败:', error)
  }
}
</script>

<style scoped>
input[type='checkbox'] {
  accent-color: #2563eb;
}
</style>
