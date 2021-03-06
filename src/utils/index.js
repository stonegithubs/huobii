
import { sendCaptcha1, getCaptcha } from '../api/user'
import { submitRpeal } from '../api/coin_trade'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function getAvatarColor(id) {
  id = id.charCodeAt()
  const colorIndex = id % 10
  switch (colorIndex) {
    case 0: return 'one'
    case 1: return 'two'
    case 2: return 'three'
    case 3: return 'four'
    case 4: return 'five'
    case 5: return 'six'
    case 6: return 'seven'
    case 7: return 'eight'
    case 8: return 'nine'
    case 9: return 'ten'
  }
}

export function sendUserCode(vm) {
  const that = vm
  // 调用验证码接口前需要判断是否有个人信息（国家 手机号）没有则拉取
  if (vm.$store.state.user.userInfo === null) {
    vm.$store.dispatch('GetUserInfo').then(_ => {
      const country = that.$store.state.user.userInfo.countryCode
      const phone = that.$store.state.user.userInfo.mobile
      sendCaptcha1(phone, country)
        .then(res => {
          if (res.code === '200') {
            that.smsDialog = true
            getCaptcha(phone, country).then(res => {
              that.$notify.success(res.content)
            })
          } else {
            that.$notify.error(that.$t('shitHappens'))
          }
        })
        .catch(_ => { })
    }).catch(_ => { })
  } else {
    // 存在用户信息在则直接发送验证码
    const country = that.$store.state.user.userInfo.countryCode
    const phone = that.$store.state.user.userInfo.mobile
    sendCaptcha1(phone, country)
      .then(res => {
        if (res.code === '200') {
          that.smsDialog = true
          getCaptcha(phone, country).then(res => {
            that.$notify.success(res.content)
          })
        } else {
          that.$notify.error(that.$t('shitHappens'))
        }
      })
      .catch(_ => { })
  }
}

export function getStatus(status) {
  switch (status) {
    case '0': return '挂单中'
    case '1': return '部分成交'
    case '2': return '完成交易'
    case '3': return '用户撤销'
    case '8': return '历史纪录'
    case '9': return '交易锁定中'
    case '10': return '全部'
    case '11': return '交易中'
  }
}
export function advStateList(vm) {
  return [
    {
      status: '0', name: '挂单中'
    },
    {
      status: '1', name: '部分成交'
    },
    {
      status: '2', name: '已完成'
    },
    {
      status: '3', name: '已撤销'
    },
    // {
    //   status: '4', name: '买家已付款'
    // },
    // {
    //   status: '5', name: '买家已撤销'
    // },
    // {
    //   status: '8', name: '历史纪录'
    // },
    {
      status: '9', name: '交易中'
    },
    {
      status: '10', name: '全部'
    }
  ]
}

// 用户订单筛选
export function orderStateList(vm) {
  return [
    // {
    //   status: '0', name: '挂单中'
    // },
    // {
    //   status: '1', name: '部分成交'
    // },
    {
      status: '2', name: '已完成'
    },
    {
      status: '3', name: '已撤销'
    },
    {
      status: '4', name: '买家已付款'
    },
    // {
    //   status: '5', name: '买家已撤销'
    // },
    // {
    //   status: '8', name: '历史纪录'
    // },
    {
      status: '9', name: '交易中'
    },
    {
      status: '10', name: '全部'
    }
  ]
}

export function getStatusG(vm, status) {
  switch (status) {
    case '0': return '挂单中'
    case '1': return '部分成交'
    case '2': return '完成交易'
    case '3': return '用户撤销'
    case '8': return '历史纪录'
    case '9': return '交易锁定中'
    case '10': return '全部'
    case '11': return '交易中'
  }
}

// 撤销币币订单
export function confirmReppelCoinTrade(vm, id) {
  vm.$alert(vm.$t('confirmToRepal'), vm.$t('repeal'), {
    confirmButtonText: vm.$t('confirm'),
    callback: action => {
      submitRpeal(id).then(res => {
        if (res.code === '200') {
          vm.$notify.success(vm.$t('repealSuccess'))
        }
      })
    }
  })
}

export function isImage(qrCodeFile) {
  if (
    qrCodeFile.type != "image/bmg" &&
    qrCodeFile.type != "image/jpg" &&
    qrCodeFile.type != "image/jpeg" &&
    qrCodeFile.type != "image/png" &&
    qrCodeFile.type != "image/gif"
  ) {
    return false;
  }
  return true;
}


export function isMp4(file) {
  if (file.type.split('/')[0] !== 'video') {
    return false
  }
  return true
  // if (
  //   file.type != "image/bmg" &&
  //   file.type != "image/jpg" &&
  //   file.type != "image/jpeg" &&
  //   file.type != "image/png" &&
  //   file.type != "image/gif"
  // ) {
  //   return false;
  // }
  // return true;
}

