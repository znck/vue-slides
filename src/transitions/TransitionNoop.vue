<template>
  <transition :css="false" v-bind="$attrs" v-on="$listeners"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @enter-cancelled="enterCancelled"
    @before-leave="beforeLeave"
    @leave="leave"
    @after-leave="afterLeave"
    @leave-cancelled="leaveCancelled"
  >
    <slot />
  </transition>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  abstract: true,
  props: {
    skipTransition: { type: Boolean, default: false }
  },
  methods: {
    beforeEnter() {},
    enter: (_, done) => done(),
    afterEnter() {},
    enterCancelled: el => Velocity(el, 'finish'),
    beforeLeave() {},
    leave: (_, done) => done(),
    afterLeave() {},
    leaveCancelled: el => Velocity(el, 'finish')
  }
}
</script>
