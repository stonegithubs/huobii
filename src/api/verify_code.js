import request from '@/utils/request'

// 发送验证码到绑定邮箱
export function sendVerifyCode(data) {
  return request({
    url: '/api/v1/verify_code/mail',
    method: 'post',
    data
  })
}

// 发送绑定邮件
export function bindEmail(data) {
  return request({
    url: '/api/v1/verify_code/bind_mail',
    method: 'post',
    data
  })
}

// 发送解绑邮件
export function unBindEmail(data) {
  return request({
    url: '/api/v1/verify_code/unbind_mail',
    method: 'post',
    data
  })
}

// // 谷歌验证码v2接口
// export function getGoogleVerify(data) {
//   return request({
//     url: '/api/v1/verify_code/unbind_mail',
//     method: 'post',
//     data
//   })
// }
