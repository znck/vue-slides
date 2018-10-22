import * as components from './components'
import * as transitions from './transitions'
import store from './store'
import KeynoteComponent from './Keynote.vue'

let Vue
const themes = {}
const Keynote = {
  install(context) {
    Vue = context

    Vue.mixin({
      beforeCreate() {
        this.$theme = this.$parent ? this.$parent.$theme : themes.default
        this.$store = store

        Object.keys(this.$theme.components).forEach(name => {
          this.$options.components[name] = this.$theme.components[name]
        })
      }
    })

    Vue.component('Keynote', KeynoteComponent)
    ;[]
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
