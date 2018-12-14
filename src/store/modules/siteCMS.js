// 网站CMS功能数据

import { getNotice, articleCategory, articles, getBanner } from '../../api/cms'

const siteCMS = {
  state: {
    // 网站公告
    notice: [],

    bannerList: [],

    // 文章分类
    articleCategory: [],

    // 文章列表
    articles: []

  },
  mutations: {
    SET_NOTICE: (state, noticeList) => {
      state.notice = noticeList
    },
    SET_CATEGORY: (state, category) => {
      state.articleCategory = category
    },
    SET_ARTICLE: (state, list) => {
      state.articles = list
    },
    SET_BANNER: (state, list) => {
      state.bannerList = list
    }
  },
  actions: {
    getNoticeRemote({ commit }) {
      return new Promise((resolve, reject) => {
        getNotice().then(response => {
          commit('SET_NOTICE', response.content.records)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getArticleCategory({ commit }) {
      return new Promise((resolve, reject) => {
        articleCategory(0, 30).then(response => {
          commit('SET_CATEGORY', response.content.records)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getArticleList({ commit }) {
      return new Promise((resolve, reject) => {
        articles(0, 100).then(response => {
          commit('SET_ARTICLE', response.content.records)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    },
    getBanners({ commit }) {
      return new Promise((resolve, reject) => {
        getBanner(0, 5).then(response => {
          commit('SET_BANNER', response.content.records)
          resolve(response)
        }).catch(err => {
          reject(err)
        })
      })
    }
  },
  getters: {
    getterBanner(state) {
      return state.bannerList
    },
    getMyNotice: (state) => (n) => {
      // 传入需要的个数,判断一下防止越界 按权重由高到低排序
      const compare = function (x, y) {
        if (x.weight < y.weight) {
          return 1
        } else {
          return -1
        }
      }
      const newNoticeList = state.notice.sort(compare)
      n = n <= newNoticeList.length - 1 ? n : newNoticeList.length - 1
      return newNoticeList.slice(0, n)
    },
    getCategory: (state) => state.articleCategory,
    getArticles: (state) => state.articles,
    getCategoryById: (state) => (id) => {
      for (let item of state.articleCategory) {
        if (id == item.id) {
          return item
        }
      }
    },
    getArticlesByCategoryId: (state) => (id) => {
      let list = []
      for (let item of state.articles) {
        if (item.categoryId == id) {
          list.push(item)
        }
      }
      return list
    }
  }

}

export default siteCMS
