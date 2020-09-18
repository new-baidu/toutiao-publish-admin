import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入表单验证页面
import Login from '@/views/login/index.vue'
// 引入首页页面
import Home from '@/views/home/index.vue'
import Layout from '@/views/layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: Login,
    component: Login
  },
  {
    path: '/',
    name: Layout,
    component: Layout,
    children: [
      {
        path: '/',
        name: Home,
        component: Home
      }
    ]
  }

]
const router = new VueRouter({
  routes
})

// to：要去的路由信息
// from：来自那里的路由信息
// next放行信息
// 导航守卫
router.beforeEach((to, from, next) => {
  console.log('页面进来了')

  // 页面放行
  next()
})

export default router
