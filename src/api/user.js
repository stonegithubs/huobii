import request from '@/utils/request'


// 提交实名认证
export  function normalVerify(verifyForm) {
  const data = {
    familyName: verifyForm.familyName,
    givenName: verifyForm.givenName,
    idNo: verifyForm.idNo,
    captcha: verifyForm.captcha
  }
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
