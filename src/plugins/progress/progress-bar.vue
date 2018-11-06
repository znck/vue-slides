<script>
import { presentationComputed } from '@state/helpers'

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
  <div v-if="activeSlideIndex < numberOfSlides" class="progress-bar" :class="position">
    {{ activeSlideIndex + 1 }} | {{ title }} <template v-if="event">| {{ event }} </template>|
    <a :href="author.website" target="_blank"> {{ author.name }}</a>
    <div class="progress">
      <div class="track" :style="{ width: completed + '%' }" />
    </div>
  </div>
</template>

<style scoped>
.top-left {
  top: var(--progress-offset);
  left: var(--progress-offset);
}
.top-right {
  top: var(--progress-offset);
  right: var(--progress-offset);
}
.bottom-left {
  bottom: var(--progress-offset);
  left: var(--progress-offset);
}
.bottom-right {
  bottom: var(--progress-offset);
  right: var(--progress-offset);
}

.progress-bar {
  --progress-offset: 2kem;
  color: var(--slide-text-color);
  line-height: 1.5;
  font-size: 1kem;
  padding: 0;
  position: absolute;
}

.progress-bar a {
  color: var(--slide-text-color, #000);
  text-decoration: none;
}

.progress {
  --progress-size: 0.1325rem;
  display: block;
  width: 100%;
  height: var(--progress-size);
  border-radius: var(--progress-size);
  background: var(--slide-gray, #ccc);
  position: relative;
}

.progress .track {
  display: block;
  height: var(--progress-size);
  background: var(--color-primary, #000);
  position: absolute;
  border-radius: var(--progress-size);
}
</style>
