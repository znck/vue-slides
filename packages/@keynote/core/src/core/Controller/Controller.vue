<template>
<Touch
  @swipeleft="goNext"
  @swiperight="goPrev"
  @tap="stepNext"
  @press="stepPrev"
  @doubletap="() => fullscreen(!isFullscreen)"
>
  <div class="controller"
    @keyup.down="goNext"

    @keyup.space="stepNext"
    @keyup.right="stepNext"
    @click.left="stepNext"

    @keyup.up="goPrev"
    
    @keyup.left="stepPrev"

    @keyup.esc="fullscreen(false)"
    @keyup.70="fullscreen(!isFullscreen)"

    @blur="onBlur"
    @focus="onFocus"
    @keypress="onKeypress"

    tabindex="0" autofocus>
    <slot/>

    <div class="goto" v-if="indexKey > -1">
      {{ indexKey }}
    </div>

    <div class="status" v-if="!isActive">
      <span class="icon-no-keyboard" aria-label="No keyboard controls">
        <svg class="keyboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h480c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM128 180v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm-336 96v-40c0-6.627-5.373-12-12-12H76c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12zm288 0v-40c0-6.627-5.373-12-12-12H172c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h232c6.627 0 12-5.373 12-12zm96 0v-40c0-6.627-5.373-12-12-12h-40c-6.627 0-12 5.373-12 12v40c0 6.627 5.373 12 12 12h40c6.627 0 12-5.373 12-12z"/></svg>
        <svg class="ban" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"/></svg>
      </span>
    </div>
  </div>
</Touch>
</template>

<script>
import Touch from './Touch.vue'
import { throttle } from '../../utils'

function on(element, event, fn, mode) {
  element.addEventListener(event, fn, mode)

  return () => element.removeEventListener(event, fn)
}

export default {
  name: 'Controller',

  data: () => ({
    indexKey: -1,
    isFullscreen: false,
    isActive: false
  }),

  methods: {
    onFullscreenChange() {
      if (document.fullscreenElement) {
        this.isFullscreen = true
      } else {
        this.isFullscreen = false
      }
    },

    fullscreen(go) {
      const element = this.$el
      const requestMethod = go
        ? element.requestFullscreen ||
          element.webkitRequestFullscreen ||
          element.webkitRequestFullScreen ||
          element.mozRequestFullScreen ||
          element.msRequestFullscreen
        : element.exitFullscreen ||
          element.webkitExitFullscreen ||
          element.webkitExitFullScreen ||
          element.mozExitFullScreen ||
          element.msExitFullscreen

      requestMethod && requestMethod.call(element)
    },

    goNext() {
      if (this.isActive) this.next()
    },

    goPrev() {
      if (this.isActive) this.previous()
    },

    stepNext() {
      if (this.isActive) this.step(1)
    },

    stepPrev() {
      if (this.isActive) this.step(-1)
    },

    onBlur() {
      this.isActive = false
    },

    onFocus() {
      setTimeout(() => {
        this.isActive = true
      }, 300)
    },

    onKeypress(e) {
      if (!/^digit/i.test(e.code)) return true

      if (this.indexKey < 0) this.indexKey = Number(e.key)
      else this.indexKey = this.indexKey * 10 + Number(e.key)

      clearTimeout(this.timer)
      this.timer = setTimeout(() => this.go(), 400)
    },

    go() {
      if (this.indexKey > -1) {
        this.goto(this.indexKey)
        this.indexKey = -1
      }
    },

    emit(...args) {
      if (this.isActive) {
        this.$emit(...args)
      }
    },

    next: throttle(function() {
      this.emit('next')
    }),

    previous: throttle(function() {
      this.emit('previous')
    }),

    step: throttle(function(step) {
      this.emit('step', step)
    }),

    goto: throttle(function(index) {
      this.emit('goto', index)
    })
  },

  mounted() {
    this.$on('hook:beforeDestroy', on(
      document,
      'fullscreenchange',
      this.onFullscreenChange
    ))

    this.$nextTick(() => this.$el.focus())
  },

  components: { Touch }
}
</script>

<style>
.controller {
  overflow: hidden;
  outline: none;
}

.controller,
.controller:fullscreen {
  width: 100%;
  height: 100%;
}

.controller > .status {
  border-radius: 4px;
  background: rgba(255, 255, 255, .32);
  padding: 16px;
  position: absolute;
  right: 16px;
  bottom: 16px;
  font-size: 32px;
  line-height: 1;
  opacity: .75;
}

.controller > .status > .icon-no-keyboard {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -.125em;
  width: 1.25em;
}

.controller > .status > .icon-no-keyboard > svg {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  height: 1em;
  vertical-align: -.125em;
}

.controller > .status > .icon-no-keyboard > svg.ban {
  fill: rgba(255, 0, 0, 1);
  transform: scale(1.05);
}
.controller > .status > .icon-no-keyboard > svg.keyboard {
  fill: rgba(0, 0, 0, .72);;
}

.controller > .goto {
  font-face: monospace;
  color: rgba(255, 255, 255, 0.72);
  position: absolute;
  text-align: center;
  width: 100%;
  bottom: 16px;
  font-weight: 800;
  font-size: 54px;
  text-shadow: 0 0 0 rgba(0, 0, 0, .32);
}
</style>
