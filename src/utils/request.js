import axios from 'axios'
import { getUserInfoLocal, removeUserInfoLocal } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import store from '../store/index'
import router from '../router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (sessionStorage.Authorization) {
      config.headers = {
        'Authorization': 'Bearer ' + sessionStorage.Authorization,
        'locale': localStorage.getItem('locale')
      }
    } else {
      config.headers = {
        'locale': localStorage.getItem('locale')
      }
    }

    return config
  },
  error => {
    Message({
      showClose: true,
      message: error && error.data.error.message,
      type: 'error'
    })
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response.data,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  res => {
    // const res = response.data
    // // console.log(response)
    // if (res.code === '200') {
    //   return res
    // }
    if (!res) {
      console.log('接口未返回')
      return Promise.reject(res.data)
    }
    // return res
    if (res.data && res.data.code !== '200') {
      // console.log(res)
      Message({
        showClose: true,
        message: res.data.message,
        type: 'error'
      })
      return Promise.reject(res.data)
    }
    return res.data
  },
  error => {
    // 没有token去登陆页面 todo这边验证码解决后需要去掉
    // if (error.response.data.code === '401') {
    //   sessionStorage.removeItem('Authorization')
    //   store.commit('SET_USERINFO', null)
    //   store.commit('SET_TOKEN', null)
    //   store.commit('SET_VERIFYINFO', null)
    //   sessionStorage.clear()
    //   router.push('/login')
    //   return Promise.reject(error)
    // }

    // 有token
    const res = error.response
    // console.log(res)

    if (res && res.data.code === '403') {
      Message({
        showClose: true,
        message: res.statusText + res.data.message,
        type: 'error'
      })
      return Promise.reject(res)
    }
    // if (res.data.code === '401') {

    // }

    if (res && res.code === '404') {
      router.push({ name: '404' })
      return Promise.reject(res)
    }

    // console.log('err' + error) // for debug
    // if (error.data.code == "401") {
    //   Message({ message: (error.message + '401'), type: 'error', duration: 5 * 1000 })
    //   this.$router.push({ name: 'login' })
    // }

    // if (error.code === "500") {
    //   Message({ message: res.message + 500, type: 'error', duration: 5 * 1000 })
    //   // location.reload()
    // }

    // if (error.code === "403") {
    //   MessageBox.confirm('You have been logged out, you can click Cancel to stay on the page, or log in again.', 'Logout Confirm', {
    //     confirmButtonText: 'Login again',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('LogOut').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    // }
    // if (error.code === "429") {
    //   Message({ message: error.message + 429, type: 'error', duration: 5 * 1000 })
    // }
    // // Message({
    // //   message: error.message,
    // //   type: 'error',
    // //   duration: 5 * 1000
    // // });
    // return Promise.reject(error)
    // return Promise.reject(res)
  }
)

export default service
