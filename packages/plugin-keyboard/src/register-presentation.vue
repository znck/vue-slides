<script>
import { on, addScope } from './keyboard'
import { presentationMethods } from '@vue-slides/state'
export default {
  methods: {
    ...presentationMethods,
    handleMessage({ data }) {
      if (data === 'next') this.next()
      else if (data === 'previous') this.previous()
      else if (typeof data === 'number') this.goto(data)
    }
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

          if (this.connection) this.connection.send('previous')
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

          if (this.connection) this.connection.send('next')
          this.next()
        }
      })
    )
    on({
      key: 'p',
      shortcut: 'P',
      desc: 'Toggle presenter view',
      scope: 'presentation',
      handler: async () => {
        if (this.$route.name === 'presenter') {
          this.$router.push({ name: 'presentation' })
          return
        }

        this.$router.push({ name: 'presenter' })
      }
    })
    on({
      key: 'z',
      shortcut: 'Z',
      desc: 'Start presentation',
      scope: 'presentation',
      handler: async () => {
        if (this.connection) {
          this.$router.push({ name: 'presentation' })

          return this.connection.terminate()
        }

        if (window.PresentationRequest) {
          const request = (navigator.presentation.defaultRequest = new window.PresentationRequest(
            ['/', '/presenter']
          ))
          // try {
          //   const availability = await request.getAvailability()

          //   if (!availability.value) alert('Not available')
          // } catch (e) {
          //   // --
          // }
          const connection = (this.connection = await request.start())

          connection.addEventListener('message', this.handleMessage)

          this.$router.push({ name: 'presenter' })
        } else {
          alert(
            'Your browser does not support screen casting. Please use latest version of Chrome.'
          )
        }
      }
    })

    if (
      (((navigator || {}).presentation || {}).receiver || {}).connectionList
    ) {
      navigator.presentation.receiver.connectionList.then(list => {
        list.connections.map(connection => {
          this.connection = connection
          connection.addEventListener('message', this.handleMessage)
        })
        list.addEventListener('connectionavailable', e => {
          this.connection = e.connection
          e.connection.addEventListener('message', this.handleMessage)
        })
      })
    }
  },
  beforeDestroy() {
    if (this.connection) this.connection.terminate()
  },
  render() {
    return null
  }
}
</script>
