import { loginByUsername, registerByPhone, logout, fastLogin } from '../../api/login'
import { getVerifyInfo, getUserInfo, getPayway } from '../../api/user'
import Vue from 'vue'
const user = {
  state: {
    userInfo: null || JSON.parse(sessionStorage.getItem('userInfo')),
    // token: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhNzU0MzI4My03ZWMyLTQ4YTMtOGU0ZS1lZDcxMmM5YTRlMzUiLCJpc3MiOiJoamJRZjNCMFdyNE5uaTZsYmx0NGlXbmJBTHI0Wkp6TiIsIm5iZiI6MTU0MDkwMDQzNSwiaWF0IjoxNTQwOTAwNDM1LCJleHAiOjE1NDE1MDUyMzUsImp0aSI6ImYwYzA4YWU5M2NmMjRlOGI4MWI0M2NjMWVkMjg3OTIwIiwidXNlciI6eyJ0aWQiOiIyZWYyMGUwY2FkOTM0OTA2OWU0OWI5OWNiNjJmMGQzNSIsInVpZCI6IjdiOTQ1MjcxODI5OTQxZmJiNDI0ZWQyODYxNzZjMWRkIiwicm9sZSI6ImZyb250X3JvbGVfYmFzZSwifX0.j42NoKmntmujucNREuM2S05rcNf20XT1z90DpzO-qcw2VXLGHFPQOHl_90N1dSdaZFyR0d9Zw33D9qx2B9Jim5vRklMFlcJBO6mMjQ-ErpdkJT4NUy6L_-YCkAXl_3J0h1TDk3xzYRFGtA0XizXwvPCugIHAl7hMvEtrAVFoMvM5JxbFORPhn4QcQjDl1fhVDChwhI0XNkHkgr43klbFVGYQ0xrWjWPJrVXKHFYm966F1LY_ZfLK1uxVBLHsV7SbutYRoOb96ZNsoti-bDHfTO28t8PFqDcr8icwB5d-aO-Pd0f9wA3-Kstr_DtbZMtUk6aCb3p-MSlrVF4-_F3-k6boS13Ez7ybUh-jK72knKrfp1Aa2KyarPW5W5TjLxVUd6KDXf7-k2tZCiDdzWyTkDw1pjNCg3sZPsV2u6WquGYQq5LqHj6nUOu-omtFjIkLxCD2SVnLmr3xVMIguci_gsCN3_HwHOBIExPnHMGjbHYw36MDQ4YAEIjKFvTTrj7D0dP_dVJ9QGQBobYMJtDVvH-35ibN8T2lO6gQDryx9a-w-jLaqCzYh_JPlCjBR1czr7EsMT_Lc1su8yITanUWD5Ej0EOJ1J8jyKDB4kFSsN2E6zzgUXKEO8MeOnt9AqbZaSoXcIRS-koWacUV8z1DbvRF3A0WoOMLN8cJ3lQkJtc" || sessionStorage.getItem('Authorization'),
    token: null || sessionStorage.getItem('Authorization'),
    verifyInfo: null || JSON.parse(sessionStorage.getItem('verify')),
    payway: []
  },
  mutations: {
    SET_USERINFO: (state, content) => {
      state.userInfo = content
      sessionStorage.setItem('userInfo', JSON.stringify(content))
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_VERIFYINFO: (state, content) => {
      state.verifyInfo = content
      sessionStorage.setItem('verify', JSON.stringify(content))
    },
    SET_USER_PAYWAY: (state, paylist) => {
      state.payway = paylist
    }
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, formData) {
      return new Promise((resolve, reject) => {
        loginByUsername(formData).then(response => {
          commit('SET_TOKEN', response.content)
          sessionStorage.setItem('Authorization', response.content)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 快速登录
    FastLogin({ commit }, formData) {
      return new Promise((resolve, reject) => {
        fastLogin(formData).then(response => {
          commit('SET_TOKEN', response.content)
          sessionStorage.setItem('Authorization', response.content)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户注册
    Register({ commit }, form) {
      return new Promise((resolve, reject) => {
        registerByPhone(form).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 拉取基础用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          if (response && response.code === '200') {
            commit('SET_USERINFO', response.content)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 拉取用户的支付方式
    GetUserPayway({ commit }) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('page', 1)
        formData.append('size', 200)
        getPayway(formData).then(response => {
          if (response && response.code === '200') {
            commit('SET_USER_PAYWAY', response.content.records)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        // logout(sessionStorage.getItem('Authorization')).then(response => {
        //   resolve(response.message)
        // }).catch(err => {
        //   reject(err)
        // })
        commit('SET_USERINFO', null)
        commit('SET_TOKEN', null)
        commit('SET_VERIFYINFO', null)
        sessionStorage.clear()
        Vue.$router.push({ name: 'login'})
      })
    },

    // 拉取实名认证信息
    GetVerifyInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getVerifyInfo().then(response => {
          if (response && response.code === '200') {
            commit('SET_VERIFYINFO', response.content)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    // getUserPayway: (state)
  }
}

export default user
