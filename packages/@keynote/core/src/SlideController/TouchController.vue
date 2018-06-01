<template>
  <Touch
    @swipeleft="$store.dispatch('control:next')"
    @swiperight="$store.dispatch('control:prev')"
    @tap="$store.dispatch('control:step.next')"
    @press="$store.dispatch('control:step.prev')"
    @doubletap="$store.dispatch('control:fullscreen')"
  >
    <slot />
    <template slot="controls">
      <slot name="controls" />
    </template>
  </Touch>
</template>

<script>
import Touch from './Touch.vue'

export default {
  components: { Touch }
}
</script>
