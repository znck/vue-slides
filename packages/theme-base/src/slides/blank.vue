<script>
export default {
  inheritAttrs: false
}
</script>

<template>
  <div class="keynote-slide" :class="$style.wrapper">
    <div :class="$style.slide" v-bind="$attrs" v-on="$listeners">
      <slot />
    </div>
  </div>
</template>

<style>
.keynote-slide {
  --blank-slide--Background: var(--slide--Background);
}
</style>

<style module>
.wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;

  background: var(--blank-slide--Background);
}
.slide {
}
</style>
