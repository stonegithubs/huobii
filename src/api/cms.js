import request from '@/utils/request'

// 公告
export function getNotice() {
  return request({
    url: '/api/v1/cms/notice',
    method: 'post'
  })
}
// APP封面
export function getCover() {
  return request({
    url: '/api/v1/cms/cover',
    method: 'post'
  })
}

// 首页轮播图
export function getBanner() {
  return request({
    url: '/api/v1/cms/banner',
    method: 'post'
  })
}

// 获取用户协议内容
export function getAgreement() {
  return request({
    url: '/api/v1/cms/agreement',
    method: 'post'
  })
}
