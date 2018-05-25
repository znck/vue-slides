module.exports = function createBaseConfig({
  outDir,
  debug
}) {
  const path = require('path')
  const CSSExtractPlugin = require('mini-css-extract-plugin')
  const {
    VueLoaderPlugin
  } = require('vue-loader')
  const WebpackChain = require('webpack-chain')
  const isProd = process.env.NODE_ENV === 'production'

  const config = new WebpackChain()
  const inlineLimit = 1000000

  config
    .mode(isProd ? 'production' : 'development')
  config.output
    .path(outDir)
    .filename(isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js')
    .publicPath('/')

  if (debug) {
    config.devtool('source-map')
  } else if (!isProd) {
    config.devtool('cheap-module-eval-source-map')
  }

  config.resolve
    .set('symlinks', true)
    .extensions
    .merge(['.js', '.jsx', '.vue', '.json'])
    .end()
    .modules
    .add(path.resolve(__dirname, '../../node_modules'))
    .add(path.resolve(__dirname, '../../../'))
    .add('node_modules')

  config.resolveLoader
    .set('symlinks', true)
    .modules
    .add(path.resolve(__dirname, '../../node_modules'))
    .add(path.resolve(__dirname, '../../../'))
    .add('node_modules')

  config.module
    .noParse(/^(vue)$/)

  const cacheDirectory = path.resolve(__dirname, '../../node_modules/.cache/keynote')
  const cacheIdentifier = JSON.stringify({
    keynote: require('../../package.json').version,
    'cache-loader': require('cache-loader').version,
    'vue-loader': require('vue-loader').version,
    env: process.env.NODE_ENV
  })

  function cached(rule) {
    rule
      .use('cache-loader')
      .loader('cache-loader')
      .options({
        cacheDirectory,
        cacheIdentifier
      })

    return rule
  }

  function vue(rule) {
    rule
      .use('vue-loader')
      .loader('vue-loader')
      .options({
        compilerOptions: {
          preserveWhitespace: false
        },
        cacheDirectory,
        cacheIdentifier
      })
    return rule
  }

  vue(cached(
    config.module.rule('vue').test(/\.vue$/)
  ))

  // vue(cached(
  //   config.module.rule('markdown')
  //     .test(/\.md$/)
  // )).use('markdown-loader')
  //   .loader(require.resolve('./markdownLoader'))

  config.module.rule('images')
    .test(/\.(png|jpe?g|gif)(\?.*)?$/i)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      name: 'assets/img/[name].[hash:8].[ext]'
    })

  config.module.rule('svg')
    .test(/\.(svg)(\?.*)?$/i)
    .use('file-loader')
    .loader('file-loader')
    .options({
      name: 'assets/img/[name].[hash:8].[ext]'
    })

  config.module
    .rule('media')
    .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      name: `assets/media/[name].[hash:8].[ext]`
    })

  config.module
    .rule('fonts')
    .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
    .use('url-loader')
    .loader('url-loader')
    .options({
      limit: inlineLimit,
      name: `assets/fonts/[name].[hash:8].[ext]`
    })

  function createCSSRule(lang, test) {
    const rule = config.module.rule(lang).test(test)

    if (isProd) {
      rule.use('extract-css-loader').loader(CSSExtractPlugin.loader)
    } else {
      rule.use('vue-style-loader').loader('vue-style-loader')
    }

    rule.use('css-loader')
      .loader('css-loader')
      .options({
        importLoaders: 1,
        sourceMap: !isProd
      })

    rule.use('postcss-loader')
      .loader('postcss-loader')
      .options({
        plugins: [require('autoprefixer')],
        sourceMap: !isProd
      })

    return rule
  }

  createCSSRule('css', /\.css$/)
  createCSSRule('postcss', /\.p(ost)?css$/)
  createCSSRule('scss', /\.scss$/).use('sass-loader').loader('sass-loader')
  createCSSRule('sass', /\.sass$/).use('sass-loader').loader('sass-loader').options({
    indentedSyntax: true
  })
  createCSSRule('less', /\.less$/).use('less-loader').loader('less-loader')
  createCSSRule('stylus', /\.styl(us)?$/).use('stylus-loader').loader('stylus-loader').options({
    preferPathResolver: 'webpack'
  })

  config.plugin('vue-loader')
    .use(VueLoaderPlugin)
  
  config.plugin('progress')
    .use(require('progress-bar-webpack-plugin'), [{ summary: false }])

  config.stats(false)

  if (isProd) {
    config.plugin('extract-css')
      .use(CSSExtractPlugin, [{
        filename: 'assets/css/styles.[chunkhash:8].css'
      }])

    config.optimization.splitChunks({
      cacheGroups: {
        styles: {
          name: 'styles',
          // necessary to ensure async chunks are also extracted
          test: m => /css-extract/.test(m.type),
          chunks: 'all',
          enforce: true
        }
      }
    })
  }

  config
    .plugin('html')
    .use(require('html-webpack-plugin'), [{
      template: path.resolve(__dirname, '../app/index.html')
    }])

  return config
}