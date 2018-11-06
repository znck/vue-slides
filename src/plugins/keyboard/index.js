export default {
  id: '@keynote/plugin-keyboard',
  name: 'Keyboard',
  entry: {
    global: () => import('./keyboard-controller.vue'),
    presentation: () => import('./register-presentation.vue')
  }
}
