<template>
  <VirtualElement
    @click.left="isActive && $store.dispatch('control:step.next')"
    @blur.native="isActive = false"
    @focus.native="isActive = true"
  >
    <slot />
    <template slot="controls">
      <slot name="controls" />
    </template>
  </VirtualElement>
</template>

<script>
export default {
  data() {
    return { isActive: false }
  }
}
</script>
