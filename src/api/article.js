// 文章相关请求
import request from '@/utils/request'

// 获取文章列表
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    // Body 参数使用   Data 设置
    // Query 参数使用  Params 设置
    // Heardes 参数使用  heardes 设置
    params
  })
}
// 获取文章频道
export const getArtiCleChannels = () => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels'
  })
}
