<script setup lang="ts">
import { computed } from 'vue'

// 定义头像属性
interface Props {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  name?: string
  src?: string
  status?: 'online' | 'offline' | 'busy' | 'away' | 'none'
  variant?: 'circle' | 'rounded'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  name: '',
  src: '',
  status: 'none',
  variant: 'circle',
})

// 计算头像尺寸类名
const sizeClasses = computed(() => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-2xl',
  }
  return sizes[props.size]
})

// 计算头像形状类名
const shapeClasses = computed(() => {
  return props.variant === 'circle' ? 'rounded-full' : 'rounded-lg'
})

// 计算状态指示器类名
const statusClasses = computed(() => {
  const baseClasses = 'absolute border-2 border-gray-900 rounded-full'
  const positions = {
    xs: 'bottom-0 right-0 w-1.5 h-1.5',
    sm: 'bottom-0 right-0 w-2 h-2',
    md: 'bottom-0 right-0 w-2.5 h-2.5',
    lg: 'bottom-0 right-0 w-3 h-3',
    xl: 'bottom-0 right-0 w-4 h-4',
  }
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    busy: 'bg-red-500',
    away: 'bg-yellow-500',
    none: 'hidden',
  }
  return `${baseClasses} ${positions[props.size]} ${colors[props.status]}`
})

// 获取名称首字母
const initials = computed(() => {
  if (!props.name) return ''
  return props.name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
})

// 生成随机背景色（基于名称）
const bgColor = computed(() => {
  if (!props.name) return 'from-blue-500 to-purple-600'

  // 简单的哈希函数生成一致的颜色
  const hash = props.name.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  const colors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-red-500 to-orange-600',
    'from-purple-500 to-pink-600',
    'from-yellow-500 to-amber-600',
    'from-indigo-500 to-blue-600',
  ]

  const index = Math.abs(hash) % colors.length
  return colors[index]
})
</script>

<template>
  <div class="relative inline-flex">
    <!-- 图片头像 -->
    <img
      v-if="src"
      :src="src"
      :alt="name || 'Avatar'"
      :class="[sizeClasses, shapeClasses, 'object-cover']"
    />

    <!-- 文字头像 -->
    <div
      v-else
      :class="[
        sizeClasses,
        shapeClasses,
        'bg-gradient-to-r',
        bgColor,
        'flex items-center justify-center font-medium text-white',
      ]"
    >
      {{ initials || 'U' }}
    </div>

    <!-- 状态指示器 -->
    <span :class="statusClasses"></span>
  </div>
</template>
