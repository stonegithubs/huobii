import request from '@/utils/request'

// 公告
export function getNotice() {
  return request({
    url: '/api/v1/public/cms/notice',
    method: 'post'
  })
}
// APP封面
export function getCover() {
  return request({
    url: '/api/v1/public/cms/cover',
    method: 'post'
  })
}

// 首页轮播图
export function getBanner() {
  return request({
    url: '/api/v1/public/cms/banner',
    method: 'post'
  })
}

// 获取用户协议内容
export function getAgreement() {
  return request({
    url: '/api/v1/public/cms/agreement',
    method: 'post'
  })
}

// 获取页脚分类
export function linkCategory() {
  return request({
    url: '/api/v1/public/cms/link/category',
    method: 'post',
    params: { page: 0, size: 4 }
  })
}

// 获取对应友情链接
export function cmsLink(category_id) {
  return request({
    url: '/api/v1/public/cms/link',
    method: 'post',
    params: { category: category_id, page: 0, size: 5 }
  })
}
