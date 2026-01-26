<script setup lang="ts">
import CircularProgress from './components/CircularProgress.vue'
</script>

<template>
  <CircularProgress :value="45" :max="100" :size="120" :strokeWidth="10" type="dashboard" />
</template>

<style scoped></style>
