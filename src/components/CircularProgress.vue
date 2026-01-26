<template>
  <svg
    :width="size"
    :height="size"
    :view-box="`0 0 ${size} ${size}`"
    :style="{ transform: rotation }"
  >
    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      fill="none"
      stroke="#eee"
      :stroke-width="strokeWidth"
    />
    <circle
      :cx="center"
      :cy="center"
      :r="radius"
      fill="none"
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      :stroke-dasharray="visibleCircumference"
      :stroke-dashoffset="dashOffset"
    />
  </svg>
</template>

<script setup lang="ts">
import type { Status, Type } from '@/types'
import { computed } from 'vue'

const props = defineProps<{
  value: number
  max: number
  size: number
  strokeWidth: number
  color: string
  status?: Status
  type?: Type
}>()

const progress = computed(() => {
  return Math.min(Math.max(props.value, 0), props.max)
})
const center = computed(() => props.size / 2)

const radius = computed(() => {
  return (props.size - props.strokeWidth) / 2
})
const circumference = computed(() => {
  return 2 * Math.PI * radius.value
})

const progressRatio = computed(() => {
  return progress.value / props.max
})
const visibleRatio = computed(() => (props.type === 'dashboard' ? 0.75 : 1))

const visibleCircumference = computed(() => circumference.value * visibleRatio.value)

const dashOffset = computed(() => visibleCircumference.value * (1 - progressRatio.value))

const resolvedStatus = computed<Status>(() => {
  if (props.status) return props.status

  if (progressRatio.value === 1) return 'success'
  if (progressRatio.value > 0.7) return 'inprogress'
  if (progressRatio.value > 0.3) return 'warning'
  return 'error'
})

const progressColor = computed(() => {
  const ratio = progressRatio.value

  const red = Math.round(255 * (1 - ratio))
  const green = Math.round(255 * ratio)

  return `rgb(${red}, ${green}, 0}`
})

const strokeColor = computed(() => {
  if (resolvedStatus.value === 'inprogress') {
    return progressColor.value
  }
  switch (resolvedStatus.value) {
    case 'success':
      return '#22c55e'
    case 'warning':
      return '#f59e0b'
    case 'error':
      return '#ef4444'
    default:
      return '#e5e7eb'
  }
})
const rotation = computed(() => {
  return props.type === 'dashboard' ? 'rotate(-225deg)' : 'rotate(-90deg)'
})
</script>

<style scoped>
circle {
  transition:
    stroke-dashoffset 0.6s ease,
    stroke 0.4s ease;
}
</style>
