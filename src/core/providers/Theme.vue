<script>
export default {
  name: 'ThemeProvider',
  provide() {
    return { theme: {} }
  },
  render() {
    return this.$slots.default[0]
  }
}
</script>
