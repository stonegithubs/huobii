// 网站货币信息

import {getRemoteSymbols,getRemoteSymbolList} from "../../api/coins";
import store from "../index";

const coinData  = {
  state: {
    // 交易对名以及报价精度 计价货币等
    symbols:[],

    // 各个symbol的报价数据
    symbolList:[],

    // 网站显示的交易对
    symbolShow: 'btcusdt',

  },
  mutations: {
    SET_SYMBOLS: (state, content) => {
      state.symbols = content
      localStorage.setItem('symbols',JSON.stringify(content))
  },
    SET_SYMBOLLIST: (state, content) => {
      state.symbolList = content
    },
    SET_SYMBOL_SHOW: (state, symbolName) => {
      state.symbolShow = symbolName
    },
  },
  actions: {
    getSymbols({ commit }){
      return new Promise((resolve, reject) => {
        getRemoteSymbols().then(response => {
          commit('SET_SYMBOLS',response.content)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    },
    getSymbolList( {commit} ){
      return new Promise((resolve, reject) => {
        getRemoteSymbolList().then(response => {
          commit('SET_SYMBOLLIST',response.content.data)
          resolve()
        }).catch(() => {
          reject()
        })
      })
    }
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
