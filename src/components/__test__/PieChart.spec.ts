import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import PieChart from '../PieChart.vue'

vi.mock('chart.js', async () => {
  const actual = await vi.importActual('chart.js')
  function ChartMock(this: { destroy?: ReturnType<typeof vi.fn> }) {
    this.destroy = vi.fn()
  }
  const ChartCtor = vi.fn(ChartMock)
  ;(ChartCtor as unknown as { register?: ReturnType<typeof vi.fn> }).register = vi.fn()
  return {
    ...actual,
    Chart: ChartCtor,
  }
})

describe('PieChart', () => {
  it('renders a canvas element', () => {
    const wrapper = mount(PieChart, {
      props: { sectors: [{ id: 1, name: 'A', value: 50, color: '#f00' }] },
    })
    const canvas = wrapper.find('canvas')
    expect(canvas.exists()).toBe(true)
  })
})
