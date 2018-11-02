import request from '@/utils/request'
import qs from 'qs'

// 获取支持的支付方式
export function getPayway(data) {
  return request({
    url: '/api/v1/public/common/payway',
    method: 'post',
    data
  })
}
