<script>
import Hammer from 'hammerjs'

export default {
  name: 'Touch',
  abstract: process.env.NODE_ENV === 'production',
  render() {
    return this.$slots.default[0]
  },
  mounted() {
    if (!('ontouchstart' in document.documentElement)) return
    this.ref = new Hammer(this.$el)
    Object.entries(this.$listeners).forEach(([name, fn]) =>
      this.ref.on(name, fn)
    )
  },
  beforeDestroy() {
    this.ref && this.ref.destroy()
  }
}
</script>
