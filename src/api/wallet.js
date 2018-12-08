import request from '@/utils/request'

// 拉取全部虚拟货币信息
export function CoinBalanceBoth() {
  return request({
    url: '/api/v1/wallet/coin/balance/both',
    method: 'post'
  })
}

// 币币转法币
export function coin2currency(coinId ,amount) {
  return request({
    url: '/api/v1/wallet/coin/coin2currency',
    method: 'post',
    params: { coinId ,amount }
  })
}

// 法币转币币
export function currency2coin(coinId ,amount) {
  return request({
    url: '/api/v1/wallet/coin/currency2coin',
    method: 'post',
    params: { coinId ,amount }
  })
}

// 添加提币地址
export function addressAdd(abbr, address, remarks) {
  return request({
    url: '/api/v1/wallet/coin/address/add',
    method: 'post',
    params: { abbr: abbr, address: address, remarks: remarks }
  })
}

// 币币订单查询全部
export function ordersAll(symbol) {
  return request({
    url: '/api/v1/coin_trade/orders_symbol_all',
    method: 'post',
    params: { symbol: symbol }
  })
}

// 币币订单条件查询
export function orders() {
  return request({
    url: '/api/v1/coin_trade/orders_symbol',
    method: 'post',
    // params: { abbr: abbr, address: address, remarks: remarks }
  })
}