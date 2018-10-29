import axios from 'axios'
import { getUserInfoLocal, removeUserInfoLocal } from '@/utils/auth'
import { Message, MessageBox } from 'element-ui'
import store from '../store/index'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})



// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    config.headers = {
      'Authorization': 'Bearer '+sessionStorage.Authorization || '',
      // 'Content-Type': 'application/json',
      // 'Content-type': 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
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
  response => {
    const res = response.data
    // console.log(response)
    if (res.code === "200") {
      return res;
    }

    if (res.code === "401") {
      Message({ message: res.message, type: 'error', duration: 5 * 1000 })
      this.$router.push({ name: 'login' })
    }

    if (res.code === "500") {
      Message({ message: res.message, type: 'error', duration: 5 * 1000 })
      location.reload()
    }

    if (res.code === "403") {
      MessageBox.confirm('You have been logged out, you can click Cancel to stay on the page, or log in again.', 'Logout Confirm', {
        confirmButtonText: 'Login again',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    }
    if (res.code === "429") {
      Message({ message: res.message, type: 'error', duration: 5 * 1000 })
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
     return Promise.reject(error)
  }
)

export default service
