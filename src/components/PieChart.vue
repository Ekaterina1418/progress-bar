<template>
  <div class="pie-chart-wrapper">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import type { Sector } from '@/types'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

Chart.register(PieController, ArcElement, Tooltip, Legend)

const props = defineProps<{
  sectors: Sector[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
let chart: Chart | null = null

const createChart = () => {
  if (!canvasRef.value) return
  if (chart) chart.destroy()

  chart = new Chart(canvasRef.value, {
    type: 'pie',
    data: {
      labels: props.sectors.map((s) => s.name),
      datasets: [
        {
          data: props.sectors.map((s) => s.value),
          backgroundColor: props.sectors.map((s) => s.color),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            pointStyle: 'circle',
            usePointStyle: true,
          },
        },
      },
    },
  })
}

watch(() => props.sectors, createChart, { deep: true, immediate: true })

onMounted(createChart)
onBeforeUnmount(() => {
  chart?.destroy()
})
</script>

<style scoped>
.pie-chart-wrapper {
  max-width: 500px;
  height: auto;
}
</style>
