module.exports = {
  plugins: [
    require('autoprefixer')({}),
    require('./packages/postcss-kem-unit')({})
  ]
}
