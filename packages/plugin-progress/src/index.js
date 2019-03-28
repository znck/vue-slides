export default {
  id: '@vue-slides/plugin-progress',
  name: 'Progress',
  entry: {
    presentation: () => import('./progress-bar.vue'),
    presenter: () => import('./time-tracker.vue')
  }
}
