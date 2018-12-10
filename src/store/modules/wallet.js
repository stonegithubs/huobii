import { CoinBalanceBoth, ordersAll } from '../../api/wallet';

const wallet = {
  state: {
    coinBalance: [],
    orderHistory: []
  },
  mutations: {
    SET_COINBALANCE: (state, list) => {
      if (list instanceof Array) {
        state.coinBalance = list
      }
    },
    SET_ORDERHISTORY: (state, list) => {
      state.orderHistory = list
    }
  },
  actions: {
    // 查询所有币种所有余额
    GetCoinBalanceBoth({ commit }) {
      return new Promise((resolve, reject) => {
        CoinBalanceBoth().then(response => {
          commit('SET_COINBALANCE', response.content)
        }).catch(error => {
          reject(error)
        })
      })
    },
    getOrderHistoryAll({ commit }, symbol) {
      return new Promise((resolve, reject) => {
        ordersAll(symbol).then(response => {
          commit('SET_ORDERHISTORY', response.content)
        }).catch(error => {
          reject(error)
        })
      })
    }

  },
  getters: {
    getCoinBalance(state) {
      return state.coinBalance
    },
    getCoinBalanceByName: (state) => (balanceName) => {
      for (const item of state.coinBalance) {
        // console.log(item.coinName)
        if (item.coinName == balanceName) {
          return item
        }
      }
      return {
        address: '',
        coinBalance: 0,
        coinFrozen: 0,
        coinId: '',
        currencyBalance: 0,
        currencyFrozen: 0,
        id: '',
        name: '',
        remarks: '',
        userId: ''
      }
    }
  }

}

export default wallet
