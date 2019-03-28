const path = require('path')
const chalk = require('chalk')
const { createWebpackConfig } = require('./utils')

module.exports = async ({ file, host, port, theme = '@vue-slides/theme-vue' }) => {
  const portFinder = require('portfinder')
  const webpack = require('webpack')
  const serve = require('webpack-serve')
  const config = createWebpackConfig({
    file,
    theme,
    outDir: path.resolve(process.cwd(), 'dist')
  })

  const defaultHost = process.platform === 'win32' ? 'localhost' : '0.0.0.0'

  config.mode('development').devtool('inline-source-map')
  config.devServer.hot(true)
  
  portFinder.basePort = port || 8080
  host = host || defaultHost
  port = await portFinder.getPortPromise()

  const displayHost =
    host === defaultHost && process.platform !== 'win32' ? 'localhost' : host

  const webpackConfig = config.toConfig()
  const compiler = webpack(webpackConfig)

  let count = 0
  compiler.hooks.done.tap('vue-slides', error => {
    const time = new Date().toTimeString().match(/^[\d:]+/)[0]
    if (count === 0) {
        console.log(
        `\n  VueSlides dev server listening at ${chalk.cyan(
          `http://${displayHost}:${port}`
        )}\n`
      )
    }
    console.log(
      `  ${chalk.gray(`[${time}]`)} ${chalk.green('✔')} successfully compiled (${++count})`
    )
  })
  compiler.hooks.failed.tap('vue-slides', error => {
    const time = new Date().toTimeString().match(/^[\d:]+/)[0]
    console.log(
      `  ${chalk.gray(`[${time}]`)} ${chalk.red('❌')} compilation failed.`
    )
    console.error(error)
  })

  const nonExistentDir = path.resolve(__dirname, 'non-existent')
  await serve({
    // avoid project cwd from being served. Otherwise if the user has index.html
    // in cwd it would break the server
    content: [nonExistentDir],
    compiler,
    host,
    dev: { logLevel: 'warn' },
    hot: {
      port: port + 1,
      logLevel: 'error'
    },
    logLevel: 'error',
    port
  })
}
