<template>
  <div class="user-group-tree">
    <div v-if="loading" class="flex items-center justify-center py-4">
      <div
        class="w-6 h-6 border-2 border-t-transparent border-blue-500 rounded-full animate-spin"
      ></div>
      <span class="ml-2 text-gray-400">加载中...</span>
    </div>

    <div
      v-else-if="error"
      class="p-4 bg-red-500 bg-opacity-10 border border-red-500 rounded-md text-red-500"
    >
      {{ error }}
    </div>

    <div v-else-if="!root" class="p-4 text-center text-gray-400">暂无用户组数据</div>

    <div v-else class="user-group-tree-container">
      <TreeNode
        :node="root"
        :selected-id="selectedGroupId"
        @select="handleSelect"
        @contextmenu="handleContextMenu"
      />
    </div>

    <!-- 右键菜单 -->
    <div v-if="showContextMenu" class="context-menu" :style="contextMenuStyle">
      <div class="context-menu-item" @click="handleAddGroup">
        <div class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span>添加子组</span>
      </div>
      <div class="context-menu-item" @click="handleRenameGroup">
        <div class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            />
          </svg>
        </div>
        <span>重命名</span>
      </div>
      <div class="context-menu-item text-red-500" @click="handleDeleteGroup">
        <div class="icon-container">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <span>删除</span>
      </div>
    </div>

    <!-- 添加组对话框 -->
    <div v-if="showAddDialog" class="dialog-backdrop">
      <div class="dialog">
        <h3 class="dialog-title">添加子组</h3>
        <div class="dialog-content">
          <label class="block mb-1 text-sm text-gray-400">父级组</label>
          <div class="p-2 bg-gray-700 rounded mb-3">{{ contextNode?.ugName || '' }}</div>

          <label class="block mb-1 text-sm text-gray-400" for="groupName">组名称</label>
          <input
            type="text"
            id="groupName"
            class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            v-model="newGroupName"
            placeholder="请输入组名称"
          />
        </div>
        <div class="dialog-actions">
          <button @click="cancelAddGroup" class="btn-secondary">取消</button>
          <button @click="confirmAddGroup" class="btn-primary" :disabled="!newGroupName.trim()">
            确认
          </button>
        </div>
      </div>
    </div>

    <!-- 重命名对话框 -->
    <div v-if="showRenameDialog" class="dialog-backdrop">
      <div class="dialog">
        <h3 class="dialog-title">重命名组</h3>
        <div class="dialog-content">
          <label class="block mb-1 text-sm text-gray-400" for="newGroupName">新组名称</label>
          <input
            type="text"
            id="newGroupName"
            class="w-full p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500"
            v-model="newGroupName"
            placeholder="请输入新组名称"
          />
        </div>
        <div class="dialog-actions">
          <button @click="cancelRenameGroup" class="btn-secondary">取消</button>
          <button @click="confirmRenameGroup" class="btn-primary" :disabled="!newGroupName.trim()">
            确认
          </button>
        </div>
      </div>
    </div>

    <!-- 删除确认对话框 -->
    <div v-if="showDeleteDialog" class="dialog-backdrop">
      <div class="dialog">
        <h3 class="dialog-title">删除用户组</h3>
        <div class="dialog-content">
          <p class="mb-2">确定要删除以下用户组吗？</p>
          <p class="font-bold">{{ contextNode?.ugName || '' }}</p>
          <p class="text-red-500 text-sm mt-2">
            警告：此操作不可撤销，会同时删除该组下的所有子组！
          </p>
        </div>
        <div class="dialog-actions">
          <button @click="cancelDeleteGroup" class="btn-secondary">取消</button>
          <button @click="confirmDeleteGroup" class="btn-danger">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useUserGroupStore } from '@/stores/userGroupStore'
import type { UserGroupTreeNode } from '@/services/userGroupService'
import TreeNode from '@/components/TreeNode.vue'

const props = defineProps<{
  selectedId?: number
}>()

const emit = defineEmits<{
  (e: 'select', groupId: number): void
}>()

// Store
const userGroupStore = useUserGroupStore()

// 状态
const loading = computed(() => userGroupStore.loading)
const error = computed(() => userGroupStore.error)
const root = computed(() => userGroupStore.userGroupTree)
const selectedGroupId = ref(props.selectedId || 0)

// 右键菜单
const showContextMenu = ref(false)
const contextMenuPosition = ref({ x: 0, y: 0 })
const contextNode = ref<UserGroupTreeNode | null>(null)
const contextMenuStyle = computed(() => ({
  left: `${contextMenuPosition.value.x}px`,
  top: `${contextMenuPosition.value.y}px`,
}))

// 对话框
const showAddDialog = ref(false)
const showRenameDialog = ref(false)
const showDeleteDialog = ref(false)
const newGroupName = ref('')

// 加载用户组树
const loadUserGroupTree = async () => {
  try {
    console.log('UserGroupTree组件: 开始加载用户组树...')
    await userGroupStore.loadUserGroupTree()
    console.log('UserGroupTree组件: 用户组树加载结果:', userGroupStore.userGroupTree)

    // 如果没有选中的组，默认选中根组
    if (!selectedGroupId.value && root.value) {
      console.log('UserGroupTree组件: 自动选择根组:', root.value.ugid)
      selectedGroupId.value = root.value.ugid
      emit('select', root.value.ugid)
    }
  } catch (error) {
    console.error('UserGroupTree组件: 加载用户组树失败:', error)
  }
}

// 处理选择
const handleSelect = (groupId: number) => {
  console.log(`用户选择了用户组: ${groupId}`)
  selectedGroupId.value = groupId
  emit('select', groupId)
  closeContextMenu()
}

// 处理右键菜单
const handleContextMenu = (e: MouseEvent, node: UserGroupTreeNode) => {
  e.preventDefault()
  contextMenuPosition.value = { x: e.clientX, y: e.clientY }
  contextNode.value = node
  showContextMenu.value = true

  // 点击其他区域关闭菜单
  nextTick(() => {
    window.addEventListener('click', closeContextMenu, { once: true })
  })
}

// 关闭右键菜单
const closeContextMenu = () => {
  showContextMenu.value = false
}

// 添加组相关
const handleAddGroup = () => {
  if (!contextNode.value) return
  newGroupName.value = ''
  showAddDialog.value = true
}

const cancelAddGroup = () => {
  showAddDialog.value = false
}

const confirmAddGroup = async () => {
  if (!contextNode.value || !newGroupName.value.trim()) return

  try {
    await userGroupStore.createUserGroup(contextNode.value.ugid, newGroupName.value)
    showAddDialog.value = false
  } catch (error) {
    console.error('添加用户组失败', error)
  }
}

// 重命名相关
const handleRenameGroup = () => {
  if (!contextNode.value) return
  newGroupName.value = contextNode.value.ugName
  showRenameDialog.value = true
}

const cancelRenameGroup = () => {
  showRenameDialog.value = false
}

const confirmRenameGroup = async () => {
  if (!contextNode.value || !newGroupName.value.trim()) return

  try {
    await userGroupStore.updateUserGroup(contextNode.value.ugid, newGroupName.value)
    showRenameDialog.value = false
  } catch (error) {
    console.error('重命名用户组失败', error)
  }
}

// 删除相关
const handleDeleteGroup = () => {
  if (!contextNode.value) return
  showDeleteDialog.value = true
}

const cancelDeleteGroup = () => {
  showDeleteDialog.value = false
}

const confirmDeleteGroup = async () => {
  if (!contextNode.value) return

  try {
    await userGroupStore.deleteUserGroup(contextNode.value.ugid)
    showDeleteDialog.value = false

    // 如果删除的是当前选中的组，选中根组
    if (selectedGroupId.value === contextNode.value.ugid && root.value) {
      selectedGroupId.value = root.value.ugid
      emit('select', root.value.ugid)
    }
  } catch (error) {
    console.error('删除用户组失败', error)
  }
}

// 监听点击事件，关闭右键菜单
</script>

<style scoped>
.user-group-tree {
  position: relative;
  background-color: #1f2937;
  border-radius: 0.375rem;
  border: 1px solid #374151;
  width: 100%;
  min-height: 200px;
}

.user-group-tree-container {
  padding: 0.75rem;
}

/* 右键菜单 */
.context-menu {
  position: fixed;
  z-index: 100;
  width: 180px;
  background-color: #1f2937;
  border-radius: 0.375rem;
  border: 1px solid #374151;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  padding: 0.25rem 0;
}

.context-menu-item {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.context-menu-item:hover {
  background-color: #374151;
}

.icon-container {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
}

/* 对话框 */
.dialog-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.dialog {
  width: 90%;
  max-width: 400px;
  background-color: #1f2937;
  border-radius: 0.375rem;
  border: 1px solid #374151;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.dialog-title {
  padding: 1rem;
  font-size: 1.125rem;
  font-weight: 600;
  border-bottom: 1px solid #374151;
}

.dialog-content {
  padding: 1rem;
}

.dialog-actions {
  padding: 0.75rem 1rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  border-top: 1px solid #374151;
}

/* 按钮 */
.btn-primary {
  background-color: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn-primary:disabled {
  background-color: #2563eb;
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #4b5563;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #374151;
}

.btn-danger {
  background-color: #dc2626;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-weight: 500;
  transition: background-color 0.2s;
}

.btn-danger:hover {
  background-color: #b91c1c;
}
</style>
