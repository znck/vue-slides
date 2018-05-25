import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import VuePlugin from 'rollup-plugin-vue'

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
    VuePlugin()
  ],
  external: ['vue']
}
