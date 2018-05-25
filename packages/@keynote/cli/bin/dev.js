const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const {
  createEntryFileContent
} = require('./utils')
const createConfig = require('./webpack/createConfig')

module.exports = async ({
  file,
  host,
  port,
  theme = '@keynote/theme-default'
}) => {
  file = path.resolve(file)
  theme = require.resolve(theme, {
    paths: [].concat(require.resolve.paths(file)).concat(require.resolve.paths(__filename))
  })

  const config = createConfig({
    outDir: path.resolve(__dirname, '../non-existent')
  })
  const portfinder = require('portfinder')
  const serve = require('webpack-serve')
  const webpack = require('webpack')
  const tmp = require('tmp')

  const entry = tmp.fileSync({
    postfix: '.js'
  })

  fs.writeFileSync(entry.fd, createEntryFileContent({
    keynote: require.resolve('../src'),
    filename: file,
    theme
  }))
  config.entry('keynote').add('~keynote.js').end()
  config.resolve.alias.set('~keynote.js', entry.name)

  const compiler = webpack(config.toConfig())
  const defaultHost = process.platform === 'win32' ? 'localhost' : '0.0.0.0'

  portfinder.basePort = port || 8080
  host = host || defaultHost
  port = await portfinder.getPortPromise()

  const displayHost = host === defaultHost && process.platform !== 'win32' ?
    'localhost' :
    host

  let isFirst = true
  compiler.hooks.done.tap('keynote', () => {
    if (isFirst) {
      isFirst = false
      console.log(
        `\n  Keynote dev server listening at ${
            chalk.cyan(`http://${displayHost}:${port}`)
          }\n`
      )
    } else {
      const time = new Date().toTimeString().match(/^[\d:]+/)[0]
      console.log(`  ${chalk.gray(`[${time}]`)} ${chalk.green('✔')} successfully compiled.`)
    }
  })

  await serve({
    compiler,
    host,
    dev: {
      logLevel: 'warn'
    },
    hot: {
      port: port + 1,
      logLevel: 'error'
    },
    logLevel: 'error',
    port
  })
}