import Vue from 'vue'

export const namespaced = true

export const state = () => ({
  active: [],
  options: {}
})

export const ACTIVATE_PLUGIN = 'ADD'
export const CONFIGURE_PLUGIN = 'CONF'
export const mutations = {
  [ACTIVATE_PLUGIN](state, name) {
    if (state.active.indexOf(name) < 0) state.active.push(name)
  },
  [CONFIGURE_PLUGIN](state, { name, ...options }) {
    Vue.set(state.options, name, options)
  }
}

export const getters = {
  findPluginOptions(state) {
    return (name, scope) => {
      const options = state.options[name] || {}

      return { ...options, ...options[scope] }
    }
  }
}

export const actions = {}
