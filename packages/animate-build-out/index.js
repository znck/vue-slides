'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/animate-build-out.cjs.prod.js')
} else {
  module.exports = require('./dist/animate-build-out.cjs.js')
}
