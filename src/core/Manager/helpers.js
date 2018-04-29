function typeofvnode(type) {
  return vnode => {
    try {
      try {
        if (type.test(vnode.componentOptions.Ctor.extendOptions.keynote)) {
          console.log()
          return true
        }
      } catch (e) {
        // - Ignore and test tag.
      }

      return type.test(vnode.componentOptions.tag)
    } catch (e) {
      return false
    }
  }
}

export const isSlide = typeofvnode(/^slide$/i)
export const isTransition = typeofvnode(/^transition$/i)
export const isBuild = typeofvnode(/^build$/i)
export const isTruthy = it => !!it
export const isComponent = any => any && !!any.tag

export class Graph {
  constructor() {
    this.vertices = []
    this.edges = {}
  }

  addVertex(vertex) {
    this.vertices.push(vertex)
    this.edges[vertex] = new Set()
  }

  addEdge(a, b) {
    this.edges[a].add(b)
  }

  topologicalSortedVertices() {
    const visited = new Set()
    const vertices = []
    const util = vertex => {
      visited.add(vertex)

      if (this.edges[vertex]) {
        this.edges[vertex].forEach(other => {
          if (!visited.has(other)) util(other)
        })
      }

      vertices.push(vertex)
    }

    this.vertices.forEach(vertex => visited.has(vertex) || util(vertex))

    return vertices
  }
}

export function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory
}

export function findBuildVnodes(vnode) {
  const result = []

  if (!vnode || !vnode.componentOptions) return []

  if (vnode.componentOptions.children) {
    vnode.componentOptions.children.map(it =>
      result.push(...findBuildVnodes(it))
    )
  }

  if (isBuild(vnode)) result.push(vnode)

  return result
}

export function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i++) {
      const c = children[i]
      if (c && (c.componentOptions || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

export function getRealChild(vnode) {
  if (vnode && vnode._vnode) vnode = vnode._vnode
  const compOptions = vnode && vnode.componentOptions
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

export function prepareSlides(h, vnodes) {
  let index = 0
  const slides = vnodes.map((it, itIndex) => {
    if (isComponent(it)) {
      it.key = `wrapper:${itIndex}`

      const attrs = (it.data && it.data.attrs) || {}
      const builds = findBuildVnodes(it)
      const graph = new Graph()
      const buildsByName = {}

      builds.forEach((build, index) => {
        const instance = build.componentOptions.propsData || {}
        const name = instance.name || `build-${index}`
        if (instance.name) {
          instance.name = name
        }

        instance.context = 'slide:' + itIndex
        graph.addVertex(name)
        buildsByName[name] = build

        build.componentOptions.propsData = instance
      })

      builds.forEach(build => {
        const instance = build.componentOptions.propsData
        if (instance.with) graph.addEdge(instance.name, instance.with)
        if (instance.after) graph.addEdge(instance.name, instance.after)
      })

      let id = 0
      const buildIds = {}

      graph.topologicalSortedVertices().forEach(name => {
        const build = buildsByName[name]
        const instance = build.componentOptions.propsData

        if (instance.with) {
          instance.step = buildIds[instance.with]
        } else if (instance.after) {
          instance.step = buildIds[instance.after]
        } else {
          instance.step = buildIds[instance.name] = id++
        }
      })

      const transition = { component: 'transition-noop' }

      if (attrs.transition) {
        transition.component = 'transition-' + attrs.transition
      }

      Object.keys(attrs)
        .filter(key => key.startsWith('transition'))
        .forEach(key => {
          const localKey = key.replace(/^transition-?/i, '')

          if (localKey) transition[localKey] = attrs[key]

          delete attrs[key]
        })

      return {
        index: index++,
        vnode: it,
        steps: id,
        transition: Object.freeze(transition)
      }
    }
  })

  return slides.filter(isTruthy)
}
