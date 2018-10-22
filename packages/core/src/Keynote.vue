<template>
<div class="keynote" :class="[ aspectRatio && 'a' + aspectRatio ]">
  <SlideProcessor :raw-slides="$slots.default" />

  <SlideController>
    <component
      :is="$store.state.presenter.component" 
      :slide="$store.state.currentSlide"
      :slideIndex="$store.state.control.currentSlide"
      :fullscreen="$store.state.control.isFullscreen"
    />
  </SlideController>
</div>
</template>

<script>
import SlideController from './SlideController';
import SlideProcessor from './SlideProcessor';
export default {
  name: 'Keynote',
  props: {
    aspectRatio: {
      type: String
    }
  },
  components: {
    SlideController: SlideController,
    SlideProcessor: SlideProcessor
  }
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  background: black;
}

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.keynote {
  width: 100%;
  height: 100%;
}

.a16x9 {
  width: 100vw;
  height: 56.25vw;
}

.a4x3 {
  width: 133.33vh;
  height: 100vh;
}
</style>
