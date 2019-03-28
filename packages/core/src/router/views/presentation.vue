<script>
import {
  presentationComputed,
  presentationMethods,
  pluginsComputed
} from '@vue-slides/state'

import {
  AnimationEngine,
  PluginController,
  SlideRenderer
} from '../../components'

export default {
  components: {
    AnimationEngine,
    PluginController,
    SlideRenderer
  },
  computed: {
    ...presentationComputed,
    ...pluginsComputed
  },
  methods: {
    ...presentationMethods
  }
}
</script>

<template>
  <div :class="$style.wrapper">
    <SlideRenderer :x="16" :y="9" id="vue-slides-presentation">
      <component v-if="activeSlide" :is="activeSlide.meta.component" />

      <PluginController target="presentation" :plugins="activePlugins" />
    </SlideRenderer>
  </div>
</template>

<style module>
.wrapper {
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
