/** @type {import("vue-router/types/router").RouteConfig[]} */
export default [
  {
    path: '/',
    name: 'presentation',
    component: () =>
      import(/* webpackPrefetch: true */ './views/presentation.vue')
  },
  {
    path: '/presenter',
    name: 'presenter',
    component: () => import(/* webpackPrefetch: true */ './views/presenter.vue')
  }
]
