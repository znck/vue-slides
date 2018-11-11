<script>
import ResizeObserver from 'resize-observer-polyfill'

export default {
  props: {
    x: {
      type: Number,
      required: true
    },
    y: {
      type: Number,
      required: true
    }
  },
  data() {
    return { width: undefined, height: undefined }
  },
  computed: {
    kem() {
      if (this.width) return

      return `calc(${this.width} / 100)`
    }
  },
  mounted() {
    const observer = new ResizeObserver(([element]) => {
      const { width, height } = element.contentRect

      this.updateSize(width, height)
    })

    observer.observe(this.$el.parentElement)

    this.$on('hook:beforeDestroy', () => observer.disconnect())
  },
  methods: {
    updateSize(width, height) {
      const expectedHeight = (width * this.y) / this.x
      const expectedWidth = (height * this.x) / this.y

      if (expectedHeight < height) {
        this.height = expectedHeight + 'px'
        this.width = width + 'px'
      } else {
        this.height = height + 'px'
        this.width = expectedWidth + 'px'
      }
    }
  }
}
</script>

<template>
  <div :class="$style.area" :style="{ width, height, '--kem': `calc(${width} / 100)` }">
    <slot />
  </div>
</template>

<style module>
.area {
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
}
</style>
