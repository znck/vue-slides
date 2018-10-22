<template>
  <div class="fit text" ref="container" :style="{ justifyContent: this.position }">
    <div class="content" ref="text" :style="{ transform: `scale(${scale}) translateX(${translateX}%)` }">
      <slot />
    </div>
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
import PropTypes from '@znck/prop-types'

export default {
  name: 'Fit',

  props: {
    max: PropTypes.number.validate(it => it <= 8).value(8),
    position: PropTypes.oneOf('left', 'center', 'right').value('center')
  },

  data: () => ({
    scale: 1
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
      const { container, text } = this.$refs

      if (!container || !text) return

      const effectiveWidth = container.clientWidth
      const effectiveHeight = container.clientHeight

      const parent = container.parentElement
      const style = getComputedStyle(parent)
      const effectiveParentHeight =
        parent.clientHeight -
        parseFloat(style.paddingTop) -
        parseFloat(style.paddingBottom)

      const scale = Math.min(
        effectiveWidth / text.offsetWidth,
        Math.max(effectiveHeight, effectiveParentHeight) / text.offsetHeight,
        this.max
      ).toFixed(2)

      if (!Number.isNaN(scale) && scale >= 1 && Math.abs(this.scale - scale) > 0.0099) {
        this.scale = scale 
      }
    }
  },

  mounted() {
    const observer = new ResizeObserver(this.resize)

    observer.observe(this.$refs.text)
    observer.observe(document.body)

    this.$on('hook:beforeDestory', () => observer.disconnect())
  }
}
</script>

<style>
.fit {
  height: 100%;
  width: 100%;
  display: flex;
  white-space: nowrap;
  align-items: center;
}

.fit > .content {
  display: inline-block;
}
</style>
