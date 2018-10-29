import { CoinBalanceBoth } from "../../api/wallet";

const wallet = {
  state: {
    coinBalance:[]

  },
  mutations: {
    SET_COINBALANCE: (state, list) => {
      state.userInfo = list
    },
  },
 actions: {
    //查询所有币种所有余额
    GetCoinBalanceBoth({ commit }) {
      return new Promise((resolve, reject) => {
        CoinBalanceBoth().then(response => {
          commit('SET_COINBALANCE',response.content)
        }).catch(error => {
          reject(error)
        })
      })
    }
 },
 getters: {
    getCoinBalance(state){
      return state.coinBalance;
    },
   getCoinBalanceByName:(state)=>(balanceName)=>{
      for(item of state.coinBalance) {
        if(item == balanceName){
          return item
        }
      }
      return {
        address: "",
        coinBalance: 0,
        coinFrozen: 0,
        coinId: "",
        currencyBalance: 0,
        currencyFrozen: 0,
        id: "",
        name: "",
        remarks: "",
        userId: ""
      }
   }
  }

};

export default wallet;
