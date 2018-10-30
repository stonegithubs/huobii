// 网站CMS功能数据

import { getNotice } from "../../api/cms";

const siteCMS = {
  state: {
    // 网站公告
    notice: [],

  },
  mutations: {
    SET_NOTICE: (state, noticeList) => {
      state.notice = noticeList
    },
  },
  actions: {
    getNoticeRemote({ commit }) {
      return new Promise((resolve, reject) => {
        getNotice().then(response => {
          commit('SET_NOTICE', response.content.records)
          resolve()
        }).catch(() => {
          reject('get notice err')
        })
      })
    }
  },
  getters: {
    getMyNotice: (state) => (n) => {
      // 传入需要的个数,判断一下防止越界 按权重由高到低排序
      let compare = function (x, y) {
        if (x.weight < y.weight) {
          return 1;
        } else {
          return -1
        }
      }
      let newNoticeList = state.notice.sort(compare);
      n = n <= newNoticeList.length - 1 ? n : newNoticeList.length - 1;
      return newNoticeList.slice(0, n);
    }
  }

};

export default siteCMS;
