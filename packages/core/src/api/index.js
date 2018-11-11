export default function install(Vue) {
  const components = ['auto-size', 'fit-text']
  
  components.map(name => Vue.component(
    name.replace(/^[a-z]|-[a-z]/g, m => m.toUpperCase().replace('-', '')),
    () => import(/* webpackPrefetch: true */`./${name}.vue`))
  )
}
