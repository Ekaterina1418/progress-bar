<template>
  <div class="sector-row" :class="{ readonly: !isEditing }">
    <div class="input-wrapper">
      <input class="custom-input input-text" v-model="name" type="text" :readonly="!isEditing" />
    </div>
    <div class="input-wrapper">
      <input
        class="custom-input input-value"
        v-model.number="value"
        type="number"
        min="0"
        max="100"
        @input="value = Math.min(Math.max(value ?? 0, 0), 100)"
        :readonly="!isEditing"
      />
      <span class="percent-sign">%</span>
    </div>
    <ColorPicker
      v-model="color"
      inputId="cp-hex"
      format="hex"
      class="picker"
      :disabled="!isEditing"
    />
    <div class="actions">
      <button @click="toggleEdit" class="edit">
        <img src="../assets/icons/pen.svg" alt="pen" />
      </button>
      <button @click="emit('delete')" class="delete">
        <img src="../assets/icons/basket.svg" alt="basket" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ColorPicker from 'primevue/colorpicker'
const emit = defineEmits(['delete', 'edit'])
const name = defineModel<string | number>('name')
const value = defineModel<number>('value')
const color = defineModel<string>('color')

const isEditing = ref(false)

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}
watch(color, (val) => {
  if (val && !val.startsWith('#')) color.value = '#' + val
})
</script>

<style scoped>
.sector-row {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 18px 20px;
  border-radius: 10px;
  background: #dbdfe933;
  margin-bottom: 8px;
}
.sector-row:last-of-type {
  margin-bottom: 30px;
}
.custom-input {
  border: none;
  outline: none;
}
.sector-row:not(.readonly) .input-wrapper:focus-within {
  border-color: #252f4a;
}
.sector-row.readonly .input-wrapper input {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}
.sector-row.readonly .percent-sign {
  opacity: 0.3;
}
.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  border: 1px solid transparent;
  border-radius: 6px;
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
  color: #252f4a;
}

.input-value {
  width: 40px;
  text-align: right;
  color: #252f4a;
  border: none;
  background: transparent;
  padding: 0 5px;
  margin-right: 25px;
}
.percent-sign {
  position: absolute;
  right: 15px;
  color: #252f4a;
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

.picker {
  --p-colorpicker-preview-width: 20px;
  --p-colorpicker-preview-height: 20px;
  --p-colorpicker-preview-border-radius: 50%;
}
@media (max-width: 768px) {
  .input-text {
    width: 70px;
  }
  .input-wrapper:not(:last-child) {
    margin-right: 10px;
  }
  .sector-row {
    padding: 10px 8px;
  }
}
</style>
