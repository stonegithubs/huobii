


export default {

  registry: (phone, pwd1, pwd2,captcha) => {
    return {
      "code": 0,
      "content": "string",
      "message": "注册成功"
    }
  },

  login :(username,pwd) => {
    return {
      "code": 0,
      "content": "string",
      "message": "登陆成功"
    }
  },

  logout: () => {
    return {
      "code": 200,
      "content": "imcontent",
      "message": "注销成功"
    }
  }

}
