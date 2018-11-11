<script>
export default {
  props: {
    photo: String
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <img :src="photo" :class="$style.photo" />
  </BlankSlide>
</template>

<style>
.keynote-slide {
  /* Tier 3 */
  --photo-slide--body--Padding: 0;
  
  --photo-slide--photo--Height: 56.25kem; /* 1080pt */
  --photo-slide--photo--Width: 100%;
}
</style>

<style module>
.body {
  padding: var(--photo-slide--body--Padding);
}

.photo {
  margin: 0 auto;
  display: block;
  object-fit: cover;
  height: var(--photo-slide--photo--Height);
  width: var(--photo-slide--photo--Width);
}
</style>