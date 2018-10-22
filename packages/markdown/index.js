'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/markdown.cjs.prod.js')
} else {
  module.exports = require('./dist/markdown.cjs.js')
}
