<script>
export default {
  name: 'Function',
  functional: true,
  props: {
    fn: { type: Function, required: true }
  },
  render: (h, { data, listeners, props }) => {
    const vnode = props.fn(h)

    vnode.data = vnode.data || {}
    if (vnode) {
      let target
      if (vnode.componentOptions) {
        target = vnode.componentOptions.listeners =
          vnode.componentOptions.listeners || {}
      } else {
        target = vnode.data.on = vnode.data.on || {}
      }

      Object.keys(listeners).forEach(name => {
        const listener = listeners[name]

        if (name in target) {
          if (Array.isArray(target[name])) target[name].push(listener)
          else target[name] = [target[name], listener]
        } else {
          target[name] = listener
        }
      })

      if (data.attrs) {
        if (vnode.componentOptions) {
          vnode.componentOptions.propsData = {
            ...data.attrs,
            ...vnode.componentOptions.propsData
          }
        } else {
          vnode.data.attrs = {
            ...data.attrs,
            ...vnode.data.attrs
          }
        }
      }
    }
    vnode.key = data.key || vnode.key

    return vnode
  }
}
</script>
