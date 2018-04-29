<template>
  <Vnode v-if="(isVisible && !isWaiting) || preloading" 
    :vnode="$slots.default[0]" 
    @done="onTransitionComplete" 
    @after-enter="onTransitionComplete"
    @after-leave="onTransitionComplete"
  />
</template>


<script>
import Vue from 'vue'

const events = new Vue({})

export default {
  name: 'Build',
  keynote: 'build',
  inject: {
    keynote: 'keynote',
    preloading: {
      default: false
    }
  },
  props: {
    name: String,
    with: String,
    after: String,
    delay: {
      type: Number,
      default: 0
    },
    step: {
      type: Number, // This is runtime injected property.
      default: 0
    },
    context: {
      type: String,
      default: 'default'
    }
  },
  data: () => ({ isWaiting: true }),
  created() {
    this.theEventHandler = context => {
      if (context === this.context) this.onTransitionStart()
    }
    if (this.after) {
      events.$on('completed:' + this.after, this.theEventHandler)
    } else if (this.with) {
      events.$on('started:' + this.with, this.theEventHandler)
    }
  },
  beforeDestroy() {
    events.$off('completed:' + this.after, this.theEventHandler)
    events.$off('started:' + this.with, this.theEventHandler)
  },
  computed: {
    build() {
      return this.keynote.buildStep
    },
    isVisible() {
      return this.step < this.build
    }
  },
  methods: {
    onTransitionStart() {
      if (this.preloading) {
        this.isWaiting = false
      }
      clearTimeout(this._start)
      this._start = setTimeout(() => {
        this.isWaiting = false
        events.$emit('started:' + this.name, this.context)
      }, this.delay)
    },
    onTransitionComplete() {
      if (this.preloading) return
      this.isWaiting = false
      events.$emit('completed:' + this.name, this.context)
    }
  },
  watch: {
    build: {
      handler() {
        if (this.with || this.after) return
        if (this.step < this.build) {
          this.onTransitionStart()
        }
      },
      immediate: true
    }
  }
}
</script>
