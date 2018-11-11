const keys = []
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
    handlers[key.toLowerCase()] = meta
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

const modifierKeys = ['Meta', 'Alt', 'Shift', 'Control']
/**
 * @param {KeyboardEvent} event
 */
function handleKeydown(event) {
  if (!keys.includes(event.key) && !modifierKeys.includes(event.key))
    keys.push(event.key)

  const modifiers = modifierKeys
    .filter(key => event.getModifierState(key))
    .concat(keys)

  const key = modifiers.join('+').toLowerCase()

  fire(handlers[key], event)

  regexHandlers.forEach(listener => {
    if (listener.re && listener.re.test && listener.re.test(key))
      fire(listener, event)
  })
}

function handleKeyup(event) {
  const index = keys.indexOf(event.key)
  if (index > -1) keys.splice(index, 1)
}
