<template>
  <VirtualElement>
    <slot v-bind="{ state, dispatch }" />
  </VirtualElement>
</template>


<script>
import store from '../store'

export default {
  props: {
    module: { type: String }
  },
  computed: {
    module$() {
      return this.module ? this.module + '$' : this.module
    },
    state() {
      return this.module ? store[this.module$] || store[this.module] : store
    }
  },
  methods: {
    dispatch(name, ...args) {
      store.$emit(this.module ? this.module + ':' + name : name, ...args)
    }
  }
}
</script>
