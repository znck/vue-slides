<template>
  <ThemeProvider :name="theme">
    <Manager>
      <slot/>
    </Manager>
  </ThemeProvider>
</template>


<script>
import ThemeProvider from './providers/Theme.vue'
import Manager from './Manager'

export default {
  name: 'Keynote',
  props: ['theme'],
  components: {
    Manager,
    ThemeProvider
  }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  min-height: 100%;
  min-width: 100%;
  height: 100%;
}

* {
  box-sizing: border-box;
}
</style>
