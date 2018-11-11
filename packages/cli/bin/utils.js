const createConfig = require('./webpack/createConfig')

function createWebpackConfig({ file, theme, debug, outDir }) {
  const path = require('path')

  file = path.resolve(file)
  outDir = outDir || path.resolve(path.dirname(file), 'dist')

  if (path.resolve() === outDir)
    throw Error('Cannot use current directory as out dir.')

  const config = createConfig({ debug, outDir, theme })

  if (/\.vue$/.test(file)) {
    config.entry('keynote').add(
      path.relative(process.cwd(), path.resolve(__dirname, './template/main.js'))
    )

    config.resolve.alias.set('@keynote-presentation', file)
  } else {
    config.entry('keynote').add(path.relative(process.cwd(), file))
  }

  return config
}

module.exports = {
  createWebpackConfig
}
