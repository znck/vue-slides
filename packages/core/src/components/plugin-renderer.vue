<script>
import { pluginsComputed } from '@keynote/state'

const plugins = {
  progress: () => import('@keynote/plugin-progress'),
  keyboard: () => import('@keynote/plugin-keyboard'),
  touch: () => import('@keynote/plugin-touch')
}

async function importPlugin(name) {
  function normalize(module) {
    return module.__esModule ? module.default : module
  }

  return normalize(
    name in plugins
      ? await plugins[name]()
      : await import(/* webpackPrefetch: true */ /* webpackMode: "lazy" */ `keynote-plugin-${name}`)
  )
}

const RE = /"[^"]+"|'[^']'|url\([^)]\)|(\d*\.?\d+)kem/g

export default {
  props: {
    name: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      component: null
    }
  },
  computed: {
    ...pluginsComputed,
    options() {
      return this.findPluginOptions(this.name, this.target)
    }
  },
  async created() {
    const plugin = await importPlugin(this.name)
    if (plugin && plugin.entry) this.component = plugin.entry[this.target]
  },
  methods: {
    transform(args) {
      const position = { ...args }
      for (const key in position) {
        if (typeof position[key] === 'string') {
          position[key] = position[key].replace(RE, (all, kem) => {
            if (kem !== undefined) return `calc(${kem} * var(--kem))`

            return all
          })
        }
      }

      return position
    }
  }
}
</script>

<template>
  <component v-if="component" :is="component" v-bind="options" />
</template>
