#!/usr/bin/env node

const {
  join,
  resolve,
  relative,
  basename
} = require('path')
const {
  existsSync,
  writeFileSync,
  unlinkSync
} = require('fs')
const {
  execSync
} = require('child_process')

const [, , command, arg, ...rest] = process.argv
const dir = process.cwd()
const filename = resolve(dir, arg)

if (!existsSync(filename)) {
  console.log('Cannot find ' + filename) // eslint-disable-line no-console
  process.exit(1)
}

const entry =
  join(
    process.cwd(),
    basename(filename).replace(/\.(vue|js|jsx)$/i, '') +
    '-' +
    Date.now() +
    '.js'
  )

const Keynote = dir.endsWith('keynote') ? resolve(__dirname, '../src/index.js') : require.resolve('vue-keynote')

function exitHandler() {
  if (existsSync(entry)) unlinkSync(entry)
}

process.on('exit', exitHandler)

//catches ctrl+c event
process.on('SIGINT', exitHandler)

// catches "kill pid"
process.on('SIGUSR1', exitHandler)
process.on('SIGUSR2', exitHandler)

//catches uncaught exceptions
process.on('uncaughtException', exitHandler)

try {
  
  writeFileSync(
    entry,
    `
  import Vue from 'vue'
  import Keynote, { DefaultTheme } from '${Keynote}'
  
  Vue.use(Keynote)
  Keynote.use(DefaultTheme)
  
  import Presentation from '${filename}'
  
  new Vue(Presentation).$mount('#app')
  `
  )
  const _entry = relative(process.cwd(), entry)
  const bin = require.resolve('@vue/cli/bin/vue.js')
  execSync([bin, command, ...rest, JSON.stringify(_entry)].join(' '), {
    cwd: process.cwd(),
    stdio: 'inherit'
  })
} catch (e) {
  console.log('Exiting with error: ' + e.message) // eslint-disable-line
}