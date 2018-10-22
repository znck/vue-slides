<template>
  <Heading :level="3" v-bind="$attrs" v-on="$listeners">
    <slot />
  </Heading>
</template>

<script>
import Heading from './Heading.vue'

Heading.abstract = true

export default {
  name: 'Subtitle',
  components: { Heading }
}
</script>
