<template>
  <ControlField v-model="model.name" label="Наименование" />
</template>

<script setup lang="ts">
import ControlField from '@/components/ControlField.vue'
import { reactive } from 'vue'

const model = reactive({
  name: '',
  value: 0,
  color: '',
})
</script>

<style scoped></style>
