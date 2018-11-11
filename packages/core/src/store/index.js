import Vue from 'vue'
import Vuex, { Store } from 'vuex'

import * as modules from './modules'

Vue.use(Vuex)

const store = new Store({
  modules,
  strict: process.env.NODE_ENV !== 'production'
})

for (const name in modules) {
  const vuexModule = modules[name]
  if (vuexModule.actions && 'init' in vuexModule.actions) {
    store.dispatch(`${name}/init`)
  }
}

export default store
