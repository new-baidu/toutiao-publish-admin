// 基于 axios 封装的请求模块

import axios from 'axios'

// 创建axios实例
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})

// 到处请求方式
export default request
