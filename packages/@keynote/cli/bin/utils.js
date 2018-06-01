const createConfig = require('./webpack/createConfig')

const parseFrontmatter = content => {
  const matter = require('gray-matter')
  const toml = require('toml')

  return matter(content, {
    excerpt_separator: '<!-- more -->',
    engines: {
      toml: toml.parse.bind(toml),
      excerpt: false
    }
  })
}

const createEntryFileContent = ({
  keynote,
  theme,
  filename
}) => `
import Vue from 'vue'
import Keynote from '${keynote}'
import Theme from '${theme}'

Vue.use(Keynote)
Keynote.use(Theme)

import Presentation from '${filename}'

new Vue(Presentation).$mount('#app')
`

function createWebpackConfig({ file, theme, debug, outDir }) {
  const path = require('path')
  const fs = require('fs')
  file = path.resolve(file)
  outDir = outDir || path.resolve(path.dirname(file), 'dist')
  if (path.resolve() === outDir) throw Error('Cannot use current directory as out dir.')
  const tmp = require('tmp')
  const entry = tmp.fileSync({
    postfix: '.js'
  })
  const paths = [
    __dirname,
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../../core'),
    path.resolve(__dirname, '../../..'),
    path.dirname(file)
  ]
  fs.writeFileSync(entry.fd, createEntryFileContent({
    filename: file,
    keynote: process.env.KEYNOTE_MODULE_PATH || require.resolve('@keynote/core', {
      paths
    }),
    theme: require.resolve(theme, {
      paths
    })
  }))

  const config = createConfig({
    debug,
    outDir
  })
  config.entry('keynote').add('~keynote.js').end()
  config.resolve.alias.set('~keynote.js', entry.name)
  
  return config
}


module.exports = { parseFrontmatter, createEntryFileContent, createWebpackConfig }