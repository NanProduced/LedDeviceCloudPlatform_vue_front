<template>
  <div class="p-6 text-white">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold">用户组管理</h1>
      <Button @click="showCreateModal = true" variant="primary">
        <span class="flex items-center"> <span class="mr-1">+</span> 创建用户组 </span>
      </Button>
    </div>

    <Card variant="bordered">
      <div class="p-4">
        <div v-if="loading" class="flex justify-center items-center py-10">
          <div
            class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"
          ></div>
        </div>
        <div
          v-else-if="error"
          class="bg-red-500 bg-opacity-20 border border-red-500 text-white p-4 rounded-md mb-6"
        >
          {{ error }}
        </div>
        <div v-else>
          <UserGroupTree
            :selected-id="selectedGroupId"
            @select="handleSelect"
            @delete-group="handleDeleteGroup"
          />
        </div>
      </div>
    </Card>

    <!-- 创建用户组模态框 -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
    >
      <Card variant="bordered" class="w-full max-w-md mx-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">创建新用户组</h2>
          <button @click="showCreateModal = false" class="text-gray-400 hover:text-white">✕</button>
        </div>
        <form @submit.prevent="handleCreateGroup">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">父级用户组</label>
              <select
                v-model="parentId"
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
              <label class="block text-sm font-medium mb-1">用户组名称</label>
              <input
                v-model="groupName"
                type="text"
                required
                class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">描述</label>
              <input
                v-model="description"
                type="text"
                class="w-full p-2 bg-gray-700 rounded-md border border-gray-600 text-white"
              />
            </div>
          </div>
          <div class="flex justify-end mt-6 space-x-3">
            <Button @click="showCreateModal = false" variant="ghost">取消</Button>
            <Button type="submit" variant="primary">创建</Button>
          </div>
        </form>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserGroupStore } from '@/stores/userGroupStore'
import { storeToRefs } from 'pinia'
import UserGroupTree from '@/components/UserGroupTree.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const userGroupStore = useUserGroupStore()
const { userGroupTree, loading, error } = storeToRefs(userGroupStore)

const showCreateModal = ref(false)
const parentId = ref(0)
const groupName = ref('')
const description = ref('')
const selectedGroupId = ref(0)

// 展平用户组树，转换为列表
const flattenUserGroups = (groups: any[]): any[] => {
  return groups.reduce((acc: any[], group: any) => {
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

const handleSelect = (ugid: number) => {
  selectedGroupId.value = ugid
}

const handleCreateGroup = async () => {
  try {
    await userGroupStore.createUserGroup(parentId.value, groupName.value, description.value)
    showCreateModal.value = false
    groupName.value = ''
    description.value = ''
    parentId.value = userGroupTree.value ? userGroupTree.value.root.ugid : 0
  } catch (err) {
    console.error('创建用户组失败', err)
  }
}

const handleDeleteGroup = async (ugid: number) => {
  if (!confirm('确定要删除该用户组吗？')) return
  try {
    await userGroupStore.deleteUserGroup(ugid)
  } catch (err) {
    console.error('删除用户组失败', err)
  }
}

onMounted(async () => {
  await userGroupStore.loadUserGroupTree()
  parentId.value = userGroupTree.value ? userGroupTree.value.root.ugid : 0
})
</script>
