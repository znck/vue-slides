'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/theme-default.cjs.prod.js')
} else {
  module.exports = require('./dist/theme-default.cjs.js')
}
