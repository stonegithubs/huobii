import request from '@/utils/request'
// let Qs = require('Qs')

// 获取交易品种和计价货币 计价精度
export function getRemoteSymbols() {
  return request({
    url: '/api/v1/public/market/symbols',
    method: 'post'
  })
}

// 通链币火币获取全部symbol的交易行情
export function getRemoteSymbolList() {
  return request({
    url: '/api/v1/public/market/tickers',
    method: 'post',
  })
}

// okcoin提供涨跌幅
export function okcoinTicket() {
  return request({
    url: '/api/v1/public/market/okcoin/ticket',
    method: 'post'
  })
}

// 拉取支持的币种信息
export function getSupportedCoin() {
  return request({
    url: '/api/v1/public/common/coin?page=0&size=2000',
    method: 'post'
  })
}

// 拉取单个symbol当前报价
export function getMarketDetail(symbolName) {
  const form = new FormData()
  form.append('symbol', symbolName)
  return request({
    url: '/api/v1/public/market/detail',
    method: 'post',
    data: form
  })
}

// 拉取单个symbol成交记录（深度）
export function getMarketDepth(form) {
  return request({
    url: '/api/v1/public/market/depth',
    method: 'post',
    data: form
  })
}
