<script>
export default {
  props: {
    first: String,
    second: String,
    third: String
  }
}
</script>

<template>
  <BlankSlide :class="$style.body">
    <div :class="$style.content">
      <img :src="first" :class="$style.photo" />
      <img :src="second" :class="$style.photo" />
      <img :src="third" :class="$style.photo" />
    </div>
  </BlankSlide>
</template>

<style>
.keynote-slide {
  /* Tier 3 */
  --photo-3up-slide--body--Padding: var(--slide--body--Padding);
  
  --photo-3up-slide--content--Margin: 2.96875kem 0.46875kem; /* 57pt 9pt */
  --photo-3up-slide--content--Height: 42.760417kem; /* 821pt */

  --photo-3up-slide--photo--Height: 100%;
  --photo-3up-slide--photo--Width: 41.510417kem; /* 797pt */
  --photo-3up-slide--photo-gag--GridGap: 2.604167kem; /* 50pt */
}
</style>

<style module>
.body {
  padding: var(--photo-3up-slide--body--Padding);
}

.content {
  margin: var(--photo-3up-slide--content--Margin);
  height: var(--photo-3up-slide--content--Height);
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: "A B" "A C";
  grid-gap: var(--photo-3up-slide--photo-gag--GridGap);
}

.photo {
  margin: 0 auto;
  display: block;
  object-fit: cover;
  height: var(--photo-3up-slide--photo--Height);
  width: var(--photo-3up-slide--photo--Width);
}

.photo:nth-child(1) {
  grid-area: A;
}

.photo:nth-child(2) {
  grid-area: B;
}

.photo:nth-child(3) {
  grid-area: C;
}
</style>
