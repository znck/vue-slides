<template>
  <component 
    class="heading"
    :is="tag"
    :class="{
      caps: caps
    }"
  >
    <slot />
  </component>
</template>

<script>
import PropTypes from '@znck/prop-types'

export default {
  name: 'Title',
  props: {
    caps: PropTypes.bool.value(false),
    level: PropTypes.oneOf(1, 2, 3, 4, 5).value(1)
  },
  computed: {
    tag() {
      return 'h' + this.level
    }
  }
}
</script>

<style>
.heading {
  color: inherit;
}
.caps {
  text-transform: uppercase;
}
</style>
