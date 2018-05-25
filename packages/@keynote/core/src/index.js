import * as core from './core'
import * as components from './components'
import * as transitions from './transitions'

let Vue
const themes = {}
const Keynote = {
  install(context) {
    Vue = context

    Vue.mixin({
      created() {
        this.$theme = this.$parent ? this.$parent.$theme : themes.default

        Object.keys(this.$theme.components).forEach(name => {
          this.$options.components[name] = this.$theme.components[name]
        })
      }
    })
    ;[]
      .concat(Object.entries(core))
      .concat(Object.entries(components))
      .concat(Object.entries(transitions))
      .forEach(([name, component]) => {
        Vue.component(name, component)
      })
  },

  use(installer) {
    if (!Vue) throw Error('Install Keynote first.')

    const name = (installer.name || 'default').toLowerCase()
    themes[name] = {}
    installer({
      slides(components) {
        themes[name].components = components
      }
    })
  }
}

export default Keynote
