import App from './App'
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)
import api from	'@/api/api'

// #ifndef VUE3
import Vue from 'vue'

Vue.prototype.$api = api

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif