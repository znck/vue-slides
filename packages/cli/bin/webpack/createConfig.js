const path = require('path')
const fs = require('fs')

function getModulePaths() {
  return [path.resolve(process.cwd(), 'node_modules')]
    .concat(module.paths)
    .concat('node_modules')
}

function resolveFirst(packages, paths) {
  for (const pkg of packages) {
    try {
      return require.resolve(pkg, { paths })
    } catch (e) {
      // --
    }
  }

  return packages.shift()
}

module.exports = function createBaseConfig({ outDir, debug, theme }) {
  const CSSExtractPlugin = require('mini-css-extract-plugin')
  const { VueLoaderPlugin } = require('vue-loader')
  const WebpackChain = require('webpack-chain')
  const { DefinePlugin } = require('webpack')
  const isProd = process.env.NODE_ENV === 'production'

  const config = new WebpackChain()
  const inlineLimit = 1000000
  const modulePaths = getModulePaths()

  if (!theme.startsWith('@vue-slides/theme') && !theme.startsWith('vue-slides-theme-')) {
    theme = resolveFirst([theme, `@vue-slides/theme-${theme}`, `vue-slides-theme-${theme}`], modulePaths)
  }

  config.mode(isProd ? 'production' : 'development')
  config.output
    .path(outDir)
    .filename(
      isProd ? 'assets/js/[name].[chunkhash:8].js' : 'assets/js/[name].js'
    )
    .publicPath('/')

  config.context(process.cwd())

  if (debug) {
    config.devtool('source-map')
  } else if (!isProd) {
    config.devtool('cheap-module-eval-source-map')
  }

  config.resolve.extensions.merge(['.js', '.vue', '.json'])
  config.resolve.modules.merge(modulePaths)
  config.resolveLoader.modules.merge(modulePaths)
  config.module.noParse(/^(vue)$/)

  const cacheDirectory = path.resolve(
    process.cwd(),
    'node_modules/.cache/vue-slides'
  )
  const cacheIdentifier = JSON.stringify({
    vue-slides: require('../../package.json').version,
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
          cacheIdentifier,
          transformAssetUrls: {
            TitleBulletsPhotoSlide: ['photo'],
            PhotoHorizontalSlide: ['photo'],
            PhotoVerticalSlide: ['photo'],
            PhotoCaptionSlide: ['photo'],
            Photo2UpSlide: ['left', 'right'],
            Photo3UpSlide: ['first', 'second', 'third'],
            PhotoSlide: ['photo'],
            Photo: ['src']
          }
        })
    return rule
  }

  vue(cached(config.module.rule('vue').test(/\.vue$/)))
  vue(cached(config.module.rule('md').test(/\.(md|slides)$/))).use('markdown-loader').loader(require.resolve('./loaders/markdown/index.js'))

  config.module
    .rule('images')
    .test(/\.(png|jpe?g|gif)(\?.*)?$/i)
    .use('preload-image-loader')
      .loader('preload-image-loader')
      .end()
    .use('url-loader')
      .loader('url-loader')
      .options({
        limit: inlineLimit,
        name: 'assets/img/[name].[hash:8].[ext]'
      })

  config.module
    .rule('svg')
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

    // prettier-ignore
    rule
      .oneOf('module')
        .resourceQuery(/module/)
        .use('vue-style-loader')
          .loader('vue-style-loader')
          .end()
        .use('css-loader')
          .loader('css-loader')
          .options({
            importLoaders: 1,
            sourceMap: !isProd,
            modules: true,
            localIdentName: '[local]_[hash:base64:8]'
          })
          .end()
        .use('postcss-loader')
          .loader('postcss-loader')
          .options({
            plugins: [
              require('autoprefixer'),
              require('@vue-slides/postcss-kem-unit')
            ],
            sourceMap: !isProd
          })
          .end()
        .end()
      .oneOf('default')
        .use('vue-style-loader')
          .loader('vue-style-loader')
          .end()
        .use('css-loader')
          .loader('css-loader')
          .options({
            importLoaders: 1,
            sourceMap: !isProd
          })
          .end()
        .use('postcss-loader')
          .loader('postcss-loader')
          .options({
            plugins: [
              require('autoprefixer'),
              require('@vue-slides/postcss-kem-unit')
            ],
            sourceMap: !isProd
          })
          .end()
        .end()

    return rule
  }

  createCSSRule('css', /\.css$/)
  createCSSRule('postcss', /\.p(ost)?css$/)
  createCSSRule('scss', /\.scss$/)
    .use('sass-loader')
    .loader('sass-loader')
  createCSSRule('sass', /\.sass$/)
    .use('sass-loader')
    .loader('sass-loader')
    .options({
      indentedSyntax: true
    })
  createCSSRule('less', /\.less$/)
    .use('less-loader')
    .loader('less-loader')
  createCSSRule('stylus', /\.styl(us)?$/)
    .use('stylus-loader')
    .loader('stylus-loader')
    .options({
      preferPathResolver: 'webpack'
    })

  config.plugin('vue-loader').use(VueLoaderPlugin)

  config
    .plugin('progress')
    .use(require('progress-bar-webpack-plugin'), [{ summary: false }])

  config.stats(false)

  if (isProd) {
    config.plugin('extract-css').use(CSSExtractPlugin, [
      {
        filename: 'assets/css/styles.[chunkhash:8].css'
      }
    ])

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

  config.plugin('html').use(require('html-webpack-plugin'), [
    {
      template: path.resolve(__dirname, '../template/index.html')
    }
  ])

  function checkExists(name) {
    return fs.existsSync(path.resolve(process.cwd(), name))
  }

  config.plugin('define').use(DefinePlugin, [
    {
      __ENV__: isProd ? '"production"' : '"development"',
      __CWD__: JSON.stringify(process.cwd()),
      __THEME__: JSON.stringify(theme),
      __KEYNOTE_LOAD_COMPONENTS__: JSON.stringify(checkExists('components')),
      __KEYNOTE_LOAD_SLIDES__: JSON.stringify(checkExists('slides'))
    }
  ])

  if (checkExists('vue-slides.config.js')) {
    const userConfig = require(path.resolve(process.cwd(), 'vue-slides.config.js'))

    if (userConfig.webpackChain) {
      return userConfig.webpackChain(config) || config
    }
  }

  return config
}
