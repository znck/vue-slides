<script>
export default {
  props: {
    title: {
      type: String,
      description: 'Slide title'
    },
    subtitle: {
      type: String,
      description: 'Slide subtitle'
    },
    top: {
      type: Boolean,
      description: 'Title top'
    }
  },
  slots: {
    default: {
      description: 'Default slot'
    },
    title: {
      description: 'Slide title'
    },
    subtitle: {
      description: 'Slide subtitle'
    }
  }
}
</script>

<template>
  <Slide :class="$style.slide">
    <h1 v-if="title || $slots.title" :class="[$style.title, top && $style.top]">
      <slot name="title">
        {{ title }}
      </slot>
    </h1>
    <div v-if="top || $slots.default" :class="$style.body">
      <slot />
    </div>
    <h3 :class="$style.subtitle" v-else-if="subtitle || $slots.subtitle">
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </h3>
  </Slide>
</template>

<style module>
.slide {
  display: flex;
  flex-direction: column;
  padding: var(--slide-padding);
}

.title {
  font-size: 5kem;
  height: 50%;
  flex-basis: 50%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0;
}

.title.top {
  height: auto;
  flex-basis: auto;
}

.body {
  flex: 1;
  margin-top: 2kem;
  font-size: var(--slide-font-size);
}

.subtitle {
  font-size: 2.3125kem;
  height: 25%;
  flex-basis: 25%;
  margin-bottom: 25%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0;
}
</style>
