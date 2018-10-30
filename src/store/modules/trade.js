import { trade_pwd_exist } from "../../api/trade";


const trade = {
  state: {
    supportedPayment: { //支持的支付方式  暂时写死 后台有数据再更新
      // "alipay": require('../../assets/SVG/alipay.svg'),
      // "wechat": require('../../assets/SVG/wechat.svg'),
      // "bank": require('../../assets/SVG/bank.svg'),
    },
    currencyType: "CNY", //支持的法币
    hasTradePwd: false
  },
  mutations: {
    SET_HASTRADEPWD:(state, content) => {
      state.hasTradePwd = content
    },
  },
  actions: {
    GetTradePwd({ commit }) {
      return new Promise((resolve, reject) => {
        trade_pwd_exist().then(response => {
          commit('SET_HASTRADEPWD',response.content)
          resolve(response)
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
