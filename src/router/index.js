import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入表单验证页面
import Login from '@/views/login/index.vue'
// 引入首页页面
import Layout from '@/views/login/layout.vue'
// 子页面
import Home from '@/views/login/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/layout',
    name: Layout,
    component: Layout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      }
    ]
  }
]
export default new VueRouter({
  routes
})
