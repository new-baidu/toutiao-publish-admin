/*
**素材请求相关模块
*/
import request from '@/utils/request'

// 上传图片素材
export const uploadImage = data => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    // 一般文件上传得接口都要求把请求头中的 Content-Type 设置为 multipart/form-data, 但我们使用 axios 上传文件的话不需要手动设置,你只要给 data 一个对象即可。
    data
  })
}

// 获取素材列表
export const getImage = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/images',
    params
  })
}
