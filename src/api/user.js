
import request from '@/utils//request.js'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/authorizations',
    data
  })
}

// 登录信息
export const getUserProfile = () => {
  // 后端要求把需要授权的用户身份放到请求头中
  // const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile'
    // headers: {
    // // // authorization属性名：接口要求的
    // // // 属性值: Bearer空格token数据
    // // // Beaer持票人的意思
    //   authorization: `Bearer ${user.token}`
    // }
  })
}
