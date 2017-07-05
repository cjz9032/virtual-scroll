import Vue from 'vue'
import App from './App'
import router from './router'

// 注册为全局组件
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

