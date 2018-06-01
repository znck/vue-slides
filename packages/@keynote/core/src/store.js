import Vue from 'vue'

export const vm = new Vue({
  data: {
    slides: [],
    presenter: {
      component: 'SlidePresenter'
    },
    control$: {
      current: 0,
      currentStep: 0,
      isFullscreen: false
    }
  },
  computed: {
    currentMaxStep() {
      return this.currentSlide ? this.currentSlide.steps : 0
    },
    currentSlide() {
      return this.slides[this.control$.current]
    },
    prevSlide() {
      return this.slides[this.control$.current - 1]
    },
    nextSlide() {
      return this.slides[this.control$.current + 1]
    },
    control() {
      return {
        ...this.control$,
        currentMaxStep: this.currentMaxStep
      }
    }
  },
  created() {
    this.$on('control:go', (slide) => {
      this.control$.current = Math.min(Math.max(0, slide), this.slides.length)
      this.control$.currentStep = 0
    })
    this.$on('control:prev', () => {
      this.control$.current = Math.max(this.control.current - 1, 0)
      this.control$.currentStep = 0
    })
    this.$on('control:next', () => {
      this.control$.current = Math.min(
        this.control.current + 1,
        this.slides.length
      )
      this.control$.currentStep = 0
    })
    this.$on('control:step.prev', () => {
      if (this.control.currentStep <= 0) {
        this.$emit('control:prev')
      } else {
        this.control$.currentStep = this.control.currentStep - 1
      }
    })
    this.$on('control:step.next', () => {
      if (this.control.currentStep + 1 > this.currentMaxStep) {
        this.$emit('control:next')
      } else {
        this.control$.currentStep = this.control.currentStep + 1
      }
    })
    this.$on('control:fullscreen', () => {
      this.control$.isFullscreen = !this.control.isFullscreen
    })
    this.$on('slides', slides => {
      this.slides = slides
    })
  }
})

export default {
  state: vm,
  dispatch: (name, ...args) => vm.$emit(name, ...args)
}