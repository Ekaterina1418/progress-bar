<template>
  <div class="control-field">
    <label class="label" :for="id">{{ label }}</label>
    <input class="custom-input" :id="id" :type="type" v-model="model" :min="min" :max="max" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  placeholder?: string
  id?: string
  type?: string
  min?: number
  max?: number
}>()
const model = defineModel<string | number>('modelValue')
</script>

<style scoped>
.control-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.label {
  font-size: 18px;
  font-weight: 500;
}
.custom-input {
  max-width: 250px;
  padding: 4px 6px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
}
</style>
