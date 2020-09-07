import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 加载全局样式文件
import './style/index.less'
// element ui组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 全局注册element ui组件库
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
