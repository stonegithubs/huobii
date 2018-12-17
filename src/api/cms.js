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

// 获取币种资料
export function getCoinDetail(id) {
  return request({
    url: '/api/v1/public/common/coin_detail',
    method: 'post',
    params: { id }
  })
}

// 客户端下载地址
export function getClientLink() {
  return request({
    url: '/api/v1/public/common/client_dl',
    method: 'post'
  })
}

// 分类下文章获取
export function getArticleByCategoryId(category, page, size) {
  return request({
    url: `/api/v1/public/cms/${category}/articles`,
    method: 'post',
    params: { page, size }
  })
}

// 首页轮播图
export function getBanner(page, size) {
  return request({
    url: '/api/v1/public/cms/banner',
    method: 'post',
    params: { page, size }
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
    params: { page: 0, size: 10 }
  })
}

// 获取对应友情链接
export function cmsLink(category_id) {
  return request({
    url: '/api/v1/public/cms/link',
    method: 'post',
    params: { category: category_id, page: 0, size: 10 }
  })
}

// 获取对应友情链接
export function waterFall(page, size) {
  return request({
    url: '/api/v1/public/cms/waterfall',
    method: 'post',
    params: { page, size }
  })
}

// 获取文章分类
export function articleCategory(page, size) {
  return request({
    url: '/api/v1/public/cms/category',
    method: 'post',
    params: { page, size }
  })
}

// 获取文章列表
export function articles(page, size) {
  return request({
    url: '/api/v1/public/cms/articles',
    method: 'post',
    params: { page, size }
  })
}

// 获取文章详情
export function articleDetail(id) {
  return request({
    url: '/api/v1/public/cms/article',
    method: 'post',
    params: { id }
  })
}
