const highlight = require('./highlight')
const highlightLines = require('./highlightLines')
const preWrapper = require('./preWrapper')
const lineNumbers = require('./lineNumbers')
const component = require('./component')
const hoistScriptStyle = require('./hoist')
const convertRouterLink = require('./link')
const containers = require('./containers')
const emoji = require('markdown-it-emoji')

module.exports = ({
  markdown = {}
} = {}) => {

  const md = require('markdown-it')({
      html: true,
      highlight
    })
    // custom plugins
    .use(component)
    .use(highlightLines)
    .use(preWrapper)
    .use(hoistScriptStyle)
    .use(containers)

    // 3rd party plugins
    .use(emoji)

  // apply user config
  if (markdown.config) {
    markdown.config(md)
  }

  if (markdown.lineNumbers) {
    md.use(lineNumbers)
  }

  // override render to allow custom plugins return data
  const render = md.render
  md.render = (...args) => {
    md.__data = {}
    const html = render.call(md, ...args)
    return {
      html,
      data: md.__data
    }
  }

  return md
}