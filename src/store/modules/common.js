// 网站通用信息接口
import { getPayway, getCountry } from '../../api/common'

const Common = {
  state: {
    supportPayway: [],
    sitekey: '6LdoLXkUAAAAANF3D7WorL31LhnwBJk3KSnmCnJu',
    countryList: []

  },
  mutations: {
    SET_PAYWAY: (state, paywayList) => {
      state.supportPayway = paywayList
    },
    SET_COUNTRY: (state, list) => {
      state.countryList = list
    }
  },
  actions: {
    // 支持的支付方式
    getSupportedPayway({ commit }) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('page', 1)
        formData.append('size', 100)
        getPayway(formData).then(response => {
          commit('SET_PAYWAY', response.content.records)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    getCountryList({ commit }) {
      return new Promise((resolve, reject) => {
        getCountry().then(response => {
          const sortedCountry = response.content.sort(function (a, b) { return (a.id - b.id) })
          commit('SET_COUNTRY', sortedCountry)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    getCountry: (state) => {
      return state.countryList
    },
    getCountryCodeByAbbr: (state) => (abbr) => {
      for (const item of state.countryList) {
        if (item.abbr == abbr) {
          return item.code.length === 2 ? '+' + item.code : item.code
        }
      }
      return 0
    },
    getSiteKey: (state) => {
      return state.sitekey
    },
    getPayway: (state) => {
      return state.supportPayway
    },
    getPaywayById: (state) => (id) => {
      for (let item of state.supportPayway) {
        if (id == item.id) {
          return item
        }
      }
      return
    }
  }

}

export default Common
