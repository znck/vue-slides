import Velocity from 'velocity-animate'
import PropTypes from '@znck/prop-types'
import Transition from './TransitionNoop.vue'

// Transitions:
export const TransitionClothesline = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf('left-to-right', 'right-to-left').value(
      'right-to-left'
    ),
    duration: PropTypes.number.value(500)
  },
  computed: {
    inverse() {
      return this.direction !== 'right-to-left'
    }
  },
  methods: {
    beforeEnter(el) {
      if (this.skipTransition) return
      Velocity(
        el,
        {
          translateX: this.inverse ? '-130%' : '130%',
          rotateZ: this.inverse ? '35deg' : '-35deg'
        },
        { duration: 0 }
      )
    },
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(el, { translateZ: 0 }, { duration: this.duration * 0.2 })
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: ['0%', [250, 30]],
          rotateZ: ['0deg', [500, 60]]
        },
        { duration: this.duration * 0.8, complete: done }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: this.inverse ? '120%' : '-120%',
          rotateZ: this.inverse ? '35deg' : '-35deg'
        },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionDissolve = {
  extends: Transition,
  props: {
    duration: PropTypes.number.value(1000)
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        { opacity: [1, 'easeInSine', 0] },
        { duration: this.duration, complete: done }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        { opacity: [0, 'easeInSine', 1] },
        { duration: this.duration, complete: done }
      )
    }
  }
}

Velocity.Easings.drop = t => {
  if (t < .4) {
    return 1 - 6.25 * t * t
  }
  else if (t < .8) {
    return 0.25 - 6.25 * (t - .6) * (t - .6)
  }
  else {
    return 0.125 - 6.25 * (t - .9) * (t - .9)
  }
}
export const TransitionDrop = {
  extends: Transition,
  props: {
    duration: PropTypes.number.value(1000)
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        { translateY: ['-100%', 'drop', '0%'], translateZ: [0, 0] },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionFall = {
  extends: Transition,
  props: {
    duration: PropTypes.number.value(5000)
  },
  methods: {
    leave(el, done) {
      if (this.skipTransition) return done()
      el.style.zIndex = 1
      el.style.transformStyle = 'preserve-3d'
      el.style.transformOrigin = 'bottom center'
      Velocity(
        el,
        { rotateX: ['-90deg', 'easeInSine', '0deg'] },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionMoveIn = {
  extends: Transition,
  props: {
    bounce: PropTypes.bool.value(true),
    direction: PropTypes.oneOf(
      'left-to-right',
      'right-to-left',
      'top-to-bottom',
      'bottom-to-top'
    ).value('left-to-right'),
    duration: PropTypes.number.value(3500)
  },
  computed: {
    startX() {
      switch (this.direction) {
        case 'top-to-bottom':
          return -180
        case 'bottom-to-top':
          return 180
        default:
          return 0
      }
    },
    endX() {
      return 0
    },
    startY() {
      switch (this.direction) {
        case 'left-to-right':
          return -180
        case 'right-to-left':
          return 180
        default:
          return 0
      }
    },
    endY() {
      return 0
    },
    spring() {
      return this.bounce ? [0.67, -0.87, 0.29, 1.6] : [250, 25]
    }
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        {
          rotateX: [this.endX + 'deg', this.spring, this.startX + 'deg'],
          rotateY: [this.endY + 'deg', this.spring, this.startY + 'deg']
        },
        {
          duration: this.duration,
          complete: () => {
            this.$emit('entered', this)
            done()
          }
        }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        {
          rotateX: [-this.startX + 'deg', this.spring, this.endX + 'deg'],
          rotateY: [-this.startY + 'deg', this.spring, this.endY + 'deg']
        },
        {
          duration: this.duration,
          complete: () => {
            this.$emit('exited', this)
            done()
          }
        }
      )
    }
  }
}

export const TransitionNoop = Transition

export const TransitionPivot = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf(
      'from-top-left',
      'from-top-right',
      'from-bottom-left',
      'from-bottom-right'
    ).value('from-top-left'),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    pivot() {
      return this.direction.replace(/from-/, '').replace('-', ' ')
    },
    from() {
      switch (this.direction) {
        case 'from-top-left':
        case 'from-bottom-right':
          return -90
        case 'from-top-right':
        case 'from-bottom-left':
          return 90
      }
    }
  },
  methods: {
    leave(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        { translateZ: 0 },
        { duration: this.duration, complete: done }
      )
    },
    enter(el, done) {
      if (this.skipTransition) return done()
      el.style.transformOrigin = this.pivot
      Velocity(
        el,
        { rotateZ: ['0deg', 'easeOutSine', this.from + 'deg'] },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionPush = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf(
      'left-to-right',
      'right-to-left',
      'top-to-bottom',
      'bottom-to-top'
    ).value('right-to-left'),
    duration: PropTypes.number.value(500)
  },
  computed: {
    startX() {
      switch (this.direction) {
        case 'left-to-right':
          return -100
        case 'right-to-left':
          return 100
        default:
          return 0
      }
    },
    startY() {
      switch (this.direction) {
        case 'top-to-bottom':
          return -100
        case 'bottom-to-top':
          return 100
        default:
          return 0
      }
    },
    endX() {
      return 0
    },
    endY() {
      return 0
    }
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: [this.endX + '%', 'easeInSine', this.startX + '%'],
          translateY: [this.endY + '%', 'easeInSine', this.startY + '%']
        },
        { duration: this.duration, complete: done }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: [-this.startX + '%', 'easeInSine', this.endX + '%'],
          translateY: [-this.startY + '%', 'easeInSine', this.endY + '%']
        },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionReveal = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf(
      'left-to-right',
      'right-to-left',
      'top-to-bottom',
      'bottom-to-top',
      'top-left-to-bottom-right',
      'top-right-to-bottom-left',
      'bottom-left-to-top-right',
      'bottom-right-to-top-left'
    ).value('left-to-right'),
    duration: PropTypes.number.value(500)
  },
  computed: {
    startX() {
      switch (this.direction) {
        case 'left-to-right':
        case 'top-left-to-bottom-right':
        case 'bottom-left-to-top-right':
          return -100
        case 'right-to-left':
        case 'top-right-to-bottom-left':
        case 'bottom-right-to-top-left':
          return 100
        default:
          return 0
      }
    },
    startY() {
      switch (this.direction) {
        case 'top-to-bottom':
        case 'top-right-to-bottom-left':
        case 'top-left-to-bottom-right':
          return -100
        case 'bottom-to-top':
        case 'bottom-left-to-top-right':
        case 'bottom-right-to-top-left':
          return 100
        default:
          return 0
      }
    },
    endX() {
      return 0
    },
    endY() {
      return 0
    }
  },
  methods: {
    leave(el, done) {
      if (this.skipTransition) return done()
      el.style.zIndex = 1
      Velocity(
        el,
        {
          translateZ: 0,
          translateX: [-this.startX + '%', 'easeInSine', this.endX + '%'],
          translateY: [-this.startY + '%', 'easeInSine', this.endY + '%']
        },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionRevolvingDoor = {
  extends: Transition,
  props: {
    bounce: PropTypes.bool.value(true),
    direction: PropTypes.oneOf('left-to-right', 'right-to-left').value(
      'right-to-left'
    ),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    origin() {
      return this.direction === 'left-to-right' ? 'center right' : 'center left'
    },
    easing() {
      return this.bounce ? [0.38, -0.99, 0.58, -0.15] : 'easeOutSine'
    },
    from() {
      return this.direction === 'left-to-right' ? -90 : 90
    }
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      const transformOrigin = el.style.transformOrigin
      el.style.transformOrigin = this.origin
      Velocity(
        el,
        { rotateY: ['0deg', this.easing, this.from + 'deg'] },
        {
          duration: this.duration,
          complete: () => {
            el.style.transformOrigin = transformOrigin
            done()
          }
        }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      el.style.transformOrigin = this.origin
      el.style.zIndex = 1
      Velocity(
        el,
        { rotateY: [-this.from + 'deg', this.easing, '0deg'] },
        { duration: this.duration, complete: done }
      )
    }
  }
}

export const TransitionScale = {
  extends: Transition,
  props: {
    bounce: PropTypes.bool.value(true),
    direction: PropTypes.oneOf('up', 'down', 'in', 'out').value('up'),
    duration: PropTypes.number.value(1500)
  },
  computed: {
    easing() {
      return this.bounce ? [0.28, -0.39, 0.58, -0.15] : 'easeOutSine'
    }
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      if (this.direction === 'up' || this.direction === 'in') {
        Velocity(
          el,
          { opacity: [1, 0] },
          { duration: this.duration * 0.5, queue: false }
        )
        Velocity(
          el,
          {
            scale: [
              1,
              [0.42, 0.56, 0.58, 1.43],
              this.direction === 'up' ? 0.25 : 2
            ]
          },
          { duration: this.duration, complete: done }
        )
      }
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      if (this.direction === 'up' || this.direction === 'in') {
        el.style.zIndex = 1
        Velocity(
          el,
          { opacity: [0, 1] },
          { duration: this.duration * 0.5, complete: done }
        )
      } else {
        el.style.zIndex = 1
        Velocity(
          el,
          { scale: [this.direction === 'down' ? 0 : 2, this.easing, 1] },
          { duration: this.duration, queue: false }
        )
        Velocity(
          el,
          { opacity: [0, 1] },
          {
            delay: 0.5 * this.duration,
            duration: 0.5 * this.duration,
            complete: done
          }
        )
      }
    }
  }
}

export const TransitionSwap = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf('from-left', 'from-right').value('from-right'),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    unit() {
      return this.direction === 'from-right' ? 80 : -80
    }
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(
        el,
        {
          translateZ: [0, 'easeOutSine', '-400vw'],
          scale: [1, 'easeInSine', 0.25]
        },
        { duration: this.duration, queue: false }
      )
      Velocity(
        el,
        { translateX: [this.unit + '%', 'easeOutSine', '0%'] },
        { duration: this.duration * 0.5 }
      )
      Velocity(
        el,
        { translateX: ['0%', 'easeOutSine', this.unit + '%'] },
        { duration: this.duration * 0.5, complete: done }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      el.style.zIndex = 1
      Velocity(
        el,
        {
          translateZ: ['-400vw', 'easeOutSine', 0],
          scale: [0.25, 'easeInSine', 1]
        },
        { duration: this.duration, queue: false }
      )
      Velocity(
        el,
        { translateX: [-this.unit + '%', 'easeOutSine', '0%'] },
        {
          duration: this.duration * 0.5,
          complete: () => {
            el.style.zIndex = 0
          }
        }
      )
      Velocity(
        el,
        { translateX: ['0%', 'easeOutSine', -this.unit + '%'] },
        { duration: this.duration * 0.5, complete: done }
      )
    }
  }
}

export const TransitionSwitch = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf('left', 'right').value('left'),
    duration: PropTypes.number.value(1000)
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      el.style.transformOrigin =
        this.direction === 'left' ? 'center left' : 'center right'
      Velocity(
        el,
        {
          rotateZ: ['45deg', 'easeInSine', '0deg'],
          translateY: ['50%', 'easeInSine', '0%'],
          translateX: ['10%', 'easeInSine', '0%']
        },
        {
          duration: this.duration / 2,
          complete() {
            el.style.zIndex = 1
          }
        }
      )
      Velocity(
        el,
        {
          rotateZ: ['0deg', 'easeInSine', '45deg'],
          translateY: ['0%', 'easeInSine', '50%'],
          translateX: ['0%', 'easeInSine', '10%']
        },
        {
          duration: this.duration / 2,
          complete: done
        }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      el.style.transformOrigin =
        this.direction === 'left' ? 'center left' : 'center right'
      el.style.zIndex = 1
      Velocity(
        el,
        {
          rotateZ: ['-45deg', 'easeInSine', '0deg'],
          translateY: ['-50%', 'easeInSine', '0%'],
          translateX: ['10%', 'easeInSine', '0%']
        },
        {
          duration: this.duration / 2,
          complete() {
            el.style.zIndex = 0
          }
        }
      )
      Velocity(
        el,
        {
          rotateZ: ['0deg', 'easeInSine', '-45deg'],
          translateY: ['0%', 'easeInSine', '-50%'],
          translateX: ['0%', 'easeInSine', '10%']
        },
        {
          duration: this.duration / 2,
          complete: done
        }
      )
    }
  }
}

export const TransitionTwirl = {
  extends: Transition,
  props: {
    direction: PropTypes.oneOf('clockwise', 'counterclockwise').value(
      'clockwise'
    ),
    duration: PropTypes.number.value(1000)
  },
  computed: {
    unit() {
      return (
        (this.direction === 'clockwise' ? 360 : -360) * (this.duration / 1000)
      )
    }
  },
  methods: {
    enter(el, done) {
      if (this.skipTransition) return done()
      Velocity(el, { scale: 0 }, { duration: 0 })
      Velocity(
        el,
        {
          scale: [1, 'easeOutSine', 0.1],
          rotateZ: [this.unit + 'deg', 'easeOutSine', '0deg']
        },
        {
          duration: this.duration / 2,
          delay: this.duration / 2,
          complete: done
        }
      )
    },
    leave(el, done) {
      if (this.skipTransition) return done()
      el.style.zIndex = 1
      Velocity(
        el,
        {
          scale: [0.1, 'easeOutSine', 1],
          rotateZ: ['0deg', 'easeInSine', -this.unit + 'deg']
        },
        { duration: this.duration / 2, complete: done }
      )
    }
  }
}
