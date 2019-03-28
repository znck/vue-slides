<script>
import { presentationComputed } from '@vue-slides/state'

export default {
  props: {
    position: {
      type: String,
      default: 'bottom-right'
    },
    title: {
      type: String,
      required: true,
      description: 'Title of the presentation'
    },
    event: {
      type: String,
      description: 'Name of the event'
    },
    author: {
      type: Object,
      required: true,
      description: 'Author Information',
      shape: {
        name: {
          type: String,
          required: true
        },
        website: {
          type: String,
          required: true
        }
      }
    }
  },

  computed: {
    ...presentationComputed,
    completed() {
      return (
        ((this.activeSlideIndex + 1) / Math.max(1, this.numberOfSlides)) * 100
      )
    }
  }
}
</script>

<template>
  <div v-if="activeSlideIndex < numberOfSlides" :class="[$style['progress-bar'], $style[position] ]">
    {{ activeSlideIndex + 1 }} / {{ numberOfSlides }} | {{ title }} <template v-if="event">| {{ event }} </template>|
    <a :href="author.website" target="_blank"> {{ author.name }}</a>
    <div :class="$style.progress">
      <div :class="$style.track" :style="{ width: completed + '%' }" />
    </div>
  </div>
</template>

<style>
#vue-slides-presentation {
  --progress-widget-offset: 2kem;
  --progress-widget-offset-x: var(--progress-widget-offset);
  --progress-widget-offset-y: var(--progress-widget-offset);

  --progress-widget-text-color: var(--text-color-primary);
  --progress-widget-font-family: var(--text-font-primary);
  --progress-widget-font-size: 1.25kem;

  --progress-widget-track-size: var(--global-progress-widget-track-size, 0.125kem);
  --progress-widget-foreground: var(--global-progress-widget-foreground, var(--text-color-primary));
  --progress-widget-background: var(--global-progress-widget-background, var(--text-color-primary-disabled));
}
</style>

<style module>
.top-left {
  top: var(--progress-widget-offset-y);
  left: var(--progress-widget-offset-x);
}
.top-right {
  top: var(--progress-widget-offset-y);
  right: var(--progress-widget-offset-x);
}
.bottom-left {
  bottom: var(--progress-widget-offset-y);
  left: var(--progress-widget-offset-x);
}
.bottom-right {
  bottom: var(--progress-widget-offset-y);
  right: var(--progress-widget-offset-x);
}

.progress-bar {
  color: var(--progress-widget-text-color);
  font-size: var(--progress-widget-font-size);
  font-family: var(--progress-widget-font-family);
  line-height: 1.5;
  padding: 0;
  position: absolute;
}

.progress-bar a {
  color: var(--progress-widget-text-color);
  text-decoration: none;
}

.progress {
  display: block;
  width: 100%;
  height: var(--progress-widget-track-size);
  border-radius: var(--progress-widget-track-size);
  background: var(--progress-widget-background);
  position: relative;
}

.progress .track {
  display: block;
  height: var(--progress-widget-track-size);
  background: var(--progress-widget-foreground);
  position: absolute;
  border-radius: var(--progress-widget-track-size);
}
</style>
