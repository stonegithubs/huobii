import request from '@/utils/request'

// 修改登陆密码
export  function forget(form) {
  const data = {
      idcode,
      familyName,
      givenName,
      newpwd,
      confirm,
      captcha
  }
  return request({
    url: '/api/v1/user/verify',
    method: 'post',
    data
  })
}
