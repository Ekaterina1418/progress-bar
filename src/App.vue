<script setup lang="ts">
import CircularProgress from './components/CircularProgress.vue'
</script>

<template>
  <CircularProgress :value="45" status="warning" :max="100" :size="120" :strokeWidth="10" />
</template>

<style scoped></style>
