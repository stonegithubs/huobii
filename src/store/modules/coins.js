// 网站货币信息

import { getRemoteSymbols, getSupportedCash, getRemoteSymbolList, getSupportedCoin, getMarketDetail, getMarketDepth, okcoinTicket } from '../../api/coins'
import { stat } from 'fs';
// import { stat } from "fs";
// import store from "../index";

const coinData = {
  state: {
    // 交易对名以及报价精度 计价货币等
    symbols: JSON.parse(localStorage.getItem('symbols')) || [],

    // 各个symbol的报价数据
    symbolList: [],

    // 从okcoin获取的包含涨跌幅数据的列表
    rateList: [],

    // 网站显示的交易对 ???
    symbolName: 'btc/usdt',

    // 当前主币种
    mainCoin: 'usdt',
    // mainCoinID: '1234567890',

    // 当前目标币种
    targetCoin: 'btc',
    // targetCoinID: '098765432',

    // 汇率
    usd_usdt: 1,

    symbolDetail: {},

    // 支持的交易对关系
    symbol: {
      'usdt': ['btc', 'eth', 'tc'],
      'eth': ['btc', 'usdt', 'tc'],
      'tc': ['btc', 'usdt', 'eth'],
      'btc': ['tc', 'usdt', 'eth']
    },

    // 出售币种深度列表
    sellDepth: [],

    // 购买币种深度列表
    buyDepth: [],

    // 支持的币种
    supportedCoin: [],

    supportedCash: [
      // { id: '1', name: 'USD' },
      // { id: '2', name: 'CNY' }
    ]
  },
  mutations: {
    SET_RATELIST: (state, list) => {
      state.rateList = list
    },
    SET_CASH: (state, list) => {
      for (let item of list) {
        // item.coinName = item.coinName.toUpperCase()
      }
      state.supportedCash = list
    },
    SET_SYMBOLS: (state, content) => {
      state.symbols = content
      localStorage.setItem('symbols', JSON.stringify(content))
    },
    SET_SYMBOLLIST: (state, content) => {
      state.symbolList = content
    },
    SET_MAINCOIN_ID: (state, content) => {
      state.symbolList = content
    },
    SET_TARGETCOIN_ID: (state, content) => {
      state.symbolList = content
    },
    SET_MAINCOIN: (state, coinName) => {
      state.mainCoin = coinName
    },
    SET_TARGETCOIN: (state, coinName) => {
      state.targetCoin = coinName
    },
    SET_SYMBOL_SHOW: (state, symbolName) => {
      state.symbolName = symbolName
    },
    SET_SUPPORTED_COIN: (state, list) => {
      state.supportedCoin = list
    },
    SET_SELL_DEPTH: (state, list) => {
      state.sellDepth = list
    },
    SET_BUY_DEPTH: (state, list) => {
      state.buyDepth = list
    },
    SET_SYMBOLDETAIL: (state, detail) => {
      state.symbolDetail = detail
    }
  },
  actions: {
    getSymbols({ commit }) {
      return new Promise((resolve, reject) => {
        getRemoteSymbols().then(response => {
          commit('SET_SYMBOLS', response.content)
          resolve(response)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    // 获取货币信息
    getSymbolList({ commit }) {
      return new Promise((resolve, reject) => {
        getRemoteSymbolList().then(response => {
          commit('SET_SYMBOLLIST', response.content.data)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取支持的虚拟币种
    getSupportCoin({ commit }) {
      return new Promise((resolve, reject) => {
        getSupportedCoin().then(response => {
          commit('SET_SUPPORTED_COIN', response.content.records)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取支持的法币
    getSupportCash({ commit }) {
      return new Promise((resolve, reject) => {
        getSupportedCash().then(response => {
          commit('SET_CASH', response.content.records)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    MarketDepth({ commit }, form) {
      return new Promise((resolve, reject) => {
        getMarketDepth(form).then(response => {
          if (response && response.code == '200') {
            commit('SET_SELL_DEPTH', response.content.tick.bids)
            commit('SET_BUY_DEPTH', response.content.tick.asks)
            resolve(response)
          } else {
            new Error(response)
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    SymbolRate({ commit }) {
      return new Promise((resolve, reject) => {
        okcoinTicket().then(response => {
          commit('SET_RATELIST', response.content.data)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 更新当前交易对详细信息
    updataPrice({ commit }, symbolName) {
      return new Promise((resolve, reject) => {
        getMarketDetail(symbolName).then(response => {
          // commit('SET_LASTPRICE', response.content.tick.close)
          commit('SET_SYMBOLDETAIL', response.content.tick)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }

  },
  getters: {
    getCoinList: (state) => (symbolName) => {
      const symbolList = []
      const targetCoinList = state.symbol[symbolName]
      for (const item of state.symbolList) {
        for (const target of targetCoinList) {
          if (item.symbol === target + symbolName) {
            // usd
            for (const shit of state.rateList) {
              if (shit.symbol === 'usdt_usd') {
                state.usd_usdt = shit.close
              }
              if (symbolName === 'usdt' && target + '_' + 'usd' === shit.symbol) {
                item.rate = Number.parseFloat(shit.changePercentage) * state.usd_usdt
                item.target = target
                item.symbolName = symbolName
                symbolList.push(item)
              }
              if (target === 'usdt' && 'usd' + '_' + symbolName === shit.symbol) {
                item.rate = Number.parseFloat(shit.changePercentage) / state.usd_usdt
                item.target = target
                item.symbolName = symbolName
                symbolList.push(item)
              }
              if (target + '_' + symbolName === shit.symbol) {
                item.rate = Number.parseFloat(shit.changePercentage)
                item.target = target
                item.symbolName = symbolName
                symbolList.push(item)
              }

              // 其他
            }
          }
        }
      }
      return symbolList
    },
    getUniqueSymbol: (state) => () => {
      const res = []
      for (const item of state.symbols) {
        if (!res.includes(item['quote-currency'])) {
          res.push(item['quote-currency'])
        }
      }
      return res
    },
    // getSymbolData: (state) => (symbolName) => {
    //   let res = []
    //   for (let item of state.symbols) {
    //     if (item['quote-currency'] === symbolName) {
    //       let target = item['symbol']
    //       for (let symbol of state.symbolList) {
    //         if (symbol['symbol'] === target) {
    //           symbol['amount-precision'] = item['amount-precision']
    //           symbol['price-precision'] = item['price-precision']
    //           symbol['quote-currency'] = item['quote-currency']
    //           symbol['base-currency'] = item['base-currency']
    //           symbol['symbol-partition'] = item['symbol-partition']
    //           symbol['symbolName'] = item['base-currency'] + '/' + item['quote-currency']
    //           for(let fuck of state.rateList){
    //             let mmp = item['quote-currency']+'_'+item['base-currency']
    //             if(mmp = fuck.symbol){
    //               symbol.rate = mmp.changePercentage
    //               res.push(symbol)
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return res;
    // },
    getSupportCoin: (state) => {
      return state.supportedCoin
    },
    getSupportCash: (state) => {

      return state.supportedCash
    },
    getCashNameById: (state) => (id) => {
      for (let item of state.supportedCash) {
        if (id == item.id) {
          return item.name.toUpperCase()
        }
      }
    },
    getCashIdByName: (state) => (name) => {
      for (let item of state.supportedCash) {
        if (name == item.name) {
          return item.id
        }
      }
    },
    getMainCoin: (state) => {
      return state.mainCoin
    },
    getTargetCoin: (state) => {
      return state.targetCoin
    },
    getOkCoin: (state) => (coinName) => {
      return state.rateList
    },
    getCoinIdByName: (state) => (coinName) => {
      for (const item of state.supportedCoin) {
        if (item.name == coinName) {
          return item.id
        }
      }
    },
    getCoinNameByID: (state) => (ID) => {
      for (const item of state.supportedCoin) {
        if (item.id == ID) {
          return item.abbr
        }
      }
    },
    getCoinNameByIDUp: (state) => (ID) => {
      for (const item of state.supportedCoin) {
        if (item.id == ID) {
          return item.abbr.toUpperCase()
        }
      }
    },
    getBuyDepth: (state) => {
      let addUp = 0, buyDepthList = []
      for (const item of state.buyDepth) {
        addUp += item[1]
        const listItem = { 'price': item[0], amount: item[1], 'accumulative': addUp }
        buyDepthList.push(listItem)
      }
      return buyDepthList
    }
  }
}

export default coinData

