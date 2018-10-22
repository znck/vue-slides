<script>
import { copyVnode } from '../SlideProcessor/helpers.js'

export default {
  functional: true,
  render(h, ctx) {
    const { data, listeners } = ctx
    const slots = ctx.slots()
    if (!slots.default) return

    if (slots.default.length < 1)
      throw Error('VirtualComponent should have exactly on child node.')

    const node = copyVnode(ctx._e(), slots.default.find(node => !!node.tag))
    node.data = ctx._g(node.data, listeners)
    node.data = ctx._g(node.data, data.nativeOn)
    node.data = ctx._b(node.data, node.tag, data.attrs, false, false)
    node.data = ctx._b(
      node.data,
      node.tag,
      { class: data.class || {}, style: data.style || {} },
      false,
      false
    )
    delete slots.default

    const children = ctx.children.filter(
      child => child.data && !!child.data.slot
    )

    if (node.componentOptions && node.componentOptions.children) {
      if (!node.componentOptions._children)
        node.componentOptions._children = node.componentOptions.children
      node.componentOptions.children = []
        .concat(
          node.componentOptions._children || node.componentOptions.children
        )
        .concat(
          children.reduce((acc, child) => {
            if (child.tag === 'template') {
              child.children.forEach(item => {
                if (item.data) item.data.slot = child.slot
                else item.data = { slot: child.slot }

                acc.push(item)
              })
            } else acc.push(child)

            return acc
          }, [])
        )
    } else {
      node.children = [].concat(node.children).concat(children)
    }

    return node
  }
}
</script>
