<template>
  <div class="trade-content">
    <div class="trade-select">

      <!-- 币种 方向筛选 -->
      <div class="choice-filter">
       
        <!-- <router-link :to="{ 'name': 'advertising' }"><h2>发布广告</h2></router-link>  -->
      </div>

      <!-- 右侧选项 -->
      <div class="coin-choice">
         <el-button @click="goToAdv()" type="primary" round>{{$t('fb.pubAdv')}}</el-button>
        <el-button @click="checkMyAdv()" type="primary" round>{{$t('fb.myAdv')}}</el-button>
        <fbChoice @orderChange="ChangeOrder"></fbChoice>
      </div>
    </div>
    <el-table :data="merchantList" style="width: 100%">
      <el-table-column :label="$t('fb.merchant')" width="180">
        <template slot-scope="scope">
          <div :class="getAvatarColor(scope.row.id)" class="avatar-container">
            <em class="name">{{ scope.row.user.name.slice(0,1) === undefined? '':scope.row.user.name.slice(0,1).toUpperCase() }}</em>
          </div>
          <div>
            <router-link :to="{ name: 'trader', params: {id: scope.row.id}}">
              <span class="user-info" style="margin-left: 10px">{{ scope.row.user.name }}
                <!-- ({{scope.row.order_msg.finish}} | {{scope.row.order_msg.finish_rate}}) -->
              </span>
            </router-link>
          </div>
        </template>
      </el-table-column>

      <el-table-column sortable :label="$t('order.amount')" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }} {{getCoinNameByIDUp(scope.row.coinId)}}</span>
        </template>
      </el-table-column>

      <el-table-column :label="$t('fb.limit')">
        <template slot-scope="scope">
          <span>{{ scope.row.min }}-{{ scope.row.max }}  {{getCashNameById(scope.row.cashId)}}</span>
        </template>
      </el-table-column>

      <el-table-column sortable prop="price" width="180" :label="$t('price')" >
        <template slot-scope="scope">
          <span class="price">{{ scope.row.price }} {{getCashNameById(scope.row.cashId)}}</span>
        </template>
      </el-table-column>

      <!-- TODO: 支付方式需要从后端拿icon 这里写法应急 -->
      <el-table-column prop="payment_list" width="200" :label="$t('order.payways')">
        <template slot-scope="scope">
          <b v-if="scope.row.paywayIds === 'all'">
            <el-tooltip 
            content="alipay"
            style="margin:0 3px"
            class="item"
            effect="dark"
            placement="bottom">
            <!-- <i class="'iconfont icon-ziyuan'"/> -->
            <embed :src="alipay" width="16" height="16" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
          </el-tooltip>
          <el-tooltip 
            content="wechat"
            style="margin:0 3px"
            class="item"
            effect="dark"
            placement="bottom">
            <embed :src="wechat" width="16" height="16" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
          </el-tooltip>
          <el-tooltip 
            content="bankCard"
            style="margin:0 3px"
            class="item"
            effect="dark"
            placement="bottom">
            <embed :src="bankCard" width="16" height="16" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
          </el-tooltip>
          </b>
          <b v-else>
          <el-tooltip 
            v-for="(item,index) in scope.row.paywayIds.split(',')"
            :key="index"
            :content="getPaynameById(item)"
            style="margin:0 3px"
            class="item"
            effect="dark"
            placement="bottom">
            <embed :src="require('../../../assets/svg/'+getIcon(item)+'.svg+')" width="16" height="16" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
          </el-tooltip>
          </b>

        </template>
      </el-table-column>

      <el-table-column prop="id" :label="$t('placeOrder')" width="100">
        <template slot-scope="scope">
          <el-popover
            placement="bottom"
            width="900px"
            height="900px">
            <el-form ref="tradeForm" :inline="false" :model="tradeForm">

              <el-form-item
                :rules="[{ required: true, message: $t('amountErr'), trigger: 'blur' },
                         { type: 'number', message: $t('amountErr'), trigger: ['blur', 'change'] }]"
                prop="currency"
                :label="$t('fb.currency')">

                <el-input v-model.number="tradeForm.currency" :placeholder="$t('fb.cashAmount')"/>
              </el-form-item>

              <el-form-item
                :rules="[{ required: true, message: $t('amountErr'), trigger: 'blur' },
                         { type: 'number', message: $t('amountErr'), trigger: ['blur', 'change'] }]"
                :label="$store.getters.getCoinNameByIDUp(scope.row.coinId)"
                prop="amount">
                <el-input v-model.number="tradeForm.amount" :placeholder="$t('exchange.main.amount')"/>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" style="width: 100%" @click="handleOrder(scope.row.id)">{{$t('placeOrder')}}</el-button>
              </el-form-item>
            </el-form>
            <!-- </el-card> -->
            <el-button slot="reference" type="primary" @click="chooseOrder(scope.row)">{{scope.row.direction == 0? $t('sell'): $t('buy')}}</el-button>
          </el-popover>
        </template>
      </el-table-column>

      

    </el-table>

    <!-- 分页 -->
    <div class="mpagination">
      <el-pagination
        :page-count="Math.ceil(total/10)"
        :current-page.sync ="page"
        class=""
        background
        layout="prev, pager, next"
        @current-change="pageChange"/>

    </div>
    <el-dialog
      :visible.sync="smsDialog"
      :before-close="handleClose"
      :title="$t('smsTip')"
      width="300px">
      <el-input v-model="tradeForm.code" :placeholder="$t('smsCode')"/>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doTrade()">{{$t('confirm')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getAvatarColor, sendUserCode
} from '../../../utils/index'
import fbChoice  from '../../../components/fbChoice'
import paymentIcon from './paymentIcon'
import {
  fbList, fbTrade
} from '../../../api/coin_trade'
// import { sendCaptcha1, getCaptcha } from '../../../api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'TradeContent',
  components: {
    paymentIcon,
    fbChoice
  },
  data() {
    return {
      // alipay: require('../../../assets/svg/alipay.svg'),
      // wechat: require('../../../assets/svg/weChat.svg'),
      // bankCard: require('../../../assets/svg/ic_bankcard.svg'),
      merchantList: [],
      currentCoin: 'usdt',
      page: 0,
      total: 0,
      payments: 'all',
      onePageNum: 10, // 一页显示10个
      chooseForm: {
        page:0,
        size: 10,
        direction: '1', 
        payments: 'all', 
        coinId: '2', 
        cashId: '3'
      },
      searchForm: { // 安排
        payments: 'all',
        cashId: 'all'
      },
      direction: '1',
      tradeForm: {
        id: '',
        direction: this.direction,
        code: '',
        amount: 0,
        currency: 0
      },
      smsDialog: false,
      tradeBarVisible: false,
      price: 1
    }
  },
  created() {
    // this.$router.push({ name: 'orderDetail', params: { id: '594f8c0ae4034fe79713cdafe4bcfd55', processId: '2bfeb0ea99bd49e9938a9952e9397295'} })
    // 拉取商家列表
    this.getMerchantList(0, 10, 0, 'all', '2','3')

    // 拉取实名信息
    this.$store.dispatch('GetVerifyInfo').catch(_ => {})
    // 拉去支持的支付方式
    this.$store.dispatch('getSupportedPayway').catch(_ => {})
    // 拉取支持的币种
    this.$store.dispatch('getSupportCoin').catch(_ => {})
  },
  methods: {
    ChangeOrder(s){
      // this.page = 0;
      this.chooseForm = s;
      this.direction = s.direction
      this.getMerchantList(0, 10, s.direction, s.payments, s.coinId, s.cashId)
      // console.log(form)
    },
    getMerchantList(page, size, direction, payments, coinId, cashId) {
      this.merchantList = []
      fbList(page, size, direction, payments, coinId, cashId).then(res => {
        if (res.code === '200') {
          const content = res.content
          this.total = content.total
          if (content.records instanceof Array) {
            this.merchantList = content.records
            
          }
          // console.log(this.merchantList)
        }
      }).catch(_ => {})
    },
    search() {
      this.page = 0
      this.payments = this.searchForm.payments
      this.cashId = this.searchForm.cashId
      // console.log('搜索条件' + this.page, this.onePageNum, this.direction, this.payments, this.coinId, this.cashId)
      this.getMerchantList(0, 10, 0, this.payments, this.coinId, this.cashId)
      // this.getMerchantList(this.page, this.total, this.direction, this.payments, this.coinId, this.cashId)
    },
    pageChange(s) {
      // console.log('页数改变 ' + s)
      this.getMerchantList(s, 10, this.direction, this.payments, this.coinId, this.cashId)
    },
    filter() {

    },
    getPaynameById(id) {
      switch (id) {
        case '1': return 'weChat'
        case '2': return 'ic_bankcard'
        case '9fe2dcef18e94c85adb3ff6da9c2a78d': return 'alipay'
      }
    },
    chooseOrder(order) {
      this.price = order.price
      this.currentOrder = order
      this.tradeForm.id = order.id
      this.tradeForm.direction = this.direction
      this.$store.dispatch('GetUserInfo').then(res => {
        if (res.code !== '200') {
          this.$notify.error('loginNeeded')
          return false
        } else {

        }
      }).catch(_ => {})
      // console.log(order)
    },
    // getCurrency() {
    //   this.tradeForm.currency = this.tradeForm.number * this.currentOrder.price;
    // },
    // getNumber() {
    //   this.tradeForm.number = this.tradeForm.currency / this.currentPrice;
    // },
    // handleTrade(row) {
    //   this.currentTrade = row;
    //   if (this.$store.state.user.token) {
    //     //已登录
    //     if (this.isVerified) {
    //       //已普通验证
    //       this.tradeInfoVisible = true;
    //       this.currentPrice = row.price;
    //     } else {
    //       //未验证
    //       this.verifyVisible = true;
    //     }
    //   } else {
    //     //未登录
    //     this.$router.push("/login");
    //     this.$message.info("请先登录");
    //   }
    // },
    handleOrder(id) {
      // 拉取个人信息
      this.$refs['tradeForm'].validate(valid => {
        if (valid) {
          // 发送验证码吗
          sendUserCode(this);
          // const country = this.$store.state.user.userInfo.countryCode
          // const phone = this.$store.state.user.userInfo.mobile
          // sendCaptcha1(phone, country).then(res => {
          //   if (res.code === '200') {
          //     this.smsDialog = false
          //     getCaptcha(phone, country).then(res => {
          //       this.$notify.success(res.content)
          //     })
          //   } else {
          //     this.$notify.error(this.$t('shitHappens'))
          //   }
          // }).catch(_ => {})
        }
      })
    },
    doTrade() {
      const form = this.tradeForm
      // console.log(form.id, form.direction, form.code, form.amount)
      fbTrade(form.id, form.direction, form.code, form.amount).then(res => {
        this.smsDialog = false
        if (res.code === '200') {
          if(form.direction == '0'){    // 此单我为出售方 不获取对方付款信息 TODO: 后端接口错误 挂单方拿不到交易信息
              this.$notify.success(this.$t('fb.orderSellTip'))
              this.smsDialog=false
              // this.$router.push({ name: 'orderDetail', params: { id:res.content.orderId,direction: form.direction} })
          }else if(form.direction == '1'){    // 此单我为买入方 跳转到付款页面正常付款
            this.$notify.success(this.$t('fb.orderBuyTip'))
            this.$router.push({ name: 'orderDetail', params: { id:res.content.orderId,direction: form.direction} })
          }
          } else {
          this.$notify.error(this.$t('fb.orderFailed') + res.content.message)
          // console.log(res)
        }
      }).catch(err => {
        // this.$notify.error(err.message)
      })
    },
    goToAdv(){
      this.$router.push({ name: 'advertising'})
    },
    checkMyAdv(){
      this.$router.push({ name: 'tradeOrder'})
    },
    // 界面
    getIcon(iconName) {
      return this.$store.getters.getPaymentIcon(iconName)
    },
    getAvatarColor(id) {
      return getAvatarColor(id)
    },
    handleClose(done) {
      this.$confirm(this.$t('confirmToClose'))
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }

  },
  computed: {
    alipay(){
      return require('../../../assets/svg/alipay.svg')
    },
    wechat(){
      return require('../../../assets/svg/weChat.svg');
    },
    bankCard(){
      return require('../../../assets/svg/ic_bankcard.svg')
    },
    getAmount() {
      return this.tradeForm.amount
    },
    getCurrency() {
      return this.tradeForm.currency
    },
    ...mapGetters([
      'getCountry',
      'getCountryCodeByAbbr',
      'getCashNameById',
      'getCoinNameByIDUp'
    ])
  },
  watch: {
    coinId(curVal, oldVal) {
      this.page = 0,
      this.getMerchantList(this.page, this.onePageNum, this.direction, this.payments, this.coinId, this.cashId)
    },
    //  tradeForm: {

    //   // handler(curVal, oldVal){
    //   //   curVal.amount =
    //   // },
    //   deep:true
    // },
    getAmount(newvalue, old) {
      this.tradeForm.currency = newvalue * this.price
    },
    getCurrency(newvalue, old) {
      this.tradeForm.amount = newvalue / this.price
    },
    page(page){
      let s = this.chooseForm;
      this.merchantList = []
      fbList(page, 10, s.direction, s.payments, s.coinId, s.cashId).then(res => {
        if (res.code === '200') {
          const content = res.content
          this.total = content.total
          if (content.records instanceof Array) {
            this.merchantList = content.records
            
          }
          // console.log(this.merchantList)
        }
      }).catch(_ => {})
    }
  }

}
</script>

<style lang="scss" scoped>
   .search-box {
       text-align: right;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
  }
  .trade-content {
    width: 1200px;
    margin: auto; 
    padding-bottom:50px; 
    .el-table /deep/ {
       min-height: 400px;
      .cell {
        display: flex;
        align-items: center;
      }
      .el-card {
        margin: -25px -44px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
      }
    }
    .choice-filter  {
      // display: flex;
      // flex-direction: column;

    }
    .trade-select {
      display: flex;
      justify-content: space-between;
      .coin-choice /deep/ {
        display: flex;
        .el-button {
          margin: 0 20px 0 0;
        }
        margin: 30px 0;
        .el-input__suffix {
          top: 5px;
        }

      }
    }
    .avatar-container {
      height: 40px;
      width: 40px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: relative;
      .name {
        color: white;
      }
    }

    .price {
      color: #489972;
      font-size: 16px;
      font-weight: 600;
    }
    .user-info {
      color: #3b68bb;
    }
    .trade-tab {
      span {
        display: inline-block;
        margin-right: 40px;
        color: #999;
      }
      .tt-price {
        color: #489972;
        font-weight: 700;
        span {
          font-weight: 400;
        }
      }
      .trade-name {
        font-weight: 500;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .avatar-container {
          margin-right: 20px;
        }
        a {
          color: #3b68bb;
        }
      }
    }
    .m-trade-list {
      .trade-tab {
        padding: 45px 0;
        border-bottom: 1px solid hsla(0, 0%, 85%, 0.5);
        width: 100%;
        position: relative;
      }
      .m-payment {
        span {
          margin-right: 5px;
        }
        .pay-list {
          i {
            display: inline-block;
          }
        }
      }
      .el-button {
        position: absolute;
        right: 0;
        bottom: 0;
        span {
          color: white;
          margin: auto;
        }
        margin-bottom: 20px;
      }
    }
    .el-dialog {
      z-index: 2001;
      position: relative;
      @media (max-width: 768px) {
        width: 90%;
      }
      /*i {*/
      /*font-size: 30px;*/
      /*color: #55a532;*/
      /*}*/
    }
    .mpagination {
      display: flex;
      margin-top: 40px;
      width: 100%;
      /*align-content: center;*/
      /*align-items: center;*/
      .el-pagination {
        margin: auto;
      }
    }
  }
</style>
<style lang='scss'>
  .el-popover {
    padding: 35px 23px 15px 26px;
  }
  .choice-filter .el-radio-group {
        //  margin: 40px 20px 0 0 !important;
      }
</style>
