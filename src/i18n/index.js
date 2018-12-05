import VueI18n from 'vue-i18n'
import Vue from 'vue'
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    'zh': require('./zh'),
    'en': require('./en'),
    'th': require('./th')
  }
})

export default i18n
