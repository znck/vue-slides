<script>
import { slidesMethods, pluginsMethods, pluginsComputed } from '@state/helpers'
import { PluginController } from '@components'

export default {
  inheritAttrs: false,
  provide: ['aspectRatio'],
  computed: {
    ...pluginsComputed
  },
  methods: {
    ...slidesMethods,
    ...pluginsMethods
  },
  created() {
    const keys = ['plugin-keyboard', 'plugin-touch'].concat(
      Object.keys(this.$attrs)
    )

    keys.filter(name => name.startsWith('plugin-')).map(name => {
      const plugin = name.replace(/^plugin-/, '')
      this.activatePlugin(plugin)

      if (this.$attrs[name]) {
        this.configurePlugin({ ...this.$attrs[name], name: plugin })
      }
    })
  },
  mounted() {},
  render(h) {
    this.prepareSlides(this.$slots.default)

    return h('div', { staticClass: 'keynote', attrs: { id: 'keynote' } }, [
      h('router-view', { key: this.$route.fullPath }),
      h(PluginController, {
        props: { target: 'global', plugins: this.activePlugins }
      })
    ])
  }
}
</script>

<style>
html,
body {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.keynote {
  background: black;
  width: 100%;
  height: 100%;
}
</style>
