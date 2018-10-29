import request from '@/utils/request'

//拉取基础个人信息 ~~~
export function getUserInfo() {
  return request({
    url: '/api/v1/security/account',
    method: 'post'
  })
}

// 提交实名认证
export  function normalVerify(data) {
  return request({
    url: '/api/v1/user/verify',
    method: 'post',
    data
  })
}

// 拉取实名认证信息 
export function getVerifyInfo() {
  return request({
    url: '/api/v1/user/get_verify',
    method: 'post'
  })
}

