<script>
import {
  presentationComputed,
  presentationMethods,
  pluginsComputed
} from '@vue-slides/state'

import { AnimationEngine, SlideRenderer } from '../../components'

export default {
  components: {
    AnimationEngine,
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
  <div :class="$style.wrapper" id="vue-slides-presenter">
    <div :class="$style.current">
      <SlideRenderer :x="16" :y="9">
        <component v-if="activeSlide" :is="activeSlide.meta.component" />
      </SlideRenderer>
    </div>

    <div :class="$style.next">
      <SlideRenderer :x="16" :y="9">
        <component v-if="activeSlide" :is="activeSlide.meta.component" />
      </SlideRenderer>
    </div>
  </div>
</template>

<style module>
.wrapper,
.current,
.next {
  background: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.current {
  flex: 3;
  width: 60%;
}

.next {
  flex: 1;
  width: 40%;
}
</style>
