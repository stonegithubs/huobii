// 提币数据


import {getLog} from "../../api/withdraw";

const withdraw  = {
  state: {
    withdrawLog: null,

  },
  mutations: {
    SET_LOG: (state, log) => {
      state.withdrawLog = log
      sessionStorage.setItem('withdrawLog', JSON.stringify(log))
    },
  },
  actions: {
    getWithdrawLog({ commit }){
      return new Promise((resolve, reject) => {
        getLog().then(response => {
          commit('SET_LOG',response.content)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
  },
  getters: {
    getUniqueSymbol: (state) =>() => {
      let res = [];
      for(let item of state.symbols){
        if(!res.includes(item['quote-currency'])){
          res.push(item['quote-currency'])
        }
      }return res;
    },
    getSymbolData: (state) => (symbolName) => {
      let res = []
      for(let  item of state.symbols){
        if(item['quote-currency'] === symbolName){
          let target = item['symbol']
          for(let symbol of state.symbolList){
            if(symbol['symbol'] === target){
              symbol['amount-precision'] = item['amount-precision']
              symbol['price-precision'] = item['price-precision']
              symbol['symbol-partition'] = item['symbol-partition']
              symbol['symbolName'] = item['base-currency'] + '/' + item['quote-currency']
              res.push(symbol)
            }
          }
        }
      }
      return res;
    }

  }
}

export default coinData;
