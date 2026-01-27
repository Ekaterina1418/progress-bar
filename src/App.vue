<script setup lang="ts">
import CircularProgress from './components/CircularProgress.vue'
</script>

<template>
  <CircularProgress
    :value="14"
    :max="100"
    :size="160"
    :strokeWidth="8"
    :icon-size="28"
    type="dashboard"
  />
</template>

<style scoped></style>
