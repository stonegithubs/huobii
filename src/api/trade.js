import request from '@/utils/request'

// 查询是否设置交易密码
export function trade_pwd_exist() {
  return request({
    url: '/api/v1/security/trade_pwd_exist',
    method: 'post'
  })
}

// 根据用户id查询用户所发的订单
export function userOrders(page, size, userId) {
  return request({
    url: '/api/v1/public/currency_trade/user_orders',
    method: 'post',
    params: { page, size, userId }
  })
}

