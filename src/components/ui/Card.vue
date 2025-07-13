<script setup lang="ts">
import { computed } from 'vue'

// 定义卡片属性
interface Props {
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hover: false,
})

// 根据变体和内边距计算卡片类名
const cardClasses = computed(() => {
  // 基础类名
  const baseClasses = 'rounded-xl overflow-hidden bg-gray-800 bg-opacity-50'

  // 变体类名
  const variantClasses = {
    default: '',
    bordered: 'border border-gray-700',
    elevated: 'shadow-xl',
  }

  // 内边距类名
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-7',
  }

  // 悬停效果类名
  const hoverClasses = props.hover
    ? 'transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg'
    : ''

  return [
    baseClasses,
    variantClasses[props.variant],
    paddingClasses[props.padding],
    hoverClasses,
  ].join(' ')
})
</script>

<template>
  <div :class="cardClasses">
    <slot></slot>
  </div>
</template>
