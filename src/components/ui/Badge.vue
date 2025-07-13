<script setup lang="ts">
import { computed } from 'vue'

// 定义徽章属性
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'default'
  size?: 'sm' | 'md' | 'lg'
  rounded?: boolean
  dot?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'md',
  rounded: false,
  dot: false,
})

// 计算徽章类名
const badgeClasses = computed(() => {
  // 基础类名
  const baseClasses = 'inline-flex items-center justify-center font-medium'

  // 尺寸类名
  const sizeClasses = {
    sm: props.dot ? 'w-1.5 h-1.5' : 'px-1.5 py-0.5 text-xs',
    md: props.dot ? 'w-2 h-2' : 'px-2 py-1 text-xs',
    lg: props.dot ? 'w-2.5 h-2.5' : 'px-2.5 py-1 text-sm',
  }

  // 变体类名
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-purple-500 text-white',
    success: 'bg-green-500 text-white',
    danger: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-400 text-white',
    default: 'bg-gray-500 text-white',
  }

  // 形状类名
  const shapeClasses = props.rounded ? 'rounded-full' : 'rounded'

  return [baseClasses, sizeClasses[props.size], variantClasses[props.variant], shapeClasses].join(
    ' ',
  )
})
</script>

<template>
  <span :class="badgeClasses">
    <slot v-if="!dot"></slot>
  </span>
</template>
