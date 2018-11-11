import * as presentationModule from './presentation'

describe('@state/modules/presentation', () => {
  it('exports a valid Vuex module', () => {
    expect(presentationModule).toBeAVuexModule()
  })
})
