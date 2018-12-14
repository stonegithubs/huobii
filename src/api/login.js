import request from '@/utils/request'

// 登录 ~~~
export function loginByUsername(data) {
  return request({
    url: '/api/v1/token/login',
    method: 'post',
    data
  })
}
// 快速登录 ~~~
export function fastLogin(data) {
  return request({
    url: '/api/v1/token/fast_login',
    method: 'post',
    data
  })
}

// 注销  ~~~
export function logout(token) {
  const form = new FormData()
  form.append('token', token)
  return request({
    url: '/api/v1/token/update',
    method: 'post',
    data: form
  })
}

// 手机号注册
export function registerByPhone(data) {
  return request({
    url: '/api/v1/public/user/registry',
    method: 'post',
    data
  })
}

// 填写邀请码
export function set_rec_code(code) {
  const data = { code }
  return request({
    url: '/api/v1/user/registry',
    method: 'post',
    data
  })
}

// 获取邀请码
export function get_rec_code(code) {
  return request({
    url: '/api/v1/user/get_recommend_code',
    method: 'post'
  })
}
