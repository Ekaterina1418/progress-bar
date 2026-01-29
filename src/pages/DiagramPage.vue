<template>
  <div class="page">
    <section>
      <h1 class="title">Круговая диаграмма</h1>
      <div class="wrap-form">
        <SectorRow
          v-for="sector in sectors"
          :key="sector.id"
          v-model:name="sector.name"
          v-model:value="sector.value"
          v-model:color="sector.color"
          @delete="removeSector(sector.id)"
        />
        <button class="add-sector" @click="addSector">Добавить сектор</button>
      </div>
      <PieChart :sectors="sectors" />
    </section>
  </div>
</template>

<script setup lang="ts">
import PieChart from '@/components/PieChart.vue'
import SectorRow from '@/components/SectorRow.vue'
import type { Sector } from '@/types'
import { reactive, ref } from 'vue'

const model = reactive({
  name: '',
  value: 0,
  color: '',
})
const sectors = ref<Sector[]>([
  { id: 1, name: 'Sector 1', value: 30, color: '#FF6384' },
  { id: 2, name: 'Sector 2', value: 50, color: '#FFCD56' },
  { id: 3, name: 'Sector 3', value: 20, color: '#4BC0C0' },
])

const addSector = () => {
  const newSector: Sector = {
    id: Date.now(),
    name: model.name,
    value: model.value,
    color: model.color,
  }
  sectors.value.push(newSector)
}
const removeSector = (id: number) => {
  sectors.value = sectors.value.filter((sector) => sector.id !== id)
}
</script>

<style scoped>
.title {
  font-size: 34px;
  font-weight: 600;
  margin-bottom: 40px;
  color: #252f4a;
  border-bottom: 1px solid #dbdfe9;
  padding-bottom: 30px;
}
.wrap-form {
  max-width: 541px;
}
.add-sector {
  width: 100%;
  background: #1b84ff;
  padding: 18px 0;
  border-radius: 10px;
  color: #fff;
  border: none;
}
</style>
