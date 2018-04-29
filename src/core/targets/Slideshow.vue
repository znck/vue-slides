<template>
  <div class="slideshow">
    <component 
      v-if="keynote.activeSlide" 
      v-bind="transition"
      ref="transition"
      @after-enter="afterSlideEnter"
      :is="transition.component" key="transition"
      :skip-transition="skipTransition"
    >
      <Vnode :vnode="keynote.activeSlide.vnode" :key="keynote.activeSlide.index"/>
    </component>
    <PreLoad>
      <Vnode v-for="slide in keynote.slides" :vnode="(slide.vnode)" :key="slide.index"/>
    </PreLoad>
  </div>
</template>

<script>
const NoopTransition = { component: 'transition-noop' }

export default {
  name: 'Slideshow',
  inject: ['keynote'],

  data() {
    const transition = this.keynote.activeSlide
      ? this.keynote.activeSlide.transition
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
  components: {
    PreLoad: {
      provide: { preloading: true },
      render(h) {
        return h('div', { style: { display: 'none' } }, this.$slots.default)
      }
    }
  },
  watch: {
    'keynote.activeSlide'(slide) {
      this.nextTransition = slide ? slide.transition : NoopTransition
    }
  }
}
</script>

<style>
.slideshow {
  width: 100%;
  height: 100%;
  height: 100vh;
  position: relative;
  perspective: 400vw;
  background-color: black;
}

.slideshow > .slide {
  position: absolute;

  top: 0;
  left: 0;

  height: 100%;
  width: 100%;

  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.4);
}
</style>
