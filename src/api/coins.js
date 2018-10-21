import request from '@/utils/request'


// 获取交易品种和计价货币 计价精度
export function getRemoteSymbols() {
  return request({
    url: '/api/v1/market/symbols',
    method: 'post',
  })
}

// 通链币火币获取全部symbol的交易行情
export function getRemoteSymbolList() {
  return request({
    url: '/api/v1/market/tickers',
    method: 'post',
  })
}
