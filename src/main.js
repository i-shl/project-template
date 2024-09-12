import Vue from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import Vant from "vant";
import "vant/lib/index.css";
Vue.use(Vant);

// 封装的loading插件
import loading from "./plugins/loading";
Vue.use(loading);
/* 
axios封装文件中使用
Vue.prototype.$showLoading()
Vue.prototype.$hideLoading()
局部vue文件中使用
this.$showLoading()
this.$hideLoading()
*/

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
