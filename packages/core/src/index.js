import Vue from 'vue'

import router from './router'
import store from './store'
import api from './api'

import VueSlides from './vue-slides.vue'

Vue.use(api)

/**
 * Create a vue-slides presentation application.
 *
 * @param {import('vue/types').ComponentOptions} Presentation
 * @returns {Vue}
 */
export default function createKeynote(Presentation, { theme = {}, slides } = {}) {
  const components = {
    ...theme.slides,
    ...slides,
    VueSlides
  }
  
  for (const name in components) {
    Vue.component(name, components[name])
  }

  const presentation = new Vue({
    name: 'KeynoteApp',
    el: '#app',
    render: createElement => createElement(Presentation),
    store,
    router
  })

  if (theme && theme.install) Vue.use(theme, { presentation, router, store })

  return presentation
}
