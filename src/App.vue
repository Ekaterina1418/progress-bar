<script setup lang="ts">
import CircularProgress from './components/CircularProgress.vue'
</script>

<template>
  <CircularProgress :value="45" :max="100" :size="160" :strokeWidth="8" type="dashboard" />
</template>

<style scoped></style>
