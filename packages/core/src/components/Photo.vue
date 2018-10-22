<script>
export default {
  name: 'Photo',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  render(h) {
    new Image().src = this.src

    return h('img', { attrs: { src: this.src } })
  }
}
</script>
