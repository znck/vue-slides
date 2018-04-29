<template>
  <Slide class="slide-photo">
    <Photo class="photo" :src="photo" />
  </Slide>
</template>

<script>
export default {
  name: 'PhotoSlide',
  keynote: 'slide',
  props: {
    photo: {
      type: String,
      required: true
    }
  }
}
</script>


<style lang="scss">
@import './variables';
.slide.slide-photo {
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0;
  .photo {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  }
}
</style>
