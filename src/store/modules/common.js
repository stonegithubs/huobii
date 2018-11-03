// 网站通用信息接口
import { getPayway } from '../../api/common'

const Common = {
  state: {
    supportPayway: []

  },
  mutations: {
    SET_PAYWAY: (state, paywayList) => {
      state.supportPayway = paywayList
    }
  },
  actions: {
    // 支持的支付方式
    getSupportedPayway({ commit }) {
      return new Promise((resolve, reject) => {
        const formData = new FormData()
        formData.append('page', 1)
        formData.append('size', 100)
        getPayway(formData).then(response => {
          commit('SET_PAYWAY', response.content.records)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {

  }

}

export default Common
