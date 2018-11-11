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
      key: 'shift+?',
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
      handler: () => {
        if (this.show) {
          this.show = false
          removeScope('shortcuts')
        }
      }
    })
    on({
      key: 'f',
      shortcut: 'F',
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
  <div v-if="show" :class="$style.wrapper">
    <div :class="$style.shortcuts">
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

<style module>
.wrapper {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wrapper:before {
    content: "";
    position: absolute;
    height: 100%; width: 100%;
    background: inherit;
    background-size: cover;
    background-color: rgba(0, 0, 0, 0.54);
    z-index: -1;

    filter: blur(4px);       
}


.shortcuts {
  background: white;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 32px;
}
</style>
