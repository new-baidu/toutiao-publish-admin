// 基于 axios 封装的请求模块

import axios from 'axios'
import JSONbig from 'json-bigint'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',

  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话， 那么 JSONbig.parse 调用会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      return JSONbig.parse(data)
    } catch (err) {
      // 如果转换失败则进入这里
      // 把数据原封不动的直接返回给请求使用
      return data
    }
  }]
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
