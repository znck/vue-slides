<template>
<Slide class="slide-title">
  <Fit>
    <Title class="title">{{ title }}</Title>

    <slot>
      <Subtitle class="subtitle" v-if="subtitle">
        {{ subtitle }}
      </Subtitle>
    </slot>
  </Fit>
</Slide>
</template>

<script>
export default {
  name: 'TitleSlide',
  keynote: 'slide',
  props: {
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
.slide.slide-title {
  align-items: center;
  justify-content: center;
  text-align: center;
  .title {
    color: $primary-color;
    margin-bottom: 0;
  }
  .subtitle {
    color: $secondary-color;
    margin-top: 0;
  }
}
</style>
