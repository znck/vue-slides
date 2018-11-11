import Vue from 'vue'

import router from './router'
import store from './store'
import api from './api'

import Keynote from './keynote.vue'

Vue.use(api)

/**
 * Create a keynote presentation application.
 *
 * @param {import('vue/types').ComponentOptions} Presentation
 * @returns {Vue}
 */
export default function createKeynote(Presentation, { theme = {} } = {}) {
  const LocalComponent = {
    ...Presentation,
    components: {
      ...Presentation.components,
      Keynote
    }
  }

  if (theme.slides) {
    for (const name in theme.slides) {
      Vue.component(name, theme.slides[name])
    }
  }

  const presentation = new Vue({
    el: '#app',
    render: createElement => createElement(LocalComponent),
    store,
    router
  })

  if (theme && theme.install) Vue.use(theme, { presentation, router, store })

  return presentation
}
