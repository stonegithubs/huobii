import { trade_pwd_exist } from '../../api/trade';

const trade = {
  state: {
    supportedPayment: {

    },
    currencyType: "CNY", //支持的法币
    hasTradePwd: false
  },
  mutations: {
    SET_HASTRADEPWD: (state, content) => {
      state.hasTradePwd = content
    },
  },
  actions: {
    GetTradePwd({ commit }) {
      return new Promise((resolve, reject) => {
        trade_pwd_exist().then(response => {
          if (response && response.code === '200') {
            commit('SET_HASTRADEPWD', response.content)
            resolve(response)
          } else {
            reject(response)
          }
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  getters: {
    getPaymentIcon: (state) => (iconName) => {
      return state.supportedPayment[iconName]
    },
    getCurrencyType: (state) => {
      return state.currencyType
    },
    getTradePwdStatus: (state) => {
      return state.hasTradePwd
    }
  }
}

export default trade;
