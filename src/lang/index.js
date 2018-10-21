import VueI18n from 'vue-i18n'
import Vue from 'vue'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import elementThLocale from 'element-ui/lib/locale/lang/th'// element-ui lang
import enLocale from './en'
import zhLocale from './zh'
import thLocale from './th'

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  },
  th: {
    ...thLocale,
    ...elementThLocale
  }
}

const i18n = new VueI18n({
  // set locale
  // options: en or zh
  // locale: Cookies.get('language') || 'zh',
  locale: 'zh',
  // set locale messages
  messages
})

export default i18n
