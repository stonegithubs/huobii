import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
import { getUserInfoLocal, removeUserInfoLocal } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // Do something before request is sent
    if (localStorage.HB_TOKEN) {
      config.headers['HB_TOKEN'] = getToken()
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
  response => response.data,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  // response => {
  //   const res = response.data
  //   if (res.code !== 200) {
  //     Message({
  //       message: res.message,
  //       type: 'error',
  //       duration: 5 * 1000
  //     })
  //     // 401 未登录  500异常
  //     if (res.code === 401) {
  //       MessageBox.confirm('您还没有登录', '确定登录', {
  //         confirmButtonText: '登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         removeUserInfoLocal()
  //         // store.dispatch('LogOut').then(() => {
  //         location.reload() // 为了重新实例化vue-router对象 避免bug
  //         //   })
  //       })
  //     }
  //     else if (res.code === 500) {
  //       MessageBox.confirm('登陆异常，请您重新登录', '确定', {
  //         confirmButtonText: '登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         removeUserInfoLocal()
  //         // store.dispatch('LogOut').then(() => {
  //         location.reload() // 为了重新实例化vue-router对象 避免bug
  //         //   })
  //       })
  //     }
  //     else {
  //       MessageBox.confirm('您已被登出，请重新登录', '确定登录', {
  //         confirmButtonText: '登录',
  //         cancelButtonText: '取消',
  //         type: 'warning'
  //       }).then(() => {
  //         removeUserInfoLocal()
  //         // store.dispatch('LogOut').then(() => {
  //         location.reload() // 为了重新实例化vue-router对象 避免bug
  //         //   })
  //       })
  //     }
  //     return Promise.reject('error')
  //   } else {
  //     return response.data
  //   }
  // },
  // error => {
  //   console.log('err' + error) // for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
  //   return Promise.reject(error)
  // }
)

export default service
