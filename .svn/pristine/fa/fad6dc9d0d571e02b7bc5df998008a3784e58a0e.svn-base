// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {createRouter} from './router/index.js'
import Element from 'element-ui'
import axios from 'axios'


Vue.config.productionTip = false;
const router=createRouter();
Vue.use(Element)
Vue.prototype.$http = axios;
Vue.prototype.$device =DingTalkPC.device;//挂载客户端api
Vue.prototype.$biz =DingTalkPC.biz;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
