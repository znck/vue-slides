<script>
export default {
  name: 'ErrorBoundry',

  functional: true,

  errorCaptured() {
    return true
  },

  render(_, { slots }) {
    return slots().default
  },

  renderError(h, err) {
    console.log(err)

    return h('pre', { style: { color: 'red' } }, err.stack)
  }
}
</script>
