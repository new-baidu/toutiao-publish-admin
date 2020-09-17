// 基于 axios 封装的请求模块

import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
request.interceptors.request.use(
  // 任何请求都会经过这里
  // config是当前请求相关的配置信息对象
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))

    // 如果有请求信息统一设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // 然后我们就可以在允许请求出去之前定制统一业务功能处理
    // 统一设置的token
    return config
  },
  // 请求失败经过这里
  function (error) {
    return Promise.reject(error)
  }
)

// 到处请求方式
export default request
