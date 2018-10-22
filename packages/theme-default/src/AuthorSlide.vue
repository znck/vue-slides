<template>
<Slide class="slide-author">
  <Photo class="photo" :src="photo" />
  <Heading :level="2"><span class="name">{{ name }}</span></Heading>
  <p class="bio"><slot>{{ bio }}</slot></p>
</Slide>
</template>

<script>
export default {
  name: 'AuthorSlide',
  keynote: 'slide',
  props: {
    photo: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: null
    },
    bio: {
      type: String
    }
  }
}
</script>

<style lang="scss">
@import './variables.scss';

.slide.slide-author {
  align-items: center;
  justify-content: center;
  text-align: center;
  .photo {
    margin: 1rem;
    width: 128px;
    height: 128px;
    border-radius: 50%;
    object-fit: cover;
    overflow: hidden;
  }
  .name {
    color: $primary-color;
  }
  .bio {
    color: $gray-darker;
  }
}
</style>
