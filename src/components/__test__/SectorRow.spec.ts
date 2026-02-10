import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import SectorRow from '../SectorRow.vue'

const ColorPickerStub = {
  template: '<div class="color-picker-stub" />',
  props: ['modelValue', 'disabled'],
}

const createWrapper = (
  overrides: Partial<{ name: string | number; value: number; color: string }> = {},
) =>
  mount(SectorRow, {
    props: { name: 'Tech', value: 25, color: '#ff0000', ...overrides },
    global: { stubs: { ColorPicker: ColorPickerStub } },
  })

describe('SectorRow', () => {
  it('renders initial model values', () => {
    const wrapper = createWrapper()
    const nameInput = wrapper.find('input.input-text').element as HTMLInputElement
    const valueInput = wrapper.find('input.input-value').element as HTMLInputElement

    expect(nameInput.value).toBe('Tech')
    expect(valueInput.value).toBe('25')
    expect(wrapper.find('.color-picker-stub').exists()).toBe(true)
  })

  it('starts in readonly mode', () => {
    const wrapper = createWrapper()

    expect(wrapper.classes()).toContain('readonly')
    const nameInput = wrapper.find('input.input-text')
    const valueInput = wrapper.find('input.input-value')
    expect(nameInput.attributes('readonly')).toBeDefined()
    expect(valueInput.attributes('readonly')).toBeDefined()
  })

  it('emits delete on delete button click', async () => {
    const wrapper = createWrapper()

    await wrapper.find('button.delete').trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')?.length).toBe(1)
  })

  it('toggles readonly on edit button click', async () => {
    const wrapper = createWrapper()

    expect(wrapper.classes()).toContain('readonly')
    await wrapper.find('button.edit').trigger('click')
    expect(wrapper.classes()).not.toContain('readonly')

    await wrapper.find('button.edit').trigger('click')
    expect(wrapper.classes()).toContain('readonly')
  })

  it('clamps value input between 0 and 100', async () => {
    const wrapper = createWrapper()
    const valueInput = wrapper.find('input.input-value')

    await valueInput.setValue('200')
    const firstEmit = wrapper.emitted('update:value')
    expect(firstEmit && firstEmit[firstEmit.length - 1]?.[0]).toBe(100)

    await valueInput.setValue('-10')
    const secondEmit = wrapper.emitted('update:value')
    expect(secondEmit && secondEmit[secondEmit.length - 1]?.[0]).toBe(0)
  })

  it('adds # prefix to color values without it', async () => {
    const wrapper = createWrapper({ color: '#ff0000' })

    await wrapper.setProps({ color: '00ff00' })

    const emits = wrapper.emitted('update:color')
    expect(emits && emits[emits.length - 1]?.[0]).toBe('#00ff00')
  })

  it('keeps # prefix when color already has it', async () => {
    const wrapper = createWrapper({ color: '#ff0000' })

    await wrapper.setProps({ color: '#123456' })

    const emits = wrapper.emitted('update:color')
    expect(emits).toBeUndefined()
  })

  it('disables color picker when readonly and enables after edit', async () => {
    const wrapper = createWrapper()

    const picker = wrapper.findComponent(ColorPickerStub)
    expect(picker.props('disabled')).toBe(true)

    await wrapper.find('button.edit').trigger('click')
    expect(picker.props('disabled')).toBe(false)
  })
})
