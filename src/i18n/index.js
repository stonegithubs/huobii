import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh_CN', // 语言标识
  messages: {
    'zh_CN': require('./zh_CN'),
    'en_US': require('./en_US'),
    'th_TH': require('./th_TH')
  }
})

export default i18n
