<script>
export default {
  inheritAttrs: false
}
</script>

<template>
  <div :class="$style.wrapper">
    <div :class="$style.slide" v-bind="$attrs" v-on="$listeners">
      <slot />
    </div>
  </div>
</template>

<style module>
.wrapper {
  width: 100%;
  height: 100%;

  --slide-padding: 3kem;
  --slide-font-size: 2kem;

  background-color: var(--color-background);
  color: var(--color-text);
}

.slide {
  width: 100%;
  height: 100%;
}
</style>
