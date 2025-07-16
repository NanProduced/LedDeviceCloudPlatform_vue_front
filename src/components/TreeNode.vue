<template>
  <div class="tree-node">
    <div
      :class="[
        'node-content',
        { selected: isSelected },
        { 'has-children': node.children && node.children.length > 0 },
      ]"
      @click="handleClick"
      @contextmenu="handleContextMenu"
    >
      <div class="expand-icon" @click.stop="toggleExpand">
        <svg
          v-if="node.children && node.children.length > 0"
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          :class="{ 'rotate-90': expanded }"
        >
          <path
            fill-rule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clip-rule="evenodd"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <circle cx="10" cy="10" r="3" />
        </svg>
      </div>

      <div class="node-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      </div>

      <div class="node-label">{{ node.ugName }}</div>
    </div>

    <div v-if="expanded && node.children && node.children.length > 0" class="children-container">
      <TreeNode
        v-for="child in node.children"
        :key="child.ugid"
        :node="child"
        :selected-id="selectedId"
        @select="$emit('select', $event)"
        @contextmenu="$emit('contextmenu', $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { UserGroupTreeNode } from '@/services/userGroupService'

// 定义props
const props = defineProps<{
  node: UserGroupTreeNode
  selectedId?: number
}>()

// 定义事件
const emit = defineEmits<{
  (e: 'select', groupId: number): void
  (e: 'contextmenu', event: MouseEvent, node: UserGroupTreeNode): void
}>()

// 节点展开状态
const expanded = ref(true)

// 判断当前节点是否被选中
const isSelected = computed(() => props.selectedId === props.node.ugid)

// 切换展开/折叠状态
const toggleExpand = () => {
  if (props.node.children && props.node.children.length > 0) {
    expanded.value = !expanded.value
  }
}

// 处理点击事件
const handleClick = () => {
  console.log(`点击用户组节点: ${props.node.ugid} - ${props.node.ugName}`)
  emit('select', props.node.ugid)
}

// 处理右键菜单
const handleContextMenu = (e: MouseEvent) => {
  emit('contextmenu', e, props.node)
}
</script>

<style scoped>
.tree-node {
  margin: 0;
  padding-left: 0.25rem;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  margin: 0.125rem 0;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.node-content:hover {
  background-color: #374151;
}

.node-content.selected {
  background-color: #2563eb;
  color: white;
}

.expand-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 0.25rem;
  transition: transform 0.2s;
}

.rotate-90 {
  transform: rotate(90deg);
}

.node-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  color: #9ca3af;
}

.selected .node-icon {
  color: white;
}

.node-label {
  font-size: 0.875rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.children-container {
  margin-left: 1rem;
  border-left: 1px dashed #4b5563;
  padding-left: 0.5rem;
}
</style>
