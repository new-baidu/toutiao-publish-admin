import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入表单验证页面
import Login from '@/views/login/'
// 引入首页页面
import Home from '@/views/home/'
import Layout from '@/views/layout/'
import Article from '@/views/article/'
import Publish from '@/views/publish/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: Home
      },
      {
        path: '/article',
        name: 'Article',
        component: Article
      },
      {
        path: '/publish',
        name: 'Publish',
        component: Publish
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
  // 页面放行
  const user = JSON.parse(window.localStorage.getItem('user'))
  // 校验非登录页面的状态
  if (to.path !== '/login') {
    // console.log(user)
    if (user) {
      // 已登录允许通过
      next()
    } else {
      // 没有登录跳转到登陆页面
      next('/login')
    }
  } else {
    // 登陆页面正常允许通过
    next()
  }
})

export default router
