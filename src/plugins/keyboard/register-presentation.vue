<script>
import { on, addScope } from './keyboard'
import { presentationMethods } from '@state/helpers'
export default {
  methods: {
    ...presentationMethods
  },
  mounted() {
    addScope('presentation')
    ;['ArrowLeft', 'ArrowUp'].map(key =>
      on({
        scope: 'presentation',
        key,
        shortcut: key,
        desc: 'Goto previous slide',
        handler: event => {
          if (/input|textarea|a|button|select/i.test(event.target.tagName))
            return

          this.previous()
        }
      })
    )
    ;['ArrowRight', 'ArrowDown', 'Space'].map(key =>
      on({
        scope: 'presentation',
        key: key === 'Space' ? ' ' : key,
        shortcut: key,
        desc: 'Goto next slide',
        handler: event => {
          if (/input|textarea|a|button|select/i.test(event.target.tagName))
            return
          this.next()
        }
      })
    )
  },
  render() {
    return null
  }
}
</script>
