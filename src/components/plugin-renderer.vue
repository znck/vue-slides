<script>
import { pluginsComputed } from '@state/helpers'

async function importPlugin(name) {
  function normalize(module) {
    return module.__esModule ? module.default : module
  }

  try {
    return normalize(await import(`@keynote/plugins/${name}`))
  } catch (e) {
    /* nope */
  }

  try {
    return normalize(await import(`keynote-plugin-${name}`))
  } catch (e) {
    /* nope */
  }

  throw new Error('Cannot find plugin: ' + name)
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
    const component = plugin.entry[this.target]

    if (!component) return

    this.component = component
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
  <component v-if="component" :is="component" v-bind="options.props" />
</template>
