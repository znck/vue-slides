<!--<template functional>
  <Function :fn="() => props.vnode" v-bind="attrs" v-on="listeners" :key="data.key" />
</template>-->

<script>
export default {
  functional: true,
  props: {
    vnode: { required: true }
  },
  render(h, { props, attrs, listeners, data }) {
    return h('Function', {
      props: { ...attrs, fn: () => props.vnode },
      on: listeners,
      key: data.key
    })
  }
}
</script>
