<template>
  <div class="control-field">
    <label :for="id">{{ label }}</label>
    <input :id="id" :type="type" v-model="model" :min="min" :max="max" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  id?: string
  type?: string
  min?: number
  max?: number
}>()
const model = defineModel<string | number>('modelValue')
</script>

<style scoped></style>
