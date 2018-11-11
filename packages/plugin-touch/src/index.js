export default {
  id: '@keynote/plugin-touch',
  name: 'Touch',
  entry: {
    presentation: () => import('./touch-controller.vue')
  }
}
