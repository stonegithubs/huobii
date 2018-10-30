import { loginByUsername, registerByPhone, logout } from '../../api/login'
import { getVerifyInfo, getUserInfo } from "../../api/user";

const user = {
  state: {
    userInfo: null || JSON.parse(sessionStorage.getItem('userInfo')),
    token: "asasassa" || sessionStorage.getItem('Authorization'),
    verifyInfo: null || JSON.parse(sessionStorage.getItem('verify')),
  },
  mutations: {
    SET_USERINFO: (state, content) => {
      state.userInfo = content
      sessionStorage.setItem('userInfo', JSON.stringify(content))
    },
    SET_TOKEN: (state, token) => {
      state.token = token
      sessionStorage.setItem('Authorization', token)
    },
    SET_VERIFYINFO: (state, content) => {
      state.verifyInfo = content
      sessionStorage.setItem('verify', JSON.stringify(content))
    },
  },
  actions: {
    // 用户名登录
    LoginByUsername({ commit }, formData) {
      return new Promise((resolve, reject) => {
        loginByUsername(formData).then(response => {
          if(response.code === "401"){
            reject(response.message)
          }
          if(response.code === "200") {
            commit('SET_TOKEN',response.content)
            resolve(response.message)
          }
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
          commit('SET_USERINFO', response.content)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },



    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject)=>{
        logout(sessionStorage.getItem("Authorization")).then(response=>{
          resolve(response.message)
        }).catch(err => {
          reject(err)
        })
        commit('SET_USERINFO',null)
        commit('SET_TOKEN',null)
        commit('SET_VERIFYINFO',null)
        sessionStorage.clear()
      })
    },

    //拉取实名认证信息
    GetVerifyInfo({ commit }){
      return new Promise((resolve, reject)=> {
        getVerifyInfo().then(response => {
          commit('SET_VERIFYINFO',response.content)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default user
