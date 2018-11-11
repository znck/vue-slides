<script>
import { REGISTER } from './animation-constants'

export default {
  abstract: true,
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      required: true
    },
    in: {
      type: [Object, String],
      default: undefined
    },
    out: {
      type: [Object, String],
      default: undefined
    },
    actions: {
      type: [Array, Object, String],
      default: undefined
    }
  },
  inject: {
    register: REGISTER
  },
  created() {
    this.register(this.id, {
      buildIn: this.in,
      actions: this.actions,
      buildOut: this.out
    }, this.onAnimate)
  },
  methods: {
    async onAnimate(which, delay) {}
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
</script>
