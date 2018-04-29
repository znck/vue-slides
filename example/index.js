
import Vue from 'vue'
import Keynote from '../src'
import Theme from '../themes/default'

Vue.use(Keynote)
Keynote.use(Theme)

import Presentation from './Simple.vue'

new Vue(Presentation).$mount('#app')
