export default {
  id: '@vue-slides/plugin-keyboard',
  name: 'Keyboard',
  entry: {
    global: () => import('./keyboard-controller.vue'),
    presentation: () => import('./register-presentation.vue'),
    presenter: () => import('./register-presentation.vue')
  }
}
