#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')

program.version(require('../package.json').version).usage('<command> [options]')

program
  .command('serve [targetFile]')
  .description('start development server')
  .option(
    '-t, --theme <theme>',
    'use specified theme (default: @vue-slides/theme-vue)'
  )
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
  .action((file = 'presentation.vue', { host, port, theme }) => {
    wrapCommand(require('./serve'))({ file, host, port, theme })
  })

program
  .command('build [targetFile]')
  .description('build as static site')
  .option(
    '-d, --dest <outDir>',
    'specify build output dir (default: .vue-slides/dist)'
  )
  .option(
    '-t, --theme <theme>',
    'use specified theme (default: @vue-slides/theme-default)'
  )
  .option('--debug', 'build in development mode for debugging')
  .action((file = 'presentation.vue', { debug, dest, theme }) => {
    const outDir = dest ? require('path').resolve(dest) : null
    wrapCommand(require('./build'))({ file, debug, outDir, theme })
  })

// output help information on unknown commands
program.arguments('<command>').action(cmd => {
  program.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
})

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(
    `  Run ${chalk.cyan(
      `vue-slides <command> --help`
    )} for detailed usage of given command.`
  )
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function wrapCommand(fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
    })
  }
}
