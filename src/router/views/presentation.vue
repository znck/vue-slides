<script>
import ResizeObserver from 'resize-observer-polyfill'
import { AnimationEngine, PluginController } from '@components'
import {
  presentationComputed,
  presentationMethods,
  pluginsComputed
} from '@state/helpers'

// TODO: Use window size to find root text size

export default {
  components: {
    AnimationEngine,
    PluginController
  },
  data() {
    return {
      width: '100%',
      height: '100%'
    }
  },
  computed: {
    ...presentationComputed,
    ...pluginsComputed
  },
  methods: {
    ...presentationMethods,
    updateSize(width, height) {
      switch (this.$root.aspectRatio) {
        case '16x9':
          {
            const expectedHeight = (width * 9) / 16
            const expectedWidth = (height * 16) / 9

            if (expectedHeight < height) {
              this.height = expectedHeight + 'px'
              this.width = width + 'px'
            } else {
              this.height = height + 'px'
              this.width = expectedWidth + 'px'
            }
          }
          break
      }
    }
  },
  mounted() {
    const observer = new ResizeObserver(entries => {
      const keynote = entries[0]
      const { width, height } = keynote.contentRect

      this.updateSize(width, height)
    })

    observer.observe(document.getElementById('keynote'))

    this.$on('hook:beforeDestroy', () => observer.disconnect())
  }
}
</script>

<template>
  <div class="wrapper" id="keynote:presentation">
    <div class="presentation" :style="{ width, height, '--kem': `calc(${width} / 100)` }">      
      <template v-if="activeSlide">
        <AnimationEngine ref="engine">
          <component :is="activeSlide.meta.component" />
        </AnimationEngine>
      </template>

      <PluginController target="presentation" :plugins="activePlugins" />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.presentation {
  position: relative;
  overflow: hidden;
}
</style>
