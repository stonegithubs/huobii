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

// 获取交易对订单列表
export function getOrderBySymbolName(page, size, direction, symbol, state, start, end, order) {
  return request({
    url: '/api/v1/coin_trade/orders_symbol',
    method: 'post',
    params: { page, size, direction, symbol, state, start, end, order }
  })
}

// 获取交易对的 全部 交易对订单列表
export function getOrderBySymbolNameAll(symbol) {
  return request({
    url: '/api/v1/coin_trade/orders_symbol',
    method: 'post',
    params: { symbol }
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

// 获取实施成交记录
export function submitAppeals(id, reason, type) {
  return request({
    url: '/api/v1/coin_trade/appeal',
    method: 'post',
    params: { id, reason, type }
  })
}

// 获取实施成交记录
export function submitRpeal(id) {
  return request({
    url: '/api/v1/coin_trade/cancel',
    method: 'post',
    params: { id }
  })
}
