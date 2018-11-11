<script>
export default {
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      description: ''
    },
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
  },
  computed: {
    hasTitle() {
      return this.title || this.$slots.title
    },
    hasSubtitle() {
      return this.subtitle || this.$slots.subtitle
    },
    hasBody() {
      return this.$slots.default || this.hasTitle || this.hasSubtitle
    }
  }
}
</script>

<template>
  <Slide :class="{ [$style.slide]: true, [$style.full]: !hasBody }">
    <div :class="$style.photo" :data-body="!!hasBody" :data-title="!!hasTitle" :data-subtitle="!!hasSubtitle">
      <AutoSize :x=16 :y=9>
        <img :src="src" :key="src" v-bind="$attrs" :class="$style.image">
      </AutoSize>
    </div>
    <div :class="$style.body" v-if="hasBody">
      <slot>
        <h1 :class="[$style.title]" v-if="hasTitle">
          <slot name="title">
            <FitText style="align-items: flex-end">{{ title }}</FitText>
          </slot>
        </h1>
          
        <h3 :class="$style.subtitle" v-if="hasSubtitle">
          <slot name="subtitle">
            <FitText style="align-items: flex-start">{{ subtitle }}</FitText>
          </slot>
        </h3>
      </slot>
    </div>
  </Slide>
</template>

<style module>
.slide {
  display: flex;
  flex-direction: column;
  padding: var(--slide-padding);
}

.slide.full {
  padding: 0;
}

.image {
  object-fit: cover;
  display: block;
  width: 100%;
}

.photo {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
}

.photo[data-body] {
  height: 60%;
}

.photo[data-title] {
  height: 80%;
}

.photo[data-subtitle] {
  height: 90%;
}

.photo[data-title][data-subtitle] {
  height: 70%;
}

.body {
  flex: 1;
  margin-top: 2kem;
  font-size: var(--slide-font-size);
}

.title {
  font-size: 5kem;
  height: auto;
  flex-basis: 20%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin: 0;
}

.subtitle {
  font-size: 2.3125kem;
  height: auto;
  flex-basis: 9.25%;
  margin-bottom: 0.75%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin: 0;
}
</style>
