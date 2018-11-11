#!/usr/bin/env node
// create package.json, README, etc. for packages that don't have them yet

const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const baseVersion = require('../lerna.json').version

const packagesDir = path.resolve(__dirname, '../packages')
const files = fs.readdirSync(packagesDir)

files.forEach(shortName => {
  if (!fs.statSync(path.join(packagesDir, shortName)).isDirectory()) {
    return
  }

  const name = `@keynote/${shortName}`
  const pkgPath = path.join(packagesDir, shortName, `package.json`)
  if (args.force || !fs.existsSync(pkgPath)) {
    const json = {
      name,
      version: baseVersion,
      description: name,
      main: `src/index.js`,
      repository: {
        type: 'git',
        url: 'git+https://github.com/keynote/keynote.git'
      },
      keywords: ['keynote', 'vue'],
      author: 'Rahul Kadyan',
      license: 'MIT',
      bugs: {
        url: 'https://github.com/keynote/keynote/issues'
      },
      homepage: `https://github.com/keynote/keynote/tree/dev/packages/${shortName}#readme`
    }
    fs.writeFileSync(pkgPath, JSON.stringify(json, null, 2))
  }

  const readmePath = path.join(packagesDir, shortName, `README.md`)
  if (args.force || !fs.existsSync(readmePath)) {
    fs.writeFileSync(readmePath, `# ${name}`)
  }

  const npmIgnorePath = path.join(packagesDir, shortName, `.npmignore`)
  if (args.force || !fs.existsSync(npmIgnorePath)) {
    fs.writeFileSync(npmIgnorePath, '*.unit.js\n')
  }

  const srcDir = path.join(packagesDir, shortName, `src`)
  const indexPath = path.join(packagesDir, shortName, `src/index.js`)
  if (args.force || !fs.existsSync(indexPath)) {
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir)
    }
    fs.writeFileSync(indexPath, ``)
  }
})
