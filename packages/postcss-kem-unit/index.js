const postcss = require('postcss')
const RE = /"[^"]+"|'[^']'|url\([^)]\)|(\d*\.?\d+)kem/g

module.exports = postcss.plugin('@keynote/postcss-kem-unit', () => {
  return function kem(css) {
    css.walkDecls(decl => {
      decl.value = decl.value.replace(RE, (all, kem) => {
        if (kem !== undefined) return `calc(${kem} * var(--kem))`

        return all
      })
    })
  }
})
