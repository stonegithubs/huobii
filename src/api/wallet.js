import request from '@/utils/request'

// 拉取全部虚拟货币信息
export function CoinBalanceBoth() {
  return request({
    url: '/api/v1/wallet/coin/balance/both',
    method: 'post'
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
