<template>
  <VirtualElement
    @keyup.up="dispatch('prev')"
    @keyup.down="dispatch('next')"

    @keyup.left="dispatch('step.prev')"
    @keyup.right="dispatch('step.next')"
    @keyup.space="dispatch('step.next')"

    @keyup.esc="dispatch('fullscreen')"
    @keyup.70="dispatch('fullscreen')"

    @blur.native="isActive = false"
    @focus.native="isActive = true"
    @keypress="onKeypress($event, dispatch)"

    tabindex="0" 
    autofocus
  >
    <slot />
    <template slot="controls">
      <slot name="controls" />
      <div class="goto" v-if="indexKey > -1" key="keyboard-goto">
        {{ indexKey }}
      </div>

      <div class="status" v-if="!isActive">
        <span class="icon-no-keyboard" aria-label="No keyboard controls">
          <svg class="keyboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"/></svg>
          <svg class="ban" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/></svg>
        </span>
      </div>
    </template>
  </VirtualElement>
</template>

<script>
export default {
  data: () => ({ indexKey: -1, isActive: false }),
  mounted() {
    this.$nextTick(() => this.$el.focus())
  },
  methods: {
    dispatch(name, ...args) {
      this.$store.dispatch('control:' + name, ...args)
    },
    onKeypress(e, dispatch) {
      if (!/^digit/i.test(e.code)) {
        this.indexKey = -1
        clearTimeout(this.timer)

        return true
      }

      if (this.indexKey < 0) this.indexKey = Number(e.key)
      else this.indexKey = this.indexKey * 10 + Number(e.key)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        dispatch('go', this.indexKey)
        this.indexKey = -1
      }, 400)
    }
  }
}
</script>

<style scoped>
.status {
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.32);
  padding: 16px;
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 32px;
  line-height: 1;
  opacity: 0.75;
}

.icon-no-keyboard {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1.25em;
}

svg {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  height: 1em;
  vertical-align: -0.125em;
}

svg.ban {
  fill: rgba(255, 0, 0, 1);
  transform: scale(1.05);
}

svg.keyboard {
  fill: rgba(0, 0, 0, 0.72);
}

.goto {
  font-face: monospace;
  color: rgba(255, 255, 255, 0.72);
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 16px;
  font-weight: 800;
  font-size: 54px;
  text-shadow: 0 0 0 rgba(0, 0, 0, 0.32);
}
</style>
