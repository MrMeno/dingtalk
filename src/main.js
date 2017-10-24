// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {createRouter} from './router'
import Element from 'element-ui'
import axios from 'axios'
import {createStore} from './store'


Vue.config.productionTip = false;
const router=createRouter();
const store=createStore();
Vue.use(Element)
Vue.prototype.$http = axios;
Vue.prototype.$device =DingTalkPC.device;//挂载客户端api
Vue.prototype.$biz =DingTalkPC.biz;

  router.beforeEach((to, from, next) => {
    var url=to.path;
         store.commit('SET_URL',url);        
         next()
       });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
