import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入表单验证页面
import Login from '../views/login/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login }
  ]
})
