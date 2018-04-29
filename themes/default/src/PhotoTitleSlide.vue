<template>
<Slide class="slide-photo-title" :class="{ vertical, left }">
  <Photo class="photo" :src="photo" />
  <div class="body">
    <Fit>
      <Title class="title">{{ title }}</Title>
      <Subtitle>
        <slot>{{ subtitle }}</slot>
      </Subtitle>
    </Fit>
  </div>
</Slide>
</template>

<script>
export default {
  name: 'PhotoTitleSlide',
  keynote: 'slide',
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    photo: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: null
    }
  }
}
</script>


<style lang="scss">
@import './variables';
.slide.slide-photo-title {
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0;
  .photo {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 50%;
    object-fit: cover;
    overflow: hidden;
    object-fit: cover;
  }
  .title {
    color: $primary-color;
  }
  .subtitle {
    color: $secondary-color;
  }
  .body {
    flex-grow: 1;
    flex-shrink: 1;
    width: 100%;
    height: 50%;
  }
  &.vertical {
    flex-direction: row;
    .body {
      padding: 1rem;
      height: 100%;
    }
    .photo {
      order: 2;
      margin: 0;
      height: 100%;
    }
    &.left {
      .photo {
        order: initial;
      }
    }
  }
}
</style>
