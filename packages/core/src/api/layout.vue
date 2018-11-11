<script>
export default {}
</script>

<template>
  <div :class="$style.layout">
    <slot />
  </div>
</template>

<style module>
.layout {
  display: flex;
}
</style>
