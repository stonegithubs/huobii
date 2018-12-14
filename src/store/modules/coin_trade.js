// 币币交易相关

import { getOrderBySymbolName, getOrderBySymbolNameAll } from '../../api/coin_trade'
import { Store } from 'vuex'

const coinTrade = {
  state: {

    // 正在委托的交易
    openOrders: [],

    // 历史交易
    historyOrders: []

  },
  mutations: {
    SET_HISTORY: (state, list) => {
      if (list instanceof Array) {
        state.historyOrders = list
      }
    },
    SET_OEPEN: (state, list) => {
      if (list instanceof Array) {
        state.openOrders = list
      }
    }
  },
  actions: {

    getHistoryOrders({ commit }, symbolName, state) {
      return new Promise((resolve, reject) => {
        getOrderBySymbolName(0, 20, 10, symbolName, state, '2018-12-08', '2038-12-08', 1)
          .then(response => {
            commit('SET_HISTORY', response.content.records)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    getOrdersAll({ commit }, symbolName) {
      return new Promise((resolve, reject) => {
        getOrderBySymbolNameAll(symbolName)
          .then(response => {
            commit('SET_HISTORY', response.content.records)
            resolve(response)
          })
          .catch(err => {
            reject(err)
          })
      })
    },

    // 主页委托使用 初始化两栏交易
    initOrdersByName({ commit }, symbolName) {
    // 查询历史订单到history
      getOrderBySymbolName(0, 500, 10, symbolName, 8, '2018-12-08', '2038-12-08', 1)
        .then(response => {
          commit('SET_HISTORY', response.content.records)
        })

      // 查询open订单到openlist
      getOrderBySymbolName(0, 500, 10, symbolName, 10, '2018-12-08', '2038-12-08', 1)
        .then(response => {
          commit('SET_OEPEN', response.content.records)
        })
    }

  }
}

export default coinTrade

