/**
 * 整个app的路由设置
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [{
    path: '/index',
    component: require('./views/index')
  },
    //   {
    //   name: 'playerDetail',
    //   path: '/playerDetail/:id',
    //   component: require('./views/playerDetail')
    // }
    {
      path: '*', redirect: '/index'
    }]
})

export default router
