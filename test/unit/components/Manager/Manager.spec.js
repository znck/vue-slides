import { shallow } from '@vue/test-utils'
import Manager from '@/components/Manager/Manager.vue'

describe('<Manager>', () => {
  describe('API', () => {
    const wrapper = shallow(Manager, { propsData: {} })
    const props = wrapper.vm.$options.props

    test('should accept autoplay prop', () => {
      expect(props.autoplay).toBeTruthy()
      expect(props.autoplay.type).toEqual(Boolean)
      expect(props.autoplay.required).toBeFalsy()
      expect(props.autoplay.default).toEqual(false)
    })
  })
})
