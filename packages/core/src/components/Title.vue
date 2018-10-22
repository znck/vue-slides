<template>
  <Heading :level="1" v-bind="$attrs" v-on="$listeners">
    <slot />
  </Heading>
</template>

<script>
import Heading from './Heading.vue'

export default {
  name: 'Title',
  components: { Heading }
}
</script>
