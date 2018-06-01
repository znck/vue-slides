// Allow trailing.
export const throttle = (fn, threshhold = 250, scope) => {
  let last = null
  let deferTimer
  return function (...args) {
    const context = scope || this

    const now = Date.now()

    if (!last) {
      last = now
      fn.apply(context, args)
    } else if (now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer)
      deferTimer = setTimeout(() => {
        last = null
        fn.apply(context, args)
      }, threshhold)
    } else {
      last = null
      fn.apply(context, args)
    }
  }
}