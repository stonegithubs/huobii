import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../views/layout/layout'
import tradeLayout from '../views/tradeLayout/index'

Vue.use(VueRouter)

export const constantRouterMap = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: '',
        component: () => import('@/views/index/index')
      }
    ]
  },
  {
    path: '/coin_coin/exchange',
    component: layout,
    children: [
      {
        path: '/coin_coin/exchange',
        name: 'ccExchange',
        component: () => import('@/views/ccExchange/index')
      }
    ]

  },
  // 邀请模块暂时不开启
  // {
  //   path: '/invite',
  //   component: layout,
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
    component: layout,
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
    component: tradeLayout,
    children: [
      {
        path: '',
        name: 'trade',
        component: () => import('@/views/trade/index')
      }
    ]

  },
  {
    path: '/welfare',
    component: layout,
    children: [
      {
        path: '',
        name: 'welfare',
        component: () => import('@/views/welfare/index')
      }
    ]
  },
  {
    path: '/login',
    component: layout,
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
    component: layout,
    children: [
      {
        path: '',
        name: 'registry',
        component: () => import('@/views/registry/index')
      }
    ]

  },

  {
    path: '/order',
    component: layout,
    children: [
      {
        path: '',
        name: 'order',
        component: () => import('@/views/order/index')
      }
    ]

  },
  {
    path: '/finance',
    component: layout,
    children: [
      {
        path: '',
        name: 'finance',
        component: () => import('@/views/finance/index')
      }
    ]

  },
  {
    path: '/agreement',
    component: layout,
    children: [
      {
        path: '',
        name: 'agreement',
        component: () => import('@/views/agreement/index')
      }
    ]

  },
  // {
  //   path: '/verify',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'verify',
  //       component: () => import('@/views/verify/index')
  //     }
  //   ]

  // },
  {
    path: '/user_center',
    component: layout,
    children: [
      {
        path: '',
        name: 'user_center',
        component: () => import('@/views/userCenter/index')
      }
    ]

  },
  {
    path: '/userOptions',
    component: layout,
    children: [
      {
        path: '/userOptions/change_password',
        name: 'change_password',
        component: () => import('@/views/changePassword/index')
      },
      {
        path: '/userOptions/change_trade_password',
        name: 'change_trade_password',
        component: () => import('@/views/changePassword/index')
      },
      {
        path: '/userOptions/change_phone',
        name: 'change_phone',
        component: () => import('@/views/changePassword/index')

      },
      {
        path: '/userOptions/bind_email',
        name: 'bind_email',
        component: () => import('@/views/changePassword/index')

      },
      {
        path: '/userOptions/verify',
        name: 'verify',
        component: () => import('@/views/changePassword/index')

      },
      {
        path: '/userOptions/forget',
        name: 'forget_password',
        component: () => import('@/views/changePassword/index')

      }
    ]

  },
  // {
  //   path: '/bind_email',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'bind_email',
  //       component: () => import('@/views/bindEmail/index')
  //     }
  //   ]

  // },
  // {
  //   path: '/change_phone',
  //   component: layout,
  //   children: [
  //     {
  //       path: '',
  //       name: 'change_phone',
  //       component: () => import('@/views/changePhone/index')
  //     }
  //   ]

  // },
  {
    path: '/order_detail/:id',
    component: tradeLayout,
    children: [
      {
        path: '',
        name: 'orderDetail',
        component: () => import('@/views/orderDetail/index')
      }
    ]
  },
  // 订单详情
  {
    path: '/trader/:id',
    component: tradeLayout,
    children: [
      {
        path: '',
        name: 'trader',
        component: () => import('@/views/trader/index')
      }
    ]
  },
  // 用户信息
  {
    path: '/trade_user_center',
    component: tradeLayout,
    children: [
      {
        path: '',
        name: 'tradeUserCenter',
        component: () => import('@/views/tradeUserCenter/index')
      }
    ]
  },
  // 法币交易个人中心
  {
    path: '/trade_order',
    component: tradeLayout,
    children: [
      {
        path: '',
        name: 'tradeOrder',
        component: () => import('@/views/tradeOrder/index')
      }
    ]
  },
  // 法币交易订单列表
  {
    path: '/trade_finance',
    component: tradeLayout,
    children: [
      {
        path: '',
        name: 'tradeFinance',
        component: () => import('@/views/tradeFinance/index')
      }
    ]
  },
  // 法币交易个人资产
  {
    path: '/404',
    component: layout,
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
