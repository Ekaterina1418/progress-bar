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
      :stroke="strokeColor"
      :stroke-width="strokeWidth"
      :stroke-dasharray="visibleCircumference"
      :stroke-dashoffset="dashOffset"
      :transform="rotation"
    />
    <g v-if="!props.status" :transform="`translate(${center}, ${center})`">
      <text
        text-anchor="middle"
        dominant-baseline="middle"
        :font-size="usedFontSize"
        :font-weight="500"
        fill="#111111;"
      >
        {{ Math.round(progressRatio * 100) }}%
      </text>
    </g>
    <g v-else>
      <svg
        v-if="resolvedStatus === 'success'"
        :x="center - iconOffset"
        :y="center - iconOffset"
        :width="usedIconSize"
        :height="usedIconSize"
        viewBox="0 0 64 64"
      >
        <path
          d="M56.103,16.824l-33.296,33.297l-14.781,-14.78l2.767,-2.767l11.952,11.952l30.53,-30.53c0.943,0.943 1.886,1.886 2.828,2.828Z"
          fill="#22c55e"
          fill-rule="nonzero"
        />
      </svg>

      <svg
        v-else-if="resolvedStatus === 'warning'"
        :x="center - iconOffset"
        :y="center - iconOffset"
        :width="usedIconSize"
        :height="usedIconSize"
        viewBox="0 0 64 64"
      >
        <circle cx="32" cy="32" r="30" fill="#f59e0b" />
        <line x1="32" y1="16" x2="32" y2="40" stroke="#fff" stroke-width="4" />
        <circle cx="32" cy="48" r="2" fill="#fff" />
      </svg>

      <svg
        v-else-if="resolvedStatus === 'error'"
        :x="center - iconOffset"
        :y="center - iconOffset"
        :width="usedIconSize"
        :height="usedIconSize"
        viewBox="0 0 64 64"
      >
        <line x1="16" y1="16" x2="48" y2="48" stroke="#ef4444" stroke-width="4" />
        <line x1="48" y1="16" x2="16" y2="48" stroke="#ef4444" stroke-width="4" />
      </svg>
    </g>
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
  status?: Status
  type?: Type
  iconSize?: number
  fontSize?: number
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
  if (props.type === 'dashboard') {
    return `rotate(-225 ${center.value} ${center.value})`
  }
  return `rotate(-90 ${center.value} ${center.value})`
})

const usedIconSize = computed(() => props.iconSize ?? props.size * 0.15)
const usedFontSize = computed(() => props.fontSize || props.size * 0.15)
const iconOffset = computed(() => usedIconSize.value / 2)
</script>

<style scoped>
circle {
  transition:
    stroke-dashoffset 0.6s ease,
    stroke 0.4s ease;
}
</style>
