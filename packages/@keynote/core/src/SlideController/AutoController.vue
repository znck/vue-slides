<template>
  <component :is="isTouchEnabled ? 'TouchController' : 'MouseController'">
    <KeyboardController>
      <slot />
    </KeyboardController>
  </component>
</template>


<script>
import KeyboardController from './KeyboardController.vue'
import MouseController from './MouseController.vue'
import TouchController from './TouchController.vue'

export default {
  data: () => ({
    isTouchEnabled: 'ontouchstart' in document.documentElement
  }),
  components: {
    KeyboardController,
    MouseController,
    TouchController
  }
}
</script>
