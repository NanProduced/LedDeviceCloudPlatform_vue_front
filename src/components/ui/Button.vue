<script setup lang="ts">
import { computed } from 'vue'

// 定义按钮属性
interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  fullWidth?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  fullWidth: false,
  type: 'button',
})

// 根据变体和尺寸计算按钮类名
const buttonClasses = computed(() => {
  // 基础类名
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900'

  // 尺寸类名
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  // 变体类名
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
    secondary: 'bg-purple-600 hover:bg-purple-700 text-white focus:ring-purple-500',
    success: 'bg-green-600 hover:bg-green-700 text-white focus:ring-green-500',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500',
    warning: 'bg-yellow-600 hover:bg-yellow-700 text-white focus:ring-yellow-500',
    info: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400',
    ghost: 'bg-transparent hover:bg-gray-700 text-gray-300 hover:text-white focus:ring-gray-500',
  }

  // 禁用状态类名
  const disabledClasses = props.disabled ? 'opacity-50 cursor-not-allowed' : ''

  // 宽度类名
  const widthClasses = props.fullWidth ? 'w-full' : ''

  return [
    baseClasses,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabledClasses,
    widthClasses,
  ].join(' ')
})
</script>

<template>
  <button :class="buttonClasses" :type="type" :disabled="disabled">
    <slot></slot>
  </button>
</template>
