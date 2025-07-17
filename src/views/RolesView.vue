<template>
  <div class="p-6 text-white">
    <!-- 测试区域 -->
    <div class="mb-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
      <h2 class="text-lg font-bold mb-4">测试区域</h2>
      <div class="flex space-x-4 mb-4">
        <button
          @click="showTestModal = true"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white"
        >
          显示测试模态框
        </button>
        <button
          @click="testAlert"
          class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-md text-white"
        >
          测试Alert
        </button>
      </div>

      <!-- 测试模态框 -->
      <div
        v-if="showTestModal && isMounted"
        class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div class="bg-gray-800 p-6 rounded-lg max-w-md w-full">
          <h3 class="text-xl font-bold mb-4">测试模态框</h3>
          <p class="mb-4">这是一个测试模态框，用于验证模态框显示功能是否正常。</p>
          <div class="flex justify-end">
            <button
              @click="showTestModal = false"
              class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 原有内容 -->
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">权限管理</h1>
      <div class="flex space-x-2">
        <button
          @click="loadAll"
          class="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md text-white flex items-center"
        >
          <span class="mr-1">🔄</span> 刷新数据
        </button>
        <!-- 创建角色按钮 -->
        <button
          @click.stop.prevent="handleCreateRoleClick"
          class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white flex items-center"
        >
          <span class="mr-1">+</span> 创建角色
        </button>
        <!-- 测试按钮 -->
        <button
          v-on:click.stop.prevent="testButtonClick"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white"
        >
          测试按钮
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

    <!-- 创建角色模态框 - 使用更简单的结构 -->
    <div
      v-if="showCreateRoleModal && isMounted"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white">创建角色</h2>
          <button
            @click="closeCreateModal"
            class="text-gray-400 hover:text-white text-xl"
            aria-label="关闭"
          >
            ✕
          </button>
        </div>

        <div class="mb-6">
          <label class="block text-base font-medium mb-2 text-white"
            >角色名称 <span class="text-red-500">*</span></label
          >
          <input
            v-model="newRole.roleName"
            type="text"
            class="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white text-base"
            placeholder="输入角色名称"
          />
          <p v-if="validationErrors.roleName" class="mt-1 text-sm text-red-500">
            {{ validationErrors.roleName }}
          </p>
        </div>

        <div class="mb-6">
          <label class="block text-base font-medium mb-2 text-white">角色描述 (可不填)</label>
          <input
            v-model="newRole.displayName"
            type="text"
            class="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white text-base"
            placeholder="输入角色描述"
          />
        </div>

        <!-- 创建角色模态框中的权限选择部分 -->
        <div class="mb-6">
          <label class="block text-base font-medium mb-2 text-white">选择权限</label>
          <div class="bg-gray-800 rounded-md border border-gray-600 p-4">
            <div class="mb-3">
              <input
                v-model="createPermissionSearch"
                type="text"
                placeholder="搜索权限名称/描述"
                class="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white text-base"
              />
            </div>
            <div class="custom-scrollbar h-80 overflow-hidden rounded-md border border-gray-700 bg-gray-900 p-2">
              <PermissionSelector
                :permissions="groupedPermissions || {}"
                v-model="newRole.permissions"
                :search="createPermissionSearch"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3">
          <button
            @click="closeCreateModal"
            class="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-md text-white text-base"
          >
            取消
          </button>
          <button
            @click="createRole"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-base"
            :disabled="!newRole.roleName"
          >
            创建
          </button>
        </div>
      </div>
    </div>

    <!-- 编辑角色模态框 -->
    <div
      v-if="showEditRoleModal && isMounted"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-gray-800 p-6 rounded-lg max-w-2xl w-full">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-white">编辑角色</h2>
          <button
            @click="showEditRoleModal = false"
            class="text-gray-400 hover:text-white text-xl"
            aria-label="关闭"
          >
            ✕
          </button>
        </div>
        <div class="mb-6">
          <label class="block text-base font-medium mb-2 text-white"
            >角色名称 <span class="text-red-500">*</span></label
          >
          <input
            v-model="editingRole.roleName"
            type="text"
            class="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white text-base"
            placeholder="输入角色名称"
          />
          <p v-if="validationErrors.roleName" class="mt-1 text-sm text-red-500">
            {{ validationErrors.roleName }}
          </p>
        </div>
        <div class="mb-6">
          <label class="block text-base font-medium mb-2 text-white">角色描述 (可不填)</label>
          <input
            v-model="editingRole.displayName"
            type="text"
            class="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white text-base"
            placeholder="输入角色描述"
          />
        </div>
        <!-- 编辑角色模态框中的权限选择部分 -->
        <div class="mb-6">
          <label class="block text-base font-medium mb-2 text-white">选择权限</label>
          <div class="bg-gray-800 rounded-md border border-gray-600 p-4">
            <div class="mb-3">
              <input
                v-model="editPermissionSearch"
                type="text"
                placeholder="搜索权限名称/描述"
                class="w-full p-3 bg-gray-700 rounded-md border border-gray-600 text-white text-base"
              />
            </div>
            <div class="custom-scrollbar h-80 overflow-hidden rounded-md border border-gray-700 bg-gray-900 p-2">
              <PermissionSelector
                :permissions="groupedPermissions || {}"
                v-model="editingRole.permissions"
                :search="editPermissionSearch"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end space-x-3">
          <button
            @click="showEditRoleModal = false"
            class="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-md text-white text-base"
          >
            取消
          </button>
          <button
            @click="updateRole"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-base"
            :disabled="!editingRole.roleName"
          >
            保存
          </button>
        </div>
      </div>
    </div>

    <!-- 删除确认模态框 -->
    <div
      v-if="showDeleteConfirmModal && isMounted"
      class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">确认删除</h2>
          <button
            @click="showDeleteConfirmModal = false"
            class="text-gray-400 hover:text-white"
            aria-label="关闭"
          >
            ✕
          </button>
        </div>
        <p class="mb-4">
          确定要删除角色 "{{ deletingRole?.displayName || deletingRole?.roleName }}"
          吗？此操作无法撤销。
        </p>
        <div class="flex justify-end space-x-2">
          <button
            @click="showDeleteConfirmModal = false"
            class="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white"
          >
            取消
          </button>
          <button
            @click="confirmDeleteRole"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onActivated, computed, nextTick, onUnmounted } from 'vue'
import { useRoleStore } from '@/stores/roleStore'
import { usePermissionStore } from '@/stores/permissionStore'
import PermissionSelector from '@/components/ui/PermissionSelector.vue'
import roleService from '@/services/roleService'
import type { RoleInfo, CreateRoleRequest, UpdateRoleRequest } from '@/services/roleService'
import type { Permission } from '@/services/permissionService'

// 组件挂载状态标志
const isMounted = ref(false)

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

// 权限搜索
const createPermissionSearch = ref('')
const editPermissionSearch = ref('')

// 分组的权限列表
const groupedPermissions = computed(() => {
  try {
    // 打印调试信息
    console.log('计算groupedPermissions')
    console.log('permissionStore.permissions:', permissionStore.permissions)
    console.log('roleStore.permissions:', roleStore.permissions)

    // 优先使用permissionStore中的分组权限
    if (permissionStore.permissions && Object.keys(permissionStore.permissions).length > 0) {
      console.log('使用permissionStore的分组权限', permissionStore.permissions)
      return permissionStore.permissions
    }

    // 回退到从roleStore的扁平权限列表构建分组
    const grouped: Record<string, Permission[]> = {}
    console.log('从roleStore构建分组权限')

    if (!roleStore.permissions || roleStore.permissions.length === 0) {
      console.log('警告: roleStore和permissionStore都没有权限数据')
      // 提供一些默认数据以便测试
      if (process.env.NODE_ENV === 'development') {
        console.log('开发环境: 使用默认权限数据')
        const defaultData = {
          用户管理: [
            { pid: 1, name: '用户查看', description: '查看用户列表', type: 'API' },
            { pid: 2, name: '用户创建', description: '创建用户', type: 'API' },
            { pid: 3, name: '用户编辑', description: '编辑用户', type: 'API' },
            { pid: 4, name: '用户删除', description: '删除用户', type: 'API' },
            { pid: 5, name: '用户导出', description: '导出用户数据', type: 'API' },
            { pid: 6, name: '用户导入', description: '导入用户数据', type: 'API' },
          ],
          用户组管理: [
            { pid: 7, name: '用户组查看', description: '查看用户组列表', type: 'API' },
            { pid: 8, name: '用户组创建', description: '创建用户组', type: 'API' },
            { pid: 9, name: '用户组编辑', description: '编辑用户组', type: 'API' },
            { pid: 10, name: '用户组删除', description: '删除用户组', type: 'API' },
          ],
          角色管理: [
            { pid: 11, name: '角色查看', description: '查看角色列表', type: 'API' },
            { pid: 12, name: '角色创建', description: '创建角色', type: 'API' },
            { pid: 13, name: '角色删除', description: '删除角色', type: 'API' },
          ],
        }
        return defaultData
      }
      return {}
    }

    // 确保roleStore.permissions是数组
    if (Array.isArray(roleStore.permissions)) {
      roleStore.permissions.forEach((perm) => {
        if (perm && perm.type) {
          // 添加空值检查
          const type = perm.type || '其他'
          if (!grouped[type]) {
            grouped[type] = []
          }
          grouped[type].push(perm)
        } else {
          console.warn('跳过无效的权限数据:', perm)
        }
      })
    } else {
      console.error('roleStore.permissions不是数组')
      return {}
    }

    return grouped
  } catch (error) {
    console.error('计算groupedPermissions时出错:', error)
    // 返回一个空对象作为后备
    return {}
  }
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

// 测试模态框控制
const showTestModal = ref(false)

// 处理创建角色按钮点击事件
const handleCreateRoleClick = async () => {
  console.log('创建角色按钮被点击')
  if (!isMounted.value) {
    console.log('组件未挂载，忽略点击')
    return
  }

  try {
    // 确保表单是干净的
    newRole.value = {
      roleName: '',
      displayName: '',
      permissions: [],
    }
    validationErrors.value = {}
    createPermissionSearch.value = '' // 重置搜索框

    // 先加载可用权限数据
    console.log('加载可用权限数据')
    await permissionStore.loadAvailablePermissions()

    // 如果没有可用权限数据，则尝试加载常规权限数据
    if (Object.keys(permissionStore.availablePermissions).length === 0) {
      console.log('无可用权限数据，尝试加载常规权限数据')
      await permissionStore.loadPermissions()
    }

    // 如果仍然没有权限数据，则尝试从roleStore加载
    if (
      Object.keys(permissionStore.availablePermissions).length === 0 &&
      Object.keys(permissionStore.permissions).length === 0
    ) {
      console.log('permissionStore无权限数据，尝试从roleStore加载')
      await roleStore.loadPermissions()

      // 如果数据加载后仍然没有权限数据，使用默认值
      if (
        Object.keys(permissionStore.availablePermissions).length === 0 &&
        Object.keys(permissionStore.permissions).length === 0 &&
        roleStore.permissions.length === 0
      ) {
        console.log('无法加载权限数据，使用默认数据')
        permissionStore.availablePermissions = {
          用户管理: [
            { pid: 1, name: '用户查看', description: '查看用户列表', type: 'API' },
            { pid: 2, name: '用户创建', description: '创建用户', type: 'API' },
          ],
          角色管理: [{ pid: 3, name: '角色查看', description: '查看角色列表', type: 'API' }],
        }
      }
    }

    // 直接设置模态框状态
    nextTick(() => {
      if (isMounted.value) {
        showCreateRoleModal.value = true
        console.log('模态框状态已设置为', showCreateRoleModal.value)
      }
    })
  } catch (error) {
    console.error('处理创建角色点击时出错:', error)
    if (isMounted.value) {
      alert('打开创建角色窗口失败，请重试')
    }
  }
}

// 关闭创建模态框
const closeCreateModal = () => {
  console.log('关闭创建角色模态框')
  showCreateRoleModal.value = false
}

// 加载所有数据
const loadAll = async () => {
  if (!isMounted.value) {
    console.log('组件未挂载，取消加载数据')
    return
  }

  console.log('开始加载角色和权限数据...')
  try {
    // 首先尝试从permissionStore加载权限组数据
    console.log('调用permissionStore.loadPermissions()')
    await permissionStore.loadPermissions()

    if (!isMounted.value) return
    console.log('permissionStore权限加载成功', permissionStore.permissions)

    // 加载角色数据
    console.log('调用roleStore.loadRoles()')
    await roleStore.loadRoles()

    if (!isMounted.value) return
    console.log('角色加载成功', roleStore.roles)

    // 如果permissionStore没有成功加载分组权限，则通过roleStore加载扁平权限
    if (Object.keys(permissionStore.permissions).length === 0) {
      console.log('未从permissionStore获取到分组权限，调用roleStore.loadPermissions()')
      await roleStore.loadPermissions()

      if (!isMounted.value) return
      console.log('roleStore权限加载成功', roleStore.permissions)
    }
  } catch (error) {
    if (!isMounted.value) return
    console.error('加载角色和权限数据失败:', error)
    alert('加载数据失败，请检查网络连接或刷新页面重试')
  }
}

// 在组件挂载后执行
onMounted(() => {
  console.log('RolesView组件已挂载，开始加载数据')
  isMounted.value = true
  loadAll()
})

// 组件卸载时
onUnmounted(() => {
  console.log('RolesView组件已卸载')
  isMounted.value = false
})

onActivated(() => {
  console.log('RolesView组件已激活，开始加载数据')
  isMounted.value = true
  loadAll()
})

// 根据权限ID获取权限名称
const getPermissionName = (pid: number) => {
  // 首先在扁平权限列表中查找
  const permFromRoleStore = roleStore.permissions.find((p) => p.pid === pid || p.permissionId === pid)
  if (permFromRoleStore) {
    return permFromRoleStore.permissionName || permFromRoleStore.name || `权限 #${pid}`
  }

  // 在分组权限中查找
  for (const group in permissionStore.permissions) {
    const found = permissionStore.permissions[group].find((p) => p.pid === pid || p.permissionId === pid)
    if (found) {
      return found.permissionName || found.name || `权限 #${pid}`
    }
  }

  return `权限 #${pid}`
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
  if (!isMounted.value) return

  console.log('===== 创建角色函数被调用 =====')
  console.log('表单数据:', JSON.stringify(newRole.value))

  if (!validateRoleForm(newRole.value)) {
    console.log('表单验证失败', validationErrors.value)
    return
  }

  try {
    console.log('表单验证通过，准备创建角色')
    // 确保权限是数字数组
    const roleData: CreateRoleRequest = {
      roleName: newRole.value.roleName.trim(),
      displayName: newRole.value.displayName?.trim() || undefined,
      permissions: newRole.value.permissions.map((pid) => Number(pid)),
    }

    console.log('提交到roleStore的数据:', JSON.stringify(roleData))

    // 直接调用服务而不是通过store
    try {
      console.log('直接调用roleService.createRole')
      const response = await roleService.createRole(roleData)
      if (!isMounted.value) return
      console.log('创建角色API调用成功:', response)
      // 刷新角色列表
      await roleStore.loadRoles()
    } catch (serviceError) {
      if (!isMounted.value) return
      console.error('直接调用服务失败:', serviceError)
      // 回退到使用store
      console.log('回退到使用roleStore.createRole')
      await roleStore.createRole(roleData)
    }

    if (!isMounted.value) return
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
    if (!isMounted.value) return
    console.error('创建角色失败:', error)
    alert('创建角色失败: ' + (error instanceof Error ? error.message : String(error)))
  }
}

// 编辑角色
const handleEditRole = async (role: RoleInfo) => {
  if (!isMounted.value) return

  try {
    // 先加载可用权限数据
    console.log('加载可用权限数据')
    await permissionStore.loadAvailablePermissions()

    editingRole.value = {
      rid: role.rid,
      roleName: role.roleName,
      displayName: role.displayName || '',
      permissions: Array.isArray(role.permissions) ? [...role.permissions] : [],
    }
    editPermissionSearch.value = '' // 重置搜索框
    showEditRoleModal.value = true
    validationErrors.value = {}
  } catch (error) {
    console.error('处理编辑角色时出错:', error)
    if (isMounted.value) {
      alert('打开编辑角色窗口失败，请重试')
    }
  }
}

// 更新角色
const updateRole = async () => {
  if (!isMounted.value) return
  if (!validateRoleForm(editingRole.value)) return

  try {
    await roleStore.updateRole(editingRole.value)
    if (!isMounted.value) return
    showEditRoleModal.value = false
    validationErrors.value = {}
  } catch (error) {
    if (!isMounted.value) return
    console.error('更新角色失败:', error)
  }
}

// 删除角色
const handleDeleteRole = (role: RoleInfo) => {
  if (!isMounted.value) return

  deletingRole.value = role
  showDeleteConfirmModal.value = true
}

// 确认删除角色
const confirmDeleteRole = async () => {
  if (!isMounted.value) return
  if (!deletingRole.value) return

  try {
    await roleStore.deleteRole(deletingRole.value.rid)
    if (!isMounted.value) return
    showDeleteConfirmModal.value = false
    deletingRole.value = null
  } catch (error) {
    if (!isMounted.value) return
    console.error('删除角色失败:', error)
  }
}

// 测试按钮点击事件
const testButtonClick = () => {
  console.log('测试按钮被点击')
  alert('测试按钮点击成功！')
}

// 测试Alert
const testAlert = () => {
  console.log('测试Alert')
  alert('测试Alert成功！')
}
</script>

<style scoped>
input[type='checkbox'] {
  accent-color: #2563eb;
}
</style>
