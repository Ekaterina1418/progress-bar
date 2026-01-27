<template>
  <div class="page">
    <div class="demo-grid">
      <CircularProgress :value="0" :max="100" :size="100" :stroke-width="10" type="circle" />
      <CircularProgress :value="45" :max="100" :size="100" :stroke-width="10" type="circle" />
      <CircularProgress
        :value="100"
        :max="100"
        :size="100"
        status="success"
        :stroke-width="10"
        type="circle"
      />
      <CircularProgress
        :value="50"
        :max="100"
        :size="100"
        status="warning"
        :stroke-width="10"
        type="circle"
      />
      <CircularProgress
        :value="50"
        :max="100"
        :size="100"
        status="error"
        :stroke-width="10"
        type="circle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import CircularProgress from '@/components/CircularProgress.vue'
</script>

<style scoped>
.demo-grid {
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 24px;
}
.page {
  max-width: 1280px;
  margin: 0 auto;
}
</style>
