import Element from 'element-ui'
// import { Navbar } from 'bootstrap-vue/es/components'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import '@/style/index.scss'
import '@/views/icon'
// import echarts from 'echarts'

import Vue from 'vue'
import App from './App'
import store from './store/'
import router from './router'
import i18n from './i18n'
// const errorHandler = (error, vm) => {
//   console.error('抛出全局异常')
//   console.error(vm)
//   console.error(error)
//   alert('异常')
// }
// Vue.prototype.$echarts = echarts
// Vue.config.errorHandler = errorHandler
// Vue.prototype.$throw = (error) => errorHandler(error, this)
// Vue.use(Navbar)
Vue.use(Element, { locale })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
