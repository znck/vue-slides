<template>
  <Controller @next="onNext" @previous="onPrevious" @step="onStep" @goto="onGoto">
    <Slideshow />
  </Controller>
</template>


<script>
import { prepareSlides } from './helpers'

import Controller from '../Controller'
import Slideshow from '../targets/Slideshow.vue'

const defineReactive = (target, key, get) => {
  Object.defineProperty(target, key, {
    get,
    enumerable: true,
    configurable: true
  })
}

export default {
  name: 'Manager',
  props: {
    autoplay: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    _rerender: 0,
    activeIndex: 0,
    buildStep: 0
  }),
  provide() {
    const keynote = {}

    defineReactive(keynote, 'activeIndex', () => this.activeIndex)
    defineReactive(keynote, 'activeSlide', () => this.activeSlide)
    defineReactive(keynote, 'nextSlide', () => this.nextSlide)
    defineReactive(keynote, 'prevSlide', () => this.prevSlide)
    defineReactive(keynote, 'buildStep', () => this.buildStep)
    defineReactive(keynote, 'slides', () => this.slides)
    defineReactive(keynote, 'rawSlides', () => this.rawSlides)

    return { keynote }
  },
  created() {
    this._$defaultSlot = this.$slots.default
  },
  beforeUpdate() {
    if (
      this._$defaultSlot.length !== this.$slots.default.length ||
      !this.$slots.default.every(
        (node, index) => this._$defaultSlot[index] === node
      )
    ) {
      this.$data._rerender += 1
    }
    this._$defaultSlot = this.$slots.default
  },
  computed: {
    slides() {
      this.$data._rerender // re-calculation dependency.

      return prepareSlides(
        this._self._c || this.$createElement,
        this.$slots.default,
        {}
      )
    },
    activeSlide() {
      return this.slides[this.activeIndex]
    },
    prevSlide() {
      return this.slides[this.activeIndex - 1]
    },
    nextSlide() {
      return this.slides[this.activeIndex + 1]
    }
  },
  methods: {
    onNext() {
      if (this.activeSlide && this.buildStep < this.activeSlide.steps) {
        this.buildStep = this.activeSlide.steps
      } else {
        this.onGoto(this.activeIndex + 1)
      }
    },
    onPrevious() {
      this.onGoto(this.activeIndex - 1)
    },
    onStep(delta) {
      const buildStep = this.buildStep + delta

      if (buildStep < 0) {
        this.buildStep = this.prevSlide ? this.prevSlide.steps : 0
        this.onGoto(this.activeIndex - 1)
      } else if (this.activeIndex < 0) {
        this.buildStep = this.prevSlide ? this.prevSlide.steps : 0
        this.onGoto(0)
      } else if (this.activeSlide && buildStep > this.activeSlide.steps) {
        this.buildStep = 0
        this.onGoto(this.activeIndex + 1)
      } else if (this.activeSlide && buildStep <= this.activeSlide.steps) {
        this.buildStep = buildStep
      }
    },
    onGoto(index) {
      if (index < 0) {
        this.activeIndex = -1
      } else if (index >= this.slides.length) {
        this.activeIndex = this.slides.length
      } else {
        this.activeIndex = index
      }
    }
  },
  components: {
    Controller,
    Slideshow
  }
}
</script>
