<template>
  <div class="page">
    <section class="progress-bar">
      <h2 class="title">Кругового прогресс бар</h2>
      <div class="demo-grid">
        <CircularProgress :value="0" :max="100" :size="120" :stroke-width="10" type="circle" />
        <CircularProgress :value="45" :max="100" :size="120" :stroke-width="10" type="circle" />
        <CircularProgress
          :value="100"
          :max="100"
          :size="120"
          status="success"
          :stroke-width="10"
          type="circle"
        />
        <CircularProgress
          :value="50"
          :max="100"
          :size="120"
          status="warning"
          :stroke-width="10"
          type="circle"
        />
        <CircularProgress
          :value="50"
          :max="100"
          :size="120"
          status="error"
          :stroke-width="10"
          type="circle"
        />
      </div>
    </section>
    <section>
      <h2 class="title">Dashboard</h2>
      <div class="demo-grid">
        <CircularProgress :value="10" :max="100" :size="150" :stroke-width="10" type="dashboard" />
        <CircularProgress :value="60" :max="100" :size="150" :stroke-width="10" type="dashboard" />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import CircularProgress from '@/components/CircularProgress.vue'
</script>

<style scoped>
.title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #252f4a;
  text-align: center;
}
.demo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(70px, 150px));
  justify-content: center;
  gap: 16px;
}
.progress-bar {
  margin-bottom: 50px;
}
</style>
