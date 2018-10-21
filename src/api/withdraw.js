import request from '@/utils/request'

// 拉取实名认证信息
export function getLog() {
  return request({
    url: '/api/v1/withdraw/log',
    method: 'post'
  })
}
