<template>
  <div class="keynote">
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
import SlideController from './SlideController'
import SlideProcessor from './SlideProcessor'

export default {
  name: 'Keynote',
  components: {
    SlideController,
    SlideProcessor
  }
}
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

* {
  box-sizing: border-box;
}
</style>

<style scoped>
.keynote {
  height: 100%;
  width: 100%;
}
</style>
