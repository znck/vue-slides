export const namespaced = true

export const state = () => ({
  slides: [],
  activeSlideIndex: 0,
  previousSlideIndex: -1
})

export const getters = {
  getSlideAtIndex(state) {
    return index => {
      if (index >= state.slides.length || index < 0) return null
      return state.slides[index]
    }
  },
  activeSlide(state, { getSlideAtIndex }) {
    return getSlideAtIndex(Math.max(0, state.activeSlideIndex))
  },
  previousSlide(state, { getSlideAtIndex }) {
    return getSlideAtIndex(state.previousSlideIndex)
  },
  isAfterLastSlide(state, { activeSlide, previousSlide }) {
    return activeSlide === null && previousSlide !== null
  },
  transitionType(state) {
    if (state.previousSlideIndex + 1 === state.activeSlideIndex) {
      return 'forward'
    }
    if (state.activeSlideIndex + 1 === state.previousSlideIndex) {
      return 'reverse'
    }
    if (state.previousSlideIndex < state.activeSlideIndex) {
      return 'forward jump'
    }
    if (state.previousSlideIndex > state.activeSlideIndex) {
      return 'backward jump'
    }
  },
  numberOfSlides(state) {
    return state.slides.length
  }
}

const SET_SLIDES = 'setSlides'
const SET_SLIDE_AT_INDEX = 'setSlideAtIndex'
const SET_STEPS_FOR_SLIDE_AT_INDEX = 'setStepsForSlideAtIndex'
const SET_ACTIVE_SLIDE_INDEX = 'setActiveSlideIndex'

export const mutations = {
  [SET_SLIDES](state, slides) {
    state.slides = slides
  },
  [SET_SLIDE_AT_INDEX](state, { index, slide }) {
    if (slide === null) {
      if (index + 1 === state.slides.length) state.slides.pop()
    }

    if (state.slides.length > index) state.slides.splice(index, 1, slide)
    else state.slides.push(slide)
  },
  [SET_STEPS_FOR_SLIDE_AT_INDEX](state, { index, steps }) {
    state.slides[index].steps = steps
  },
  [SET_ACTIVE_SLIDE_INDEX](state, { index }) {
    state.previousSlideIndex = state.activeSlideIndex
    state.activeSlideIndex = index
  }
}

export const actions = {
  prepareSlides({ state, commit }, vnodes) {
    if (!Array.isArray(vnodes)) return

    if (vnodes.length < state.slides.length) {
      const n = state.slides.length
      for (let index = vnodes.length; index < n; index++) {
        commit(SET_SLIDE_AT_INDEX, { index, slide: null })
      }
    }

    return vnodes.map((vnode, index) => {
      const oldSlide = state.slides[index]

      if (oldSlide) {
        if (oldSlide.meta.vnode === vnode) return oldSlide
      }

      const data = vnode.asyncMeta ? vnode.asyncMeta.data : vnode.data

      const { animate, ...attrs } = (data && data.attrs) || {}

      if (data) data.attrs = attrs

      const slide = {
        steps: 0,
        meta: Object.freeze({
          vnode,
          component: createComponent(vnode, { animate })
        })
      }

      commit(SET_SLIDE_AT_INDEX, { index, slide })

      return slide
    })
  },
  updateSteps({ commit, getters }, { index, steps }) {
    const slide = getters.getSlideAtIndex(index)

    if (!slide || slide.steps === steps) return

    commit(SET_STEPS_FOR_SLIDE_AT_INDEX, { index, steps })
  },
  next({ state, getters, commit }) {
    if (getters.isAfterLastSlide) return

    commit(SET_ACTIVE_SLIDE_INDEX, {
      index: state.activeSlideIndex + 1
    })

    return getters.activeSlide
  },
  previous({ state, commit }) {
    if (state.activeSlideIndex === 0) return

    commit(SET_ACTIVE_SLIDE_INDEX, {
      index: state.activeSlideIndex - 1
    })

    return getters.activeSlide
  },
  goto({ commit, getters }, index) {
    const slide = getters.getSlideAtIndex(index)

    if (!slide) return

    commit(SET_ACTIVE_SLIDE_INDEX, { index })

    return getters.activeSlide
  }
}

/* HELPERS */
function createComponent(vnode, propsData) {
  return {
    functional: true,
    abstract: true,
    name: 'SlideWrapper',
    props: {
      vnode: {
        default: () => vnode
      }
    },
    render(h, { data, props }) {
      return h(
        'AnimationEngine',
        { ...data, props: { ...props, ...propsData } },
        [props.vnode]
      )
    }
  }
}
