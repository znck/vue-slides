const path = require('path')
const parseFrontMatter = require('front-matter')
const createMD = require('./markdown')


/** @type {import('markdown-it')} */
let md = null
module.exports = function MarkdownLoader(source) {
  md = md || createMD()
  const loader = Object.create(this)
  const file = this.resourcePath
  const relPath = path.dirname(file)
  const { body: content, attributes } = parse(source)
  const template = `<template>\n<VueSlides>${
    content.split(/<!-- slide(?:.*?)? -->/).map(parse).map(
      ({ body, attributes }) => {
        const { layout = 'Slide', ...props } = attributes
        
        return `<${layout} ${propsToString(props)}>${md.render(body, { loader, relPath, data: attributes })}</${layout}>`
      }
    ).join('\n')
  }</VueSlides>\n</template><script>export default { name: '${attributes.name || 'Presentation'}', data: () => (${JSON.stringify(attributes)}) }</script>`

  return template
}

function parse(content) {
  return parseFrontMatter(content.trim())
}

function propsToString(props) {
  let code = ''

  for (const key in props) {
    const value = props[key]
    const type = typeof value

    if (type === 'string') {
      code += ` ${key}=${JSON.stringify(value)}`
    } else {
      code += ` :${key}=${JSON.stringify(value)}`
    }
  }

  return code.trim()
}
