<template>
  <div class="pie-chart-wrapper">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { Chart, PieController, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(PieController, ArcElement, Tooltip, Legend)
</script>

<style scoped></style>
