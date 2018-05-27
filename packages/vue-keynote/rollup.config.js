import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace'
import vue from 'rollup-plugin-vue'

process.env.NODE_ENV = 'production'

export default {
  input: './index.browser.js',
  output: {
    dir: './dist',
    format: 'iife',
    name: 'Keynote',
    file: 'dist/keynote.js',
    globals: {
      vue: 'Vue'
    }
  },
  plugins: [
    resolve(),
    commonjs(),
    replace({ 'process.env.NODE_ENV': '"production"' }),
    vue()
  ],
  external: ['vue']
}
