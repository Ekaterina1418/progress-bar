<template>
  <div class="sector-row">
    <div class="input-wrapper">
      <input class="custom-input input-text" v-model="name" type="text" />
    </div>
    <div class="input-wrapper">
      <input class="custom-input input-value" v-model="value" type="text" />
    </div>
    <input class="custom-input input-color" v-model="color" type="color" />
    <div class="actions">
      <button class="edit"><img src="../assets/icons/pen.svg" alt="pen" /></button>
      <button class="delete"><img src="../assets/icons/basket.svg" alt="basket" /></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = defineModel<string | number>('name')
const value = defineModel<string | number>('value')
const color = defineModel<string | number>('color')
</script>

<style scoped>
.sector-row {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  background: #dbdfe933;
  border-radius: 10px;
  margin-bottom: 8px;
}

.input-color {
  border: none;
  padding: 0;
  margin-left: 12px;
  cursor: pointer;
}
.input-text,
.input-value {
  padding: 8px;
  border: none;
  background: transparent;
  text-align: left;
}
.input-wrapper {
  position: relative;
  flex: 2;
}

.input-wrapper::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 0;
  width: 2px;
  height: 16px;
  background: #dbdfe9;
  transform: translateY(-50%);
}
.actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.edit,
.delete {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 16px;
}
</style>
