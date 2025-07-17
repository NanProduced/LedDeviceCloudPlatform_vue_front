<template>
  <div class="permission-selector">
    <!-- 搜索结果统计 -->
    <div v-if="search" class="text-sm text-gray-400 mb-3">
      找到 {{ totalFilteredPermissions }} 个匹配的权限
    </div>

    <!-- 分组显示权限 -->
    <div
      v-for="(perms, group) in filteredGroupedPermissions"
      :key="group"
      class="permission-group mb-5"
    >
      <!-- 分组标题和全选控制 -->
      <div class="flex justify-between items-center mb-3">
        <div class="font-bold text-blue-300 text-base">{{ group }}</div>
        <div class="flex items-center space-x-3">
          <button
            @click="selectAllInGroup(group)"
            class="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
            title="全选此分类权限"
          >
            全选
          </button>
          <button
            @click="deselectAllInGroup(group)"
            class="text-xs px-2 py-1 bg-gray-600 hover:bg-gray-700 rounded text-white"
            title="取消全选此分类权限"
          >
            取消
          </button>
        </div>
      </div>

      <div class="permission-items">
        <div v-for="perm in perms" :key="perm.pid" class="permission-item">
          <label class="flex items-center p-2 rounded hover:bg-gray-700">
            <input
              type="checkbox"
              :value="perm.pid"
              :checked="modelValue.includes(perm.pid)"
              @change="togglePermission(perm.pid)"
              class="mr-3"
            />
            <span class="text-white text-base">{{ getPermissionName(perm) }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- 当没有权限数据时显示提示 -->
    <div
      v-if="Object.keys(filteredGroupedPermissions).length === 0"
      class="text-gray-400 text-base text-center py-6"
    >
      没有符合条件的权限数据
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, withDefaults, ref } from 'vue'
import type { Permission } from '@/services/permissionService'

// 组件属性
const props = withDefaults(
  defineProps<{
    permissions: Permission[] | Record<string, Permission[]>
    modelValue: number[]
    search?: string
  }>(),
  {
    permissions: () => ({}),
    modelValue: () => [],
    search: '',
  },
)

// 组件事件
const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()

onMounted(() => {
  console.log('PermissionSelector组件已挂载')
  console.log('接收到的权限数据类型:', Array.isArray(props.permissions) ? '数组' : '对象')
  console.log('接收到的权限数据:', props.permissions)
  console.log('选中的权限ID:', props.modelValue)
})

// 监听权限数据变化
watch(
  () => props.permissions,
  (newVal) => {
    console.log('权限数据已更新:', newVal)
  },
  { deep: true },
)

// 监听选中值变化
watch(
  () => props.modelValue,
  (newVal) => {
    console.log('选中的权限已更新:', newVal)
  },
  { deep: true },
)

// 判断是否为分组数据
const isGrouped = computed(() => {
  return !Array.isArray(props.permissions)
})

// 获取权限名称，兼容不同的API返回格式
function getPermissionName(perm: Permission): string {
  // 优先使用permissionName（API文档中的字段名）
  if (perm.permissionName) {
    return perm.permissionName;
  }
  // 回退到name（当前代码中使用的字段名）
  if (perm.name) {
    return perm.name;
  }
  // 最后回退到pid
  return `权限 #${perm.pid || perm.permissionId}`;
}

// 过滤分组权限
const filteredGroupedPermissions = computed(() => {
  if (!isGrouped.value) {
    // 如果是扁平数据，转换为分组格式
    const flatData = props.permissions as Permission[]
    if (!Array.isArray(flatData)) {
      return {}
    }

    // 按类型分组
    const grouped: Record<string, Permission[]> = {}
    flatData.forEach((perm) => {
      const type = perm.type || '其他'
      if (!grouped[type]) {
        grouped[type] = []
      }
      grouped[type].push(perm)
    })

    return filterGroups(grouped)
  }

  const groupedData = props.permissions as Record<string, Permission[]>
  return filterGroups(groupedData)
})

// 计算过滤后的权限总数
const totalFilteredPermissions = computed(() => {
  let count = 0
  for (const group in filteredGroupedPermissions.value) {
    count += filteredGroupedPermissions.value[group].length
  }
  return count
})

// 过滤分组数据
function filterGroups(groupedData: Record<string, Permission[]>) {
  const result: Record<string, Permission[]> = {}
  const search = props.search?.toLowerCase() || ''

  for (const group in groupedData) {
    // 确保groupedData[group]存在且是数组
    if (!Array.isArray(groupedData[group])) {
      console.warn(`组 ${group} 下没有有效的权限数组`)
      continue
    }

    result[group] = groupedData[group].filter((perm) => {
      if (!search) return true

      // 添加null检查防止undefined错误
      const nameMatch =
        perm && (perm.name || perm.permissionName)
          ? (perm.name || perm.permissionName).toLowerCase().includes(search)
          : false

      const descMatch =
        perm && (perm.description || perm.permissionDescription)
          ? (perm.description || perm.permissionDescription).toLowerCase().includes(search)
          : false

      return nameMatch || descMatch
    })
    // 如果该分组没有匹配的权限，不显示该分组
    if (result[group].length === 0) {
      delete result[group]
    }
  }

  return result
}

// 切换权限选中状态
function togglePermission(pid: number) {
  const arr = [...props.modelValue]
  const idx = arr.indexOf(pid)
  if (idx === -1) {
    arr.push(pid)
  } else {
    arr.splice(idx, 1)
  }
  console.log('切换权限:', pid, '新的选中列表:', arr)
  emit('update:modelValue', arr)
}

// 全选分组中的所有权限
function selectAllInGroup(group: string) {
  if (!filteredGroupedPermissions.value[group]) return

  const currentSelected = [...props.modelValue]
  const groupPermIds = filteredGroupedPermissions.value[group].map(p => p.pid)

  // 添加所有未选中的权限ID
  groupPermIds.forEach(pid => {
    if (!currentSelected.includes(pid)) {
      currentSelected.push(pid)
    }
  })

  console.log(`全选 ${group} 分组权限`, currentSelected)
  emit('update:modelValue', currentSelected)
}

// 取消选择分组中的所有权限
function deselectAllInGroup(group: string) {
  if (!filteredGroupedPermissions.value[group]) return

  const currentSelected = [...props.modelValue]
  const groupPermIds = filteredGroupedPermissions.value[group].map(p => p.pid)

  // 从选中列表中移除该分组的所有权限ID
  const filtered = currentSelected.filter(id => !groupPermIds.includes(id))

  console.log(`取消选择 ${group} 分组权限`, filtered)
  emit('update:modelValue', filtered)
}
</script>

<style scoped>
.permission-selector {
  overflow-y: auto;
  padding-right: 8px;
  /* 美化滚动条样式 */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #4b5563 #1f2937; /* Firefox */
  height: 100%;
  max-height: 100%;
}

/* Webkit浏览器的滚动条样式 */
.permission-selector::-webkit-scrollbar {
  width: 8px;
}

.permission-selector::-webkit-scrollbar-track {
  background: #1f2937;
  border-radius: 4px;
}

.permission-selector::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 4px;
  border: 2px solid #1f2937;
}

.permission-selector::-webkit-scrollbar-thumb:hover {
  background-color: #6b7280;
}

.permission-group {
  margin-bottom: 20px;
  background-color: rgba(30, 41, 59, 0.5);
  border-radius: 8px;
  padding: 12px;
  border: 1px solid rgba(71, 85, 105, 0.3);
}

.permission-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 8px;
}

.permission-item {
  background-color: rgba(55, 65, 81, 0.3);
  border-radius: 6px;
  transition: all 0.2s;
}

.permission-item:hover {
  background-color: rgba(75, 85, 99, 0.4);
}

input[type='checkbox'] {
  accent-color: #2563eb;
  width: 18px;
  height: 18px;
  cursor: pointer;
}

label {
  cursor: pointer;
  width: 100%;
}
</style>
