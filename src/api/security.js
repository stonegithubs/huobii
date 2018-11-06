import request from '@/utils/request'

// 重置登陆密码
export  function forget(data) {
  return request({
    url: '/api/v1/public/user/forget',
    method: 'post',
    data
  })
}

// 修改登录密码
export  function login_pwd(data) {
  return request({
    url: '/api/v1/security/login_pwd',
    method: 'post',
    data
  })
}

// 修改交易密码
export  function trade_pwd(data) {
  return request({
    url: '/api/v1/security/trade_pwd',
    method: 'post',
    data
  })
}


// 主动冻结账号
export  function freeze(data) {
  return request({
    url: '/api/v1/security/freeze',
    method: 'post',
    data
  })
}




