import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/api/v1/security/account',
    method: 'post'
  })
}

// 手机号注册
export  function registerByPhone(phone, password, confirm, captcha) {
  const data = {
    phone,password,confirm,captcha
  }
  return request({
    url: '/api/v1/user/registry',
    method: 'post',
    data
  })
}

// 填写邀请码
export function set_rec_code(code) {
  const data={code}
  return request({
    url: '/api/v1/user/registry',
    method: 'post',
    data
  })
}
