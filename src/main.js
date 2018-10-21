import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { Navbar } from 'bootstrap-vue/es/components'
import './permission' // permission control
// import i18n from './lang' // Internationalization
import '@/style/index.scss'


Vue.use(Navbar)
Vue.use(Element)

Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  components: { App },
  template: '<App/>'
})
