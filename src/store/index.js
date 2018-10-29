import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'

import staticData from './modules/staticData'
import siteCMS from './modules/siteCMS'
import coinData from './modules/coins'
import trade from './modules/trade'
import wallet from './modules/wallet'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    staticData,   // 测试数据
    coinData,     // 货币数据
    user,         // 用户相关
    siteCMS,      // 网站CMS
    trade,     	  //法币交易数据
    wallet,		  //用户钱包数据
  }
})

export default store

