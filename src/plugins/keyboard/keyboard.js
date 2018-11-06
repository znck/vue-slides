const keys = new Set()
const config = {
  repeatDelay: 350,
  meta: []
}
const scope = new Set(['global'])
const handlers = {}
const regexHandlers = []

export function addScope(name) {
  scope.add(name)
}

export function removeScope(name) {
  scope.delete(name)
}

export function init(options = {}) {
  Object.assign(config, options)

  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('keyup', handleKeyup)
}

export function teardown() {
  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('keyup', handleKeyup)
}

/**
 * @param {{ scope: 'global' | 'presentation' | 'shortcuts', key: string | RegExp, shortcut: string, desc: string, handler: (event: KeyboardEvent) => void}} handler
 */
export function on({ key, ...meta }) {
  if (typeof key === 'string') {
    handlers[key] = meta
  } else {
    regexHandlers.push({ re: key, ...meta })
  }

  config.meta.push(meta)
}

function fire(listener, event) {
  if (listener && scope.has(listener.scope || 'global')) {
    listener.handler(event)
  }
}

function handleKeydown(event) {
  console.log(event.key, event.code)
  if (keys.has(event.key)) return
  keys.add(event.key)

  fire(handlers[event.key], event)

  regexHandlers.forEach(listener => {
    if (listener.re && listener.re.test && listener.re.test(event.key))
      fire(listener, event)
  })
}

function handleKeyup(event) {
  keys.delete(event.key)
}
