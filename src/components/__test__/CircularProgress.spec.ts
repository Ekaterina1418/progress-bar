import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import CircularProgress from '../CircularProgress.vue'

describe('CircularProgress', () => {
  let wrapper: ReturnType<typeof mount>
  beforeEach(() => {
    wrapper = mount(CircularProgress, {
      props: {
        value: 40,
        max: 100,
        size: 100,
        strokeWidth: 10,
      },
    })
  })
  it('renders percentage text when no status is provided', () => {
    expect(wrapper.text()).toContain('40%')
  })

  it('does not render percentage text when status is provided', async () => {
    await wrapper.setProps({ status: 'success' })
    expect(wrapper.text()).not.toContain('%')
  })
  it('renders correct icon for warning status', async () => {
    await wrapper.setProps({ status: 'warning' })
    expect(wrapper.find('.icon-visible').exists()).toBe(true)
  })
  it('renders correct icon for error status', async () => {
    await wrapper.setProps({ status: 'error' })
    expect(wrapper.find('.icon-visible').exists()).toBe(true)
  })
  it('clamps value at max', async () => {
    await wrapper.setProps({ value: 200, max: 100 })
    expect(wrapper.text()).toContain('100%')
  })
  it('clamps value at 0', async () => {
    await wrapper.setProps({ value: -50, max: 100 })
    expect(wrapper.text()).toContain('0%')
  })
  it('applies dashboard type correctly', async () => {
    await wrapper.setProps({ type: 'dashboard' })
    const circle = wrapper.find('circle:nth-of-type(2)')
    expect(circle.attributes('stroke-dasharray')).toBeDefined()
  })
})
