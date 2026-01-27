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
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
}
.input-color::-webkit-color-swatch-wrapper {
  padding: 0;
}
.input-color::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

.input-color::-moz-color-swatch {
  border: none;
  border-radius: 50%;
  height: 20px;
  width: 20px;
}

.input-color::-moz-focus-inner {
  border: none;
  padding: 0;
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
