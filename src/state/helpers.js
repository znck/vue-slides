import { mapGetters, mapState, mapActions, mapMutations } from 'vuex'
import { ACTIVATE_PLUGIN, CONFIGURE_PLUGIN } from './modules/plugin'

// HELPERS ~ COMPUTED

/** @type {ComputedPresentation} */
// @ts-ignore
export const presentationComputed = {
  ...mapGetters('presentation', [
    'activeSlide',
    'previousSlide',
    'numberOfSlides'
  ]),
  ...mapState('presentation', ['activeSlideIndex', 'previousSlideIndex'])
}

/** @type {MethodsPresentation} */
// @ts-ignore
export const presentationMethods = mapActions('presentation', [
  'next',
  'previous',
  'goto'
])

/** @type {ComputedSlides} */
// @ts-ignore
export const slidesComputed = mapState('presentation', ['slides'])

/** @type {MethodsSlides} */
// @ts-ignore
export const slidesMethods = mapActions('presentation', [
  'prepareSlides',
  'updateSteps'
])

/** @type {ComputedPlugins} */
// @ts-ignore
export const pluginsComputed = {
  ...mapState('plugin', { activePlugins: 'active' }),
  ...mapGetters('plugin', ['findPluginOptions'])
}

/** @type {MethodsPlugins} */
// @ts-ignore
export const pluginsMethods = mapMutations('plugin', {
  activatePlugin: ACTIVATE_PLUGIN,
  configurePlugin: CONFIGURE_PLUGIN
})

// STATE ~ TYPES

/**
 * @typedef {object} Slide
 * @property {number} steps
 * @property {{ vnode: VNode, component: Component }} meta
 */

// COMPUTED ~ TYPES

/**
 * @typedef {object} ComputedPresentation
 * @property {function(): Slide} activeSlide
 * @property {function(): Slide} previousSlide
 * @property {function(): number} activeSlideIndex
 * @property {function(): number} previousSlideIndex
 * @property {function(): number} numberOfSlides
 */

/**
 * @typedef {object} ComputedSlides
 * @property {function(): Slide[]} slides
 */

/**
 * @typedef {object} ComputedPlugins
 * @property {function(): string[]} activePlugins
 * @property {function(name: string): any} findPluginOptions
 */

// METHODS ~ TYPES

/**
 * @typedef {object} MethodsPresentation
 * @property {function(): Promise<Slide>} next
 * @property {function(): Promise<Slide>} previous
 * @property {{(index: number): Promise<Slide>}} goto
 */

/**
 * @typedef {object} MethodsSlides
 * @property {{(vnodes: Array<VNode>): Promise<Slide[]>}} prepareSlides
 * @property {{(payload: { index: number, steps: number }): Promise<void>}} updateSteps
 */

/**
 * @typedef {object} MethodsPlugins
 * @property {{(name: string): Promise<void>}} activatePlugin
 * @property {{({ name: string }): Promise<void>}} configurePlugin
 */

/** @typedef {import('vue/types').VNode} VNode */
/** @typedef {import('vue/types').Component} Component */
