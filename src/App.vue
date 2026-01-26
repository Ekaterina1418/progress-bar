<script setup lang="ts">
import CircularProgress from './components/CircularProgress.vue'
</script>

<template>
  <CircularProgress :value="45" :max="150" :size="120" :strokeWidth="10" type="circle" />
</template>

<style scoped></style>
