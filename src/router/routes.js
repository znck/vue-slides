/** @type {import("vue-router/types/router").RouteConfig[]} */
export default [
  {
    path: '/',
    name: 'presentation',
    component: () => import('@views/presentation.vue')
  },
  {
    path: '/presenter',
    name: 'presenter',
    component: () => import('@views/presenter.vue')
  }
]
