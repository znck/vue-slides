<template functional>
  <Function :fn="() => props.vnode" v-bind="attrs" v-on="listeners" :key="data.key"/>
</template>

<script>
export default {
  name: 'VnodeRenderer',
  props: {
    vnode: { required: true }
  }
}
</script>
