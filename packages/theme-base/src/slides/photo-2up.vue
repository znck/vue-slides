<script>
export default {
  props: {
    left: String,
    right: String
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <img :src="left" :class="$style.photo" />
      <img :src="right" :class="$style.photo" />
    </div>
  </BlankSlide>
</template>

<style>
.vue-slides-slide {
  /* Tier 3 */
  --photo-2up-slide--body--Padding: var(--slide--body--Padding);
  
  --photo-2up-slide--content--Margin: 2.96875kem 0.46875kem; /* 57pt 9pt */

  --photo-2up-slide--photo--Height: 42.447917kem; /* 815pt */
  --photo-2up-slide--photo--Width: 41.510417kem; /* 797pt */
  --photo-2up-slide--photo-gag--MarginLeft: 2.604167kem; /* 50pt */
}
</style>

<style module>
.body {
  padding: var(--photo-2up-slide--body--Padding);
}

.content {
  display: flex;
  flex-direction: row;
  margin: var(--photo-2up-slide--content--Margin);
}

.photo {
  margin: 0 auto;
  display: block;
  object-fit: cover;
  height: var(--photo-2up-slide--photo--Height);
  width: var(--photo-2up-slide--photo--Width);
}

.photo + .photo {
  margin-left: var(--photo-2up-slide--photo-gag--MarginLeft);
}
</style>
