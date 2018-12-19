import request from '@/utils/request'
// 货币交易

// 查询法币商家
export function fbList(page, size, direction, payments, coinId, cashId) {
  return request({
    url: '/api/v1/public/currency_trade/trade_orders',
    method: 'post',
    params: { page, size, direction, payments, coinId, cashId }
  })
}

// 查询 挂单方法币订单列表
export function fbOrders(page, size, direction, coinId, cashId, states, start, end, order) {
  // if (states === '10') {
  //   states = [0, 1, 2, 3, 9]
  // }
  return request({
    url: '/api/v1/currency_trade/orders',
    method: 'post',
    params: {
      page, size, direction, coinId, cashId, states, start, end, order: '1'
    }
  })
}

// 法币 订单详情
export function fbOrderDetail(id) {
  return request({
    url: '/api/v1/currency_trade/order',
    method: 'post',
    params: { id }
  })
}

// 法币 获取对象的收款方式

export function fbGetPayment(id, processId) {
  return request({
    url: '/api/v1/currency_trade/payment',
    method: 'post',
    params: { id, processId }
  })
}

// 法币 接单方查询订单

export function fbJdOrders(page, size, direction, coinId, cashId, states, start, end, order) {
  if (states === '10') {
    states = [0, 1, 3, 9]
  }
  return request({
    url: '/api/v1/currency_trade/trades',
    method: 'post',
    params: { page, size, direction, coinId, cashId, states, start, end, order: '1' }
  })
}

// 法币 接单方确认付款
export function fbConfirm(id, code) {
  return request({
    url: '/api/v1/currency_trade/confirm',
    method: 'post',
    params: { id, code }
  })
}

// 法币 确认收款完成订单

export function fbFinish(id, code) {
  return request({
    url: '/api/v1/currency_trade/finish_trade',
    method: 'post',
    params: { id, code }
  })
}

// 法币 撤销订单
export function fbCancel(id) {
  return request({
    url: '/api/v1/currency_trade/cancel',
    method: 'post',
    params: { id }
  })
}

// 法币 进行交易
export function fbTrade(id, direction, code, amount) {
  return request({
    url: '/api/v1/currency_trade/trade',
    method: 'post',
    params: { id, direction, code, amount }
  })
}

// 法币 接单方查询订单详情
export function order_accept(id) {
  return request({
    url: '/api/v1/currency_trade/order_accept',
    method: 'post',
    params: { id }
  })
}

// 法币 挂单方查询订单详情
export function order_publish(id) {
  return request({
    url: '/api/v1/currency_trade/order_publish',
    method: 'post',
    params: { id }
  })
}

// 法币 发布买卖信息
export function fbSubmit(direction, amount, price, coinId, cashId, min, max, message, expire, payways, type) {
  return request({
    url: '/api/v1/currency_trade/submit',
    method: 'post',
    params: { direction, amount, price, coinId, cashId, min, max, message, expire, payways, type }
  })
}

// 法币 申诉
export function fbAppeal(id, processId, reason, type) {
  return request({
    url: '/api/v1/currency_trade/appeal',
    method: 'post',
    params: { id, processId, reason, type }
  })
}

// -------------------------------------以上为法币接口--------------------------------------
// 币币 发布交易
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

// 币币 撤销订单
export function submitRpeal(id) {
  return request({
    url: '/api/v1/coin_trade/cancel',
    method: 'post',
    params: { id }
  })
}
