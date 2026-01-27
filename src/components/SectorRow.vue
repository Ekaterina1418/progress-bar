<template>
  <div class="sector-row">
    <div class="input-wrapper">
      <input class="custom-input input-text" v-model="name" type="text" />
    </div>
    <div class="input-wrapper">
      <input
        class="custom-input input-value"
        v-model.number="value"
        type="number"
        min="0"
        max="100"
        @input="value = Math.min(Math.max(value ?? 0, 0), 100)"
      />
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
const value = defineModel<number>('value')
const color = defineModel<string | number>('color')
</script>

<style scoped>
.sector-row {
  display: flex;
  align-items: center;
  width: 541px;
  height: 60px;
  padding: 18px 20px;
  border-radius: 10px;
  background: #dbdfe933;
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
.input-wrapper {
  position: relative;
}
.input-wrapper:not(:last-child) {
  margin-right: 25px;
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
.input-text {
  width: 120px;
  border: none;
  background: transparent;
  margin-right: 25px;
}

.input-value {
  width: 40px;
  text-align: right;
  border: none;
  background: transparent;
  padding: 0 5px;
  margin-right: 25px;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
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
