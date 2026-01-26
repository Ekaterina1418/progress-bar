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
const dashOffset = computed(() => {
  return circumference.value * (1 - progressRatio.value)
})

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
</script>

<style scoped></style>
