// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'normalize.css'
import '@/assets/reset.less'

Vue.config.productionTip = false

import AV from '@/lib/leancloud/leancloud.js';
Object.defineProperty(Vue.prototype, '$AV', { value: AV });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
