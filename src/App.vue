<script setup lang="ts">
import CircularProgress from './components/CircularProgress.vue'
</script>

<template>
  <CircularProgress
    :value="70"
    :max="150"
    :size="120"
    :strokeWidth="10"
    color="#3498db"
    type="dashboard"
  />
</template>

<style scoped></style>
