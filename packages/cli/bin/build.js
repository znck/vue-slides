const { createWebpackConfig } = require('./utils')

module.exports = async ({
  file,
  outDir,
  debug,
  theme = '@vue-slides/theme-vue'
}) => {
  process.env.NODE_ENV = 'production'
  const webpack = require('webpack')
  const config = createWebpackConfig({ file, theme, debug, outDir })

  webpack(config.toConfig()).run(error => {
    if (error) {
      console.error(error)

      return
    }
    console.log('Done.')
  })
}
