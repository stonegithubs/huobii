import request from '@/utils/request'

// 拉取基础个人信息 ~~~
export function getUserInfo() {
  return request({
    url: '/api/v1/security/account',
    method: 'post'
  })
}

// 提交实名认证
export function normalVerify(data) {
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

// 增加收款信息
export function addPay(data) {
  return request({
    url: '/api/v1/pay/add',
    method: 'post',
    data
  })
}

// 拉去个人收款方式
export function getPayway(data) {
  return request({
    url: '/api/v1/pay/payway',
    method: 'post',
    data
  })
}

// 改变收款方式激活状态
export function changePaymentStatus(data) {
  return request({
    url: '/api/v1/pay/status',
    method: 'post',
    data
  })
}

// 提交高级认证
export function submitAdvanceVerify(data) {
  return request({
    url: 'api/v1/user/verify_advanced',
    method: 'post',
    data
  })
}

// 发送验证码
export function sendCaptcha(data) {
  return request({
    url: '/api/v1/public/user/captcha_t',
    method: 'post',
    data
  })
}

// todo:测试发送验证码 需要删除
export function sendCode(data) {
  return request({
    url: '/api/v1/token/code_t',
    method: 'post',
    data
  })
}
// todo:测试获取验证码 需要删除
export function getCode(country, phone) {
  return request({
    url: '/api/v1/token/code_t',
    method: 'get',
    params: { country: country, phone: phone }
  })
}

// todo:测试收到验证码 需要删除
export function getCaptcha(phoneNumber) {
  return request({
    url: '/api/v1/public/user/captcha_t',
    method: 'get',
    params: { phone: phoneNumber }
  })
}

// TODO:测试验证谷歌验证器 需要删除
export function GoogleAuth(code) {
  return request({
    url: '/api/v1/user/google_auth/auth',
    method: 'get',
    params: { code: code }
  })
}

// 拉取谷歌验证码密钥
export function getGoogleSecret() {
  return request({
    url: '/api/v1/user/google_auth/secret',
    method: 'post'
  })
}

// 绑定谷歌验证码密钥
export function bindGoogleAuth(code) {
  return request({
    url: '/api/v1/user/google_auth/bind',
    method: 'post',
    params: { code: code }
  })
}
