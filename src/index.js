import Vue from 'vue'
import Keynote from './keynote.vue'

import store from '@state/store'
import router from './router'

/**
 * Create a keynote presentation application.
 *
 * @param {import('vue/types').ComponentOptions} Presentation
 * @returns {Vue}
 */
export default function createKeynote(Presentation) {
  const LocalComponent = {
    ...Presentation,
    components: {
      ...Presentation.components,
      Keynote
    }
  }

  return new Vue({
    el: '#app',
    props: {
      aspectRatio: {
        type: String,
        default: '16x9',
        validate(value) {
          return ['16x9', '4x3', 'auto'].includes(value)
        }
      }
    },
    render: createElement => createElement(LocalComponent),
    store,
    router
  })
}
