const spawn = require('cross-spawn')

exports.parseFrontmatter = content => {
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

exports.createEntryFileContent = ({
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