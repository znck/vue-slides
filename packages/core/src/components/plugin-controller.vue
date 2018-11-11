<script>
import PluginRenderer from './plugin-renderer'

export default {
  functional: true,
  props: {
    plugins: {
      type: Array,
      required: true
    },
    target: {
      type: String,
      required: true
    }
  },
  render(h, { props }) {
    return props.plugins.map(name =>
      h(PluginRenderer, { props: { name, target: props.target } })
    )
  }
}
</script>
