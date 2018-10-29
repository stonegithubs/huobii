import request from '@/utils/request'

//拉取全部虚拟货币信息
export function CoinBalanceBoth() {
  return request({
    url: '/api/v1/wallet/coin/balance/both',
    method: 'post',
  })
}