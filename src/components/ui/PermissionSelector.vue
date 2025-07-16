<template>
  <div>
    <div class="mb-2">
      <input
        v-model="search"
        type="text"
        placeholder="搜索权限名称/描述"
        class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
      />
    </div>
    <div v-if="isGrouped">
      <div v-for="(perms, group) in filteredGroupedPermissions" :key="group" class="mb-4">
        <div class="font-bold text-blue-300 mb-2">{{ group }}</div>
        <div class="flex flex-wrap gap-2">
          <label v-for="perm in perms" :key="perm.permissionId" class="inline-flex items-center">
            <input
              type="checkbox"
              :value="perm.permissionId"
              :checked="modelValue.includes(perm.permissionId)"
              @change="togglePermission(perm.permissionId)"
              class="mr-1"
            />
            <span
              >{{ perm.permissionName
              }}<span v-if="perm.permissionDescription">
                - {{ perm.permissionDescription }}</span
              ></span
            >
          </label>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="perm in filteredPermissions"
          :key="perm.permissionId"
          class="inline-flex items-center"
        >
          <input
            type="checkbox"
            :value="perm.permissionId"
            :checked="modelValue.includes(perm.permissionId)"
            @change="togglePermission(perm.permissionId)"
            class="mr-1"
          />
          <span
            >{{ perm.permissionName
            }}<span v-if="perm.permissionDescription">
              - {{ perm.permissionDescription }}</span
            ></span
          >
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue'

interface Permission {
  permissionId: number
  permissionName: string
  permissionDescription?: string
  permissionType?: string
}

const props = defineProps<{
  permissions: Permission[] | Record<string, Permission[]>
  modelValue: number[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number[]): void
}>()

const search = ref('')

const isGrouped = computed(() => {
  return !Array.isArray(props.permissions)
})

const filteredGroupedPermissions = computed(() => {
  if (!isGrouped.value) return {}
  const result: Record<string, Permission[]> = {}
  for (const group in props.permissions as Record<string, Permission[]>) {
    result[group] = (props.permissions as Record<string, Permission[]>)[group].filter(
      (perm) =>
        perm.permissionName.includes(search.value) ||
        (perm.permissionDescription && perm.permissionDescription.includes(search.value)),
    )
  }
  return result
})

const filteredPermissions = computed(() => {
  if (isGrouped.value) return []
  return (props.permissions as Permission[]).filter(
    (perm) =>
      perm.permissionName.includes(search.value) ||
      (perm.permissionDescription && perm.permissionDescription.includes(search.value)),
  )
})

function togglePermission(pid: number) {
  const arr = props.modelValue.slice()
  const idx = arr.indexOf(pid)
  if (idx === -1) {
    arr.push(pid)
  } else {
    arr.splice(idx, 1)
  }
  emit('update:modelValue', arr)
}
</script>

<style scoped>
input[type='checkbox'] {
  accent-color: #2563eb;
}
</style>
