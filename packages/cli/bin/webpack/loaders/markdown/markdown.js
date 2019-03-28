const componentPlugin = require('./plugins/component')
const Config = require('markdown-it-chain')

/**
 * @returns {import('markdown-it')}
 */
module.exports = () => {
  const config = new Config()

  config
    .options
      .html(true)
      .end()
    .plugin('component')
      .use(componentPlugin)
      .end()
  
  return config.toMd(require('markdown-it'))
}
