<template>
  <div class="pie-chart-wrapper">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import type { Sector } from '@/types'
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'
import { onBeforeMount, onMounted, ref, watch } from 'vue'
Chart.register(PieController, ArcElement, Tooltip, Legend)

const props = defineProps<{
  sectors: Sector[]
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const chart = ref<Chart | null>(null)

const getChartData = () => ({
  labes: props.sectors.map((sector) => sector.name),
  datasets: [
    {
      data: props.sectors.map((s) => s.value),
      backgroundColor: props.sectors.map((s) => s.color),
    },
  ],
})

const initChart = () => {
  if (!canvasRef.value) return
  chart.value = new Chart(canvasRef.value, {
    type: 'pie',
    data: getChartData(),
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  })
}

watch(
  () => props.sectors,
  () => {
    if (chart.value) {
      chart.value.data = getChartData()
      chart.value.update()
    }
  },
  { deep: true },
)
onMounted(initChart)
onBeforeMount(() => {
  chart.value?.destroy()
})
</script>

<style scoped></style>
