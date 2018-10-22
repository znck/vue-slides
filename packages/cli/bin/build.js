const {
  createWebpackConfig
} = require('./utils')

module.exports = async ({
  file,
  outDir,
  debug,
  theme = '@keynote/theme-default'
}) => {
  process.env.NODE_ENV = 'production'
  const webpack = require('webpack')
  const config = createWebpackConfig({ file, theme, debug, outDir })

  webpack(config.toConfig()).run(((error, stats) => {
    console.log('Done.')
  }))
}