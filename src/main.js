// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import '@/../static/fonts/css/font-awesome.css'
import '@/../static/css/zero.css'
import '@/../static/css/animate.css'
import '@/../static/utf8-php/ueditor.config.js'
import '@/../static/utf8-php/ueditor.all.min.js'
import '@/../static/utf8-php/themes/default/css/ueditor.min.css'

Vue.use(ElementUI)

import axios from 'axios'
Vue.prototype.$http = axios;

Vue.config.productionTip = false;

// 接口域名
Vue.prototype.baseUrl = 'http://localhost:1987/api/';

// Vue.prototype.wsUrl = 'ws://122.114.229.18:9379';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
