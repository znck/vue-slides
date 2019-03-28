export default {
  id: '@vue-slides/plugin-touch',
  name: 'Touch',
  entry: {
    presentation: () => import('./touch-controller.vue')
  }
}
