<template>
  <SectorRow v-model:name="model.name" v-model:value="model.value" v-model:color="model.color" />
</template>

<script setup lang="ts">
import SectorRow from '@/components/SectorRow.vue'
import { reactive } from 'vue'

const model = reactive({
  name: '',
  value: 0,
  color: '',
})
</script>

<style scoped></style>
