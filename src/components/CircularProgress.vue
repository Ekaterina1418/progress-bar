<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`">
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
      >
        {{ Math.round(progressRatio * 100) }}%
      </text>
    </g>
    <g v-else>
      <svg
        v-show="props.status === s"
        v-for="s in ['success', 'warning', 'error']"
        :key="s"
        :x="center - iconOffset"
        :y="center - iconOffset"
        :width="usedIconSize"
        :height="usedIconSize"
        viewBox="0 0 64 64"
        class="icon"
        :class="{ 'icon-visible': props.status === s, 'icon-hidden': props.status !== s }"
      >
        <template v-if="s === 'success'">
          <path
            d="M56.103,16.824l-33.296,33.297l-14.781,-14.78l2.767,-2.767l11.952,11.952l30.53,-30.53c0.943,0.943 1.886,1.886 2.828,2.828Z"
            fill="#22c55e"
            fill-rule="nonzero"
          />
        </template>
        <template v-else-if="s === 'warning'">
          <circle cx="32" cy="32" r="30" fill="#f59e0b" />
          <line x1="32" y1="16" x2="32" y2="40" stroke="#fff" stroke-width="4" />
          <circle cx="32" cy="48" r="2" fill="#fff" />
        </template>
        <template v-else-if="s === 'error'">
          <line x1="16" y1="16" x2="48" y2="48" stroke="#ef4444" stroke-width="4" />
          <line x1="48" y1="16" x2="16" y2="48" stroke="#ef4444" stroke-width="4" />
        </template>
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

const strokeColor = computed(() => {
  if (props.status) {
    switch (props.status) {
      case 'success':
        return '#22c55e'
      case 'warning':
        return '#f59e0b'
      case 'error':
        return '#ef4444'
      default:
        return '#e5e7eb'
    }
  }
  const ratio = progressRatio.value
  const percent = ratio * 100

  if (percent <= 25) return '#ef4444'
  if (percent <= 50) return '#3b82f6'
  if (percent <= 75) return '#f59e0b'
  return '#22c55e'
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
.icon {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.icon[v-cloak] {
  opacity: 0;
  transform: scale(0.5);
}
.icon-hidden {
  opacity: 0;
  transform: scale(0.5);
  pointer-events: none;
}
.icon-visible {
  opacity: 1;
  transform: scale(1);
}
text {
  fill: #9e9fa1;
  transition: fill 0.4s ease;
}
</style>
