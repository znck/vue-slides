import Vue from 'vue'

import { ACTIVATE_PLUGIN, CONFIGURE_PLUGIN } from '@keynote/state'

export const namespaced = true

export const state = () => ({
  active: [],
  options: {}
})

export const mutations = {
  [ACTIVATE_PLUGIN](state, name) {
    if (state.active.indexOf(name) < 0) state.active.push(name)
  },
  [CONFIGURE_PLUGIN](state, { name, ...options }) {
    const newOptions = { $default: {} }
    for (const key in options) {
      if (key.startsWith('$')) newOptions[key] = options[key]
      else newOptions.$default[key] = options[key]
    }
    Vue.set(state.options, name, newOptions)
  }
}

export const getters = {
  findPluginOptions(state) {
    return (name, scope) => {
      const options = state.options[name] || {}

      return { ...options.$default, ...options[`$${scope}`] }
    }
  }
}

export const actions = {}
