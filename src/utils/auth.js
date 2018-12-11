export function getUserInfoLocal() {
  return sessionStorage.getItem('UserInfo')
}
export function setUserInfoLocal(userInfo) {
  return sessionStorage.setItem('UserInfo', userInfo)
}

export function removeUserInfoLocal() {
  return sessionStorage.removeItem('UserInfo')
}

export function isAuthed(code) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Function isAuth return true while dev')
    return true
  } else if (code !== 200) {
    return false
  }
  return true
}

