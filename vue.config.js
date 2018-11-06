const { resolve } = require('path')

module.exports = {
  configureWebpack: {
    // Set up all the aliases we use in our app.
    resolve: {
      alias: {
        '@keynote': resolve(__dirname, 'src'),
        '@router': resolve(__dirname, 'src/router'),
        '@views': resolve(__dirname, 'src/router/views'),
        '@layouts': resolve(__dirname, 'src/router/layouts'),
        '@components': resolve(__dirname, 'src/components'),
        '@state': resolve(__dirname, 'src/state')
      }
    }
  }
}
