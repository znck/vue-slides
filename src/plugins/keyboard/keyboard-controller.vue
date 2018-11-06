<script>
import screenfull from 'screenfull'
import { init, teardown, on, addScope, removeScope } from './keyboard'

export default {
  data() {
    return {
      show: false,
      info: []
    }
  },
  mounted() {
    init({ meta: this.info })
    on({
      key: '?',
      shortcut: '?',
      desc: 'Show keyboard controls',
      scope: 'global',
      handler: () => {
        addScope('shortcuts')
        this.show = true
      }
    })
    on({
      key: 'Escape',
      shortcut: 'Esc',
      desc: 'Hide keyboard controls',
      scope: 'global',
      handler: event => {
        if (this.show) {
          this.show = false
          removeScope('shortcuts')
          event.preventDefault()
        }

        if (screenfull.enabled) {
          screenfull.exit()
        }
      }
    })
    on({
      key: 'f',
      shortcut: 'f',
      desc: 'Fullscreen',
      scope: 'global',
      handler: () => {
        if (screenfull.enabled) {
          screenfull.request()
        }
      }
    })
  },
  beforeDestroy() {
    teardown()
  }
}
</script>

<template>
  <div v-if="show" class="wrapper">
    <div class="shortcuts">
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in info" :key="item.shortcut">
            <td>{{ item.shortcut }}</td>
            <td>{{ item.desc }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.shortcuts {
  background: white;
  border: 1px solid gray;
  border-radius: 5px;
}
</style>
