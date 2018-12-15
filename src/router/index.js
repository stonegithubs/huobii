import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/layout'
// import tradeLayout from '../views/tradeLayout/index'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('@/views/index/index')
      }
    ]
  },
  {
    path: '/coin_coin/exchange',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/coin_coin/exchange',
        name: 'ccExchange',
        component: () => import('@/views/ccExchange/index')
      }
    ]

  },
  {
    path: '/articles',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/articles',
        name: 'article',
        component: () => import('@/views/article/index')
      },
      {
        path: '/articles/:article_id',
        name: 'article_detail',
        component: () => import('@/views/article/components/articleDetail')
      }
      // children: [
      //   {
      //     path: '/articles',
      //     name: 'article_list',
      //     component: () => import('@/views/article/components/articleList')
      //   },
      //   {
      //     path: '/articles/:category_id/:article_id',
      //     name: 'article_detail',
      //     component: () => import('@/views/article/components/articleDetail')
      //   }
      // ]
      // }
    ]

  },
  // 邀请模块暂时不开启
  // {
  //   path: '/invite',
  //    component: () => import('@/views/layout/layout'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'invite',
  //       component: () => import('@/views/invite/index')
  //     }
  //   ]
  // },
  {
    path: '/coin_coin/margin',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'ccMargin',
        component: () => import('@/views/ccMargin/index')
      }
    ]

  },
  {
    path: '/trade',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'trade',
        component: () => import('@/views/trade/index')
      }
    ]

  },
  {
    path: '/login',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/views/login/index')
      }
    ]

  },
  {
    path: '/registry',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'registry',
        component: () => import('@/views/registry/index')
      }
    ]

  },

  { // 币币订单
    path: '/order',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'order',
        component: () => import('@/views/order/index')
      }
    ]

  },
  // {
  //   path: '/agreement',
  //    component: () => import('@/views/layout/layout'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'agreement',
  //       component: () => import('@/views/agreement/index')
  //     }
  //   ]

  // },
  {
    path: '/user_center',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'user_center',
        component: () => import('@/views/userCenter/index')
      }
    ]

  },
  {
    path: '/ads',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: 'ads',
        name: 'ads',
        component: () => import('@/views/advertisement/index'),
        children: [
          {
            path: '/ads/business',
            name: 'advAuth',
            component: () => import('@/views/advertisement/components/advAuth')
          },
          {
            path: '/ads/advList',
            name: 'tradeOrder',
            component: () => import('@/views/advertisement/components/advList')
          },
          {
            path: '/ads/',
            name: 'advertising',
            component: () => import('@/views/advertisement/components/advertising')
          }

        ]
      }
    ]
  },
  {
    path: '/userOptions',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: 'userOptions',
        name: 'userOptions',
        component: () => import('@/views/userOptions/index'),
        children: [
          {
            name: 'change_password',
            path: '/userOptions/change_password',
            component: () => import('@/views/userOptions/components/changePasswordForm')
          },
          {
            path: '/userOptions/change_trade_password',
            name: 'change_trade_password',
            component: () => import('@/views/userOptions/components/changeTradePwd')
          },
          {
            path: '/userOptions/change_phone',
            name: 'change_phone',
            component: () => import('@/views/userOptions/components/changePhone')
          },
          {
            path: '/userOptions/bind_email',
            name: 'bind_email',
            component: () => import('@/views/userOptions/components/bindEmail')
          },
          {
            path: '/userOptions/verify',
            name: 'verify',
            component: () => import('@/views/userOptions/components/verified')
          }
          // {
          //   path: '/userOptions/forget',
          //   name: 'forget_password',
          //   component: () => import('@/views/userOptions/components/forgetPassword')
          // }
        ]
      }]
  },
  {
    path: '/guestOption',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: 'guestOption',
        name: 'guestOption',
        component: () => import('@/views/guestOption/index'),
        children: [
          {
            path: '/guestOption/forget',
            name: 'forget_password',
            component: () => import('@/views/guestOption/components/forgetPassword')
          },
          {
            path: '/guestOption/agreement',
            name: 'agreement',
            component: () => import('@/views/guestOption/components/agreement')
          }
        ]
      }]
  },
  {
    path: '/order_detail/:id',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '/order_detail/:id/:direction',
        name: 'orderDetail',
        component: () => import('@/views/orderDetail/index')
      }
    ]
  },
  // 订单详情
  {
    path: '/trader/:id',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'trader',
        component: () => import('@/views/trader/index')
      }
    ]
  },
  // 用户信息
  // {
  //   path: '/trade_user_center',
  //    component: () => import('@/views/layout/layout'),
  //   children: [
  //     {
  //       path: '',
  //       name: 'tradeUserCenter',
  //       component: () => import('@/views/tradeUserCenter/index')
  //     }
  //   ]
  // },
  // 法币交易个人中心
  {
    path: '/trade_order', // 法币订单
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'advList',
        component: () => import('@/views/tradeOrder/index')
      }
    ]
  },
  // 法币交易订单列表
  {
    path: '/wallet',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'wallet',
        component: () => import('@/views/wallet/index')
      }
    ]
  },
  {
    path: '/withdraw_address',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: 'withdraw_address',
        component: () => import('@/views/withdrawAddress/index')
      }
    ]
  },
  // 法币交易个人资产
  {
    path: '/404',
    component: () => import('@/views/layout/layout'),
    children: [
      {
        path: '',
        name: '404',
        component: () => import('@/views/404/index')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }

]

const router = new VueRouter({
  routes: constantRouterMap
})

export default router
