#!/usr/bin/env node

const chalk = require('chalk')
const program = require('commander')

program
  .version(require('../package.json').version)
  .usage('<command> [options]')

program
  .command('dev [targetFile]')
  .description('start development server')
  .option('-p, --theme <theme>', 'use specified theme (default: @keynote/theme-default)')
  .option('-p, --port <port>', 'use specified port (default: 8080)')
  .option('-h, --host <host>', 'use specified host (default: 0.0.0.0)')
  .action((file = 'keynote.vue', { host, port, theme }) => {
    wrapCommand(require('./dev'))({ file, host, port, theme })
  })

program
  .command('build [targetFile]')
  .description('build as static site')
  .option('-d, --dest <outDir>', 'specify build output dir (default: .keynote/dist)')
  .option('-p, --theme <theme>', 'use specified theme (default: @keynote/theme-default)')
  .option('--debug', 'build in development mode for debugging')
  .action((file = 'keynote.vue', { debug, dest, theme }) => {
    const outDir = dest ? path.resolve(dest) : null
    wrapCommand(require('./build'))({ file, debug, outDir, theme })
  })

// output help information on unknown commands
program
  .arguments('<command>')
  .action((cmd) => {
    program.outputHelp()
    console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
    console.log()
  })

// add some useful info on help
program.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`keynote <command> --help`)} for detailed usage of given command.`)
  console.log()
})

program.commands.forEach(c => c.on('--help', () => console.log()))

// enhance common error messages
const enhanceErrorMessages = (methodName, log) => {
  program.Command.prototype[methodName] = function (...args) {
    if (methodName === 'unknownOption' && this._allowUnknownOption) {
      return
    }
    this.outputHelp()
    console.log(`  ` + chalk.red(log(...args)))
    console.log()
    process.exit(1)
  }
}

program.parse(process.argv)

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function wrapCommand (fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
    })
  }
}

function wrapCommand (fn) {
  return (...args) => {
    return fn(...args).catch(err => {
      console.error(chalk.red(err.stack))
    })
  }
}
