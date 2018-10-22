<script>
import { prepareSlides } from './helpers'

export default {
  props: { rawSlides: { type: Array } },
  render() {
    return null
  },
  watch: {
    rawSlides: {
      immediate: true,
      handler(rawSlides) {
        this.$store.dispatch(
          'slides',
          prepareSlides(this._self._c || this.$createElement, rawSlides || [])
        )
      }
    }
  }
}
</script>
