import * as pluginModule from './plugin'

describe('@state/modules/plugin', () => {
  it('exports a valid Vuex module', () => {
    expect(pluginModule).toBeAVuexModule()
  })
})
