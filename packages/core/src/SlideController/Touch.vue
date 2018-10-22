<template>
  <VirtualElement>
    <slot />
  </VirtualElement>
</template>

<script>
import Hammer from 'hammerjs'

export default {
  mounted() {
    if (!('ontouchstart' in document.documentElement)) return
    console.log('Enable touch on', this.$el)
    const hammer = new Hammer(this.$el)
    Object.entries(this.$listeners).forEach(([name, fn]) => hammer.on(name, fn))
    this.$on('hook:beforeDestroy', () => hammer.destroy())
  }
}
</script>
