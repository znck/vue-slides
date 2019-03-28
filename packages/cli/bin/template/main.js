/* eslint-disable */
import Vue from 'vue'
import createKeynote from '@keynote/core'
import Presentation from '@keynote-presentation'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

if (__KEYNOTE_LOAD_COMPONENTS__) {
  const requireComponent = require.context(
    `${__CWD__}/components`,
    false,
    /[\w-]+\.vue$/
  )

  requireComponent.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = requireComponent(fileName)
    // Get the PascalCase version of the component name
    const componentName = upperFirst(
      camelCase(
        fileName
          // Remove the "./" from the beginning
          .replace(/^\.\//, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    )
    console.log(componentName)
    // Globally register the component
    Vue.component(componentName, componentConfig.default || componentConfig)
  })
}

const slides = {}

if (__KEYNOTE_LOAD_SLIDES__) {
  const requireComponent = require.context(
    `${__CWD__}/slides`,
    false,
    /[\w-]+\.vue$/
  )

  requireComponent.keys().forEach(fileName => {
    // Get the component config
    const componentConfig = requireComponent(fileName)
    // Get the PascalCase version of the component name
    const componentName = upperFirst(
      camelCase(
        fileName
          // Remove the "./" from the beginning
          .replace(/^\.\//, '')
          // Remove the file extension from the end
          .replace(/\.\w+$/, '')
      )
    )
    // register locally
    slides[componentName] = componentConfig.default || componentConfig
  })
}

const keynote = createKeynote(Presentation, {
  theme: require(__THEME__).default,
  slides
})

if (__ENV__ !== 'production') {
  window.keynote = keynote
}
