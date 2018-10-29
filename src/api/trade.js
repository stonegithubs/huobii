import request from '@/utils/request'

// 查询是否设置交易密码
export  function trade_pwd_exist() {
  return request({
    url: '/api/v1/security/trade_pwd_exist',
    method: 'post',
  })
}