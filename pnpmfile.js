module.exports = {
  hooks: {
    readPackage
  }
}

function readPackage(pkg, context) {
  addDependency.context = context
  addDependency.pkg = pkg
  if (pkg.name === 'vuepress') {
    addDependency('vue-style-loader')
    addDependency('webpack-hot-client', '^3.0.0')
  }
  return pkg
}

function addDependency(name, version = '*', type = 'dependencies') {
  const old = addDependency.pkg[type][name]
  addDependency.pkg[type][name] = version

  if (old) {
    addDependency.context.log(`'${name}'@${old} => ${name}@${version} in ${type} of ${addDependency.pkg.name}`)
  } else {
    addDependency.context.log(`+ ${name}@${version} in ${type} of ${addDependency.pkg.name}`)
  }
}