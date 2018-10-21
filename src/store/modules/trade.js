
const trade  = {
  state: {
    supportedPayment:{            //支持的支付方式  暂时写死 后台有数据再更新
      "alipay": require('../../assets/coinIcons/alipay.svg'),
      "wechat": require('../../assets/coinIcons/wechat.svg'),
      "bank": require('../../assets/coinIcons/bank.svg'),
    },
    currencyType: "CNY",          //支持的法币
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    getPaymentIcon: (state)=> (iconName) =>{
      return state.supportedPayment[iconName]
    },
    getCurrencyType: (state) =>{
      return state.currencyType
    }

  }
}

export default trade;
