import request from '@/utils/request'
//币币交易

export function submitTrade(form) {
  return request({
    url: '/api/v1/coin_trade/submit',
    method: 'post',
    data: form
  })
}
