<template>
  <div :class="$style.content" ref="text" :style="{ fontSize: `${scale}em` }">
    <slot />
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
import PropTypes from '@znck/prop-types'

function isSmaller(a, b) {
  return a.width < b.width || a.height < b.height
}
function findSize(entry) {
  if (!entry) return { width: 0, height: 0 }

  const contentRect = entry.getBoundingClientRect()
  const style = window.getComputedStyle(entry)

  const padding = {
    top: parseFloat(style.paddingTop),
    right: parseFloat(style.paddingRight),
    bottom: parseFloat(style.paddingBottom),
    left: parseFloat(style.paddingLeft)
  }

  return { width: contentRect.width - padding.left - padding.right, height: contentRect.height - padding.top - padding.bottom }
}

export default {
  props: {
    max: PropTypes.number.validate(it => it <= 8).value(8),
    position: PropTypes.oneOf('left', 'center', 'right').value('center')
  },
  data: () => ({
    scale: 1,
    low: null,
    high: null
  }),
  computed: {
    translateX () {
      if (this.position === 'center') return 0
      const delta = ((this.scale - 1) / this.scale) * 50
      return this.position === 'left' ? delta : -delta
    }
  },
  methods: {
    resize() {
      if (!this.$refs.text) return
      if (this.low && this.low > this.high) {
        this.low = this.high = null
        return
      } else if (this.low === null) {
        this.low = 0
        this.high = this.max
      }
      
      const text = findSize(this.$refs.text)
      const container = findSize(this.$refs.text.parentElement)

      let scale = this.scale
      if (isSmaller(text, container)) {
        scale = (this.high + scale) / 2
        this.low = this.scale
      } else {
        scale = (scale + this.low) / 2
        this.high = this.scale
      }

      if (scale > 0 && Math.abs(this.scale - scale) > 0.0000000001) {
        this.scale = scale
        setTimeout(() => this.low = this.high = null, 1000)
      }
    }
  },
  mounted() {
    const observer = new ResizeObserver(this.resize)
    this.$nextTick( () => {
      if (this.$refs.text) {
        observer.observe(this.$refs.text)
        observer.observe(this.$refs.text.parentElement)
      }
    })
    this.$on('hook:beforeDestory', () => observer.disconnect())
  }
}
</script>

<style module>
.content {
  display: inline;
}
</style>