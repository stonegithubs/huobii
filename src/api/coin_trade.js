import request from '@/utils/request'
// 币币交易

export function submitTrade(form) {
  return request({
    url: '/api/v1/coin_trade/submit',
    method: 'post',
    data: form
  })
}

// 获取订单列表
export function getOrder(form) {
  return request({
    url: '/api/v1/coin_trade/orders',
    method: 'post',
    data: form
  })
}

// 获取实施成交记录
export function getHistoryTrade(form) {
  return request({
    url: '/api/v1/public/market/history_trade',
    method: 'post',
    data: form
  })
}
