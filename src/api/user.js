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
    url: '/api/v1/public/user/captcha',
    method: 'post',
    data
  })
}

// todo:测试收到验证码 需要删除
export function getCaptcha(phoneNumber) {
  return request({
    url: '/api/v1/public/user/captcha',
    method: 'get',
    params: { phone: phoneNumber }
  })
}

