<template>
  <div class="slideshow">
    <component
      v-if="slide && transition.component"
      :is="transition.component"
      key="transition"
      v-bind="transition"
      :skip-transition="skipTransition"
      @after-enter="afterSlideEnter"
    >
      <Vnode :vnode="slide.vnode" :key="slideIndex"/>
    </component>
    <div class="promote" v-if="!slide">
      <p>
        <small style="text-transform: uppercase; font-size: 1rem">built with</small>
        <br>
        <strong>Keynote.sh</strong>
      </p>
    </div>
    <slot/>
    <slot name="controls"/>
  </div>
</template>

<script>
const NoopTransition = { component: 'transition-noop' }

export default {
  props: ['slide', 'slideIndex'],

  data() {
    const transition = this.slide
      ? this.slide.transition
      : NoopTransition

    return {
      transition,
      skipTransition: false,
      nextTransition: transition
    }
  },
  methods: {
    afterSlideEnter() {
      this.skipTransition = true
      this.$nextTick(() => {
        this.transition = this.nextTransition
        this.$nextTick(() => {
          this.skipTransition = false
        })
      })
    }
  },
  watch: {
    'slide'(slide) {
      this.nextTransition = slide ? slide.transition : NoopTransition
    }
  }
}
</script>

<style scoped>
.slideshow {
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 400vw;
  background-color: black;
}

.slideshow:focus,
.slideshow:focus-visible {
  outline: none;
}

.slideshow > .slide {
  position: absolute;

  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.4);
}

.promote {
  font-size: 3rem;

  position: absolute;

  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}

.promote * {
  color: white;
  text-align: center;
}
</style>
