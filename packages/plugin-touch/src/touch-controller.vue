<script>
import screenfull from 'screenfull'
import { presentationMethods } from '@keynote/state'

export default {
  mounted() {
    if ('ontouchstart' in document.documentElement) {
      this.hammer()
    }

    window.addEventListener('orientationchange', async () => {
      if (screenfull.enabled) {
        screenfull.request()
      }
    })
  },

  methods: {
    ...presentationMethods,
    async hammer() {
      const { default: Hammer } = await import('hammerjs')
      const el = document.getElementById('keynote')
      const hammer = new Hammer(el)

      hammer.on('tap', event => {
        if (
          !/input|select|button|a|checkbox|textarea/.test(event.target.tagType)
        ) {
          event.center.x < el.offsetWidth / 2 ? this.previous() : this.next()
        }
      })

      hammer.on('swipeleft', () => this.next())
      hammer.on('swiperight', () => this.previous())

      this.$on('hook:beforeDestroy', () => hammer.destroy())
    }
  },

  render() {
    return null
  }
}
</script>
