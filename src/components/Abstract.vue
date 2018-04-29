<script>
export default {
  abstract: true,
  functional: true,
  render(_, { slots }) {
    return slots().default
  }
}
</script>
