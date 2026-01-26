<template>
  <svg :width="size" :height="size" :view-box="`0 0 ${size} ${size}`">
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
      :stroke="color"
      :stroke-width="strokeWidth"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="dashOffset"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  value: number
  max: number
  size: number
  strokeWidth: number
  color: string
  status?: 'inprogress' | 'success' | 'warning' | 'error'
  type: 'circle' | 'dashboard'
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
const dashOffset = computed(() => {
  return circumference.value * (1 - progressRatio.value)
})
</script>

<style scoped></style>
