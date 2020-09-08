import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入表单验证页面
import Login from '@/views/login/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  }
]
export default new VueRouter({
  routes
})
