<script>
import { REGISTER } from './animation-constants'

const DELAY_RE = /^(?<value>\d+)(?<unit>s|ms)$/i
const SPLITTER_RE = /([=+-][^=+-]+)/
const PARSER_RE = /^(?<trigger>[=+-])(?<id>[a-z0-9]+)\.(?<step>[a-z0-9]+)(?:\((?<delay>[^)]+)\))?$/i

function toMS(s) {
  if (!s) return 0

  const result = DELAY_RE.exec(s)

  if (!result) return 0

  const { value, unit } = result.groups
  const m = { s: 1000, ms: 1 }

  return Math.floor(parseFloat(value) * m[unit])
}

export default {
  props: {
    order: {
      type: String,
      default: ''
    }
  },
  provide() {
    return {
      [REGISTER]: this.registerBuildStep
    }
  },
  data() {
    return {
      builds: {},
      index: -1,
      nextIndex: 0,
      runningAnimations: 0,
      autoStartNext: false
    }
  },
  computed: {
    processOrder() {
      return this.order
        .replace(/[\s\n]/g, '') // remove spaces
        .split(SPLITTER_RE) // split steps
        .filter(Boolean) // remove empty
        .map(item => PARSER_RE.exec(item).groups) // parse
        .map(step => ({ ...step, delay: toMS(step.delay) })) // process
    }
  },
  methods: {
    registerBuildStep(id, { buildIn, actions = [], buildOut }, fn) {
      if (id in this.builds) {
        throw new Error(`Duplicate <Build> name in slide`)
      }

      const steps = /** @type {string[]} */ ([])
        .concat(buildIn && `${id}.in`)
        .concat(actions.map((action, index) => `${id}.${index + 1}`))
        .concat(buildOut && `${id}.out`)
        .filter(Boolean)

      this.builds[id] = { steps, fn }
    },
    checkAndTrigger() {
      const queue = []
      for (let i = this.index + 1; i < this.processOrder.length; ++i) {
        const { id, trigger, delay, step } = this.processOrder[i]
        const { fn } = this.builds[id]
        const scheduled = this.schedule(fn, step, delay)

        if (trigger === '=' && this.autoStartNext) {
          queue.push(scheduled)
          this.autoStartNext = false
        } else if (trigger === '+') {
          if (!Array.isArray(queue[queue.length - 1])) queue.push([])

          queue[queue.length - 1].push(scheduled)
        } else if (trigger === '-') {
          queue.push(scheduled)
        } else break
      }

      queue.reduce((chain, fnOrArray) => {
        if (Array.isArray(fnOrArray))
          return chain.then(() => Promise.all(fnOrArray.map(fn => fn())))

        return chain.then(fnOrArray)
      }, Promise.resolve())
    },
    async trigger(fn, step) {
      try {
        this.runningAnimations++
        await fn(step)
      } finally {
        this.runningAnimations--
      }
    },
    schedule(fn, step, delay) {
      return async () => fn(step, delay)
    },
    next() {
      if (this.runningAnimations > 0) {
        this.autoStartNext = true
        this._autoStartTimer = setTimeout(
          () => (this.autoStartNext = false),
          1000
        )
      }

      clearTimeout(this._autoStartTimer)
      this.checkAndTrigger()
      this.autoStartNext = false
    }
  },
  render() {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
</script>
