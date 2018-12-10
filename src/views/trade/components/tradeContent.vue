<template>
  <div class="trade-content">
    <div class="trade-select">

      <!-- 币种 方向筛选 -->
      <div class='choice-filter'>
        <el-radio-group v-model="coinId" style="margin: 30px 30px 30px 0;">
          <el-radio-button v-for="item in this.$store.state.coinData.supportedCoin" 
            :label="item.id"  
            v-bind:key="item.id"
            :value='item.id'>
            {{item.abbr.toUpperCase()}}
          </el-radio-button>
        </el-radio-group>
        <el-radio-group v-model="direction" style="margin: 30px 30px 30px 0">
          <el-radio-button :label="0" value='0'>买入</el-radio-button>
          <el-radio-button :label="1" value='1'>卖出</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 右侧选项 -->
      <div class="coin-choice">
        <el-popover popper-class='m-popover' placement="bottom" width="328" trigger="click">
          <el-form v-model="searchForm" class="select-from" label-width="120">
            <el-form-item label="支付方式" >
              <el-select v-model="searchForm.payments" placeholder="选择支付方式">
                <el-option 
                  v-for="item in this.$store.state.Common.supportPayway" 
                  v-bind:key="item.id" 
                  :label="item.payName" 
                  :value="item.id">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="现金种类">
              <el-select v-model="searchForm.cashId" placeholder="选择现金种类">
                <el-option 
                  v-for="item in mockPaymentList" 
                  v-bind:key="item.id" 
                  :label="item.name" 
                  :value="item.id">
                  </el-option>
              </el-select>
            </el-form-item>

            <!-- <el-form-item> -->
              <div class="search-box">
                <el-button type='primary' @click="search()">搜索</el-button>
              </div>
            <!-- </el-form-item> -->
          </el-form>
          <el-input slot="reference">
            <template slot="suffix">
              <img :src="require('../../../assets/imgs/search.png')"/>
            </template>
        </el-input>
      </el-popover>
      </div>
    </div>
    <el-table :data="merchantList" style="width: 100%">
        <el-table-column  label="商家(订单数|完成率)" width="180">
          <template slot-scope="scope">
            <div class="avatar-container" :class="getAvatarColor(scope.row.id)">
              <em class="name">{{scope.row.user.name.slice(0,1).toUpperCase()}}</em>
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
        
        <el-table-column sortable   label="数量" width="180"> 
          <template slot-scope="scope">
            <span>{{ scope.row.amount }} </span>
          </template>
        </el-table-column>

        <!--TODO:这里限额单价等需要单位 需要和后端协商-->
        <el-table-column   label="限额">
          <template slot-scope="scope">
            <span>{{ scope.row.min }}-{{ scope.row.max }}</span>
          </template>
        </el-table-column> 

        <el-table-column sortable  prop="price"  width="180"  label="单价" >
          <template slot-scope="scope">
            <span class="price">{{ scope.row.price }}</span>
          </template>
        </el-table-column>

          <!-- TODO: 支付方式需要从后端拿icon 这里写法应急 -->
        <el-table-column prop="payment_list" width='200'  label="支付方式">
          <template slot-scope="scope">
            <el-tooltip 
                v-for="(item,index) in scope.row.paywayIds.split(',')"
                v-bind:key="index"
               style="margin:0 3px"  class="item" effect="dark" :content="getPaynameById(item)" placement="bottom">
              <i :class="'iconfont icon-'+getPaynameById(item)"></i>
              </el-tooltip>
            </template>
        </el-table-column>

        <el-table-column prop="id" label="下单" width='100'>
          <template slot-scope="scope">
            <el-popover
            placement="bottom"
            width="900px"
            height="900px"
            v-model="tradeBarVisible">
             <!-- <el-card class="box-card"> -->
              <el-form :inline="false"  :model="tradeForm" ref="tradeForm">
              
              <el-form-item 
              prop="currency"
              :rules="[{ required: true, message: '请输入正确的数量', trigger: 'blur' },
                      { type: 'number', message: '请输入正确的数量', trigger: ['blur', 'change'] }]"
              label="现金">
              
              <el-input v-model.number="tradeForm.currency" placeholder="现金数量"></el-input>
              </el-form-item>
              
              <el-form-item 
                prop="amount"
                :rules="[{ required: true, message: '请输入正确的数量', trigger: 'blur' },
                        { type: 'number', message: '请输入正确的数量', trigger: ['blur', 'change'] }]"
                :label="$store.getters.getCoinNameByID(scope.row.coinId).toUpperCase()">
                <el-input  v-model.number="tradeForm.amount" placeholder="货币数量"></el-input>
                </el-form-item>
                <el-form-item>
                <el-button type="primary" style="width: 100%" @click="handleOrder(scope.row.id)">下单</el-button>
              </el-form-item>
              </el-form>
            <!-- </el-card> -->
            <el-button type="primary" @click="chooseOrder(scope.row)" slot="reference">购买</el-button>
          </el-popover>
          </template>
        </el-table-column>

        <!-- <el-table-column type="expand" width='100' label="查看详情"> -->
          <!-- <template slot-scope="props"> -->
           
          <!-- </template> -->
        <!-- </el-table-column> -->

    </el-table>

  <!-- 分页 -->
    <div class="mpagination">
      <el-pagination class=""
        background
        layout="prev, pager, next"
        :page-count="total"
        :current-page.sync ="page"
        @current-change="pageChange">
      </el-pagination>

    </div>
    <el-dialog
      title="请输入您收到的验证码"
      :visible.sync="smsDialog"
      width="300px"
      :before-close="handleClose">
      <el-input placeholder="请输入您收到的验证码" v-model="tradeForm.code"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doTrade()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getAvatarColor
  } from "../../../utils/index"
  import paymentIcon from "./paymentIcon"
  import {
    fbList, fbTrade
  } from '../../../api/coin_trade'
  import { codeSender } from '../../../api/user'
  export default {
    name: "trade-content",
    components: {
      paymentIcon
    },
    data() {
      return {
        merchantList: [
              //     {
              //   "amount": 0,
              //   "cashId": "string",
              //   "coinId": "string",
              //   "direction": "string",
              //   "expire": 0,
              //   "fee": 0,
              //   "id": "string", 
              //   "max": 0,
              //   "message": "string",
              //   "min": 0,
              //   "paywayIds": "9fe2dcef18e94c85adb3ff6da9c2a78d,1,2",
              //   "price": 0,
              //   "remarks": "string",
              //   "status": "string",
              //   "tradeAmount": 0,
              //   "tradeTime": "2018-12-09T13:07:09.683Z",
              //   "type": "string",
              //   "updateDate": "2018-12-09T13:07:09.683Z",
              //   "user": {
              //     "companyId": "string",
              //     "country": {
              //       "abbr": "string",
              //       "code": "string",
              //       "enName": "string",
              //       "id": "string",
              //       "name": "string",
              //       "remarks": "string",
              //       "updateDate": "2018-12-09T13:07:09.683Z"
              //     },
              //     "countryCode": "string",
              //     "discount": 0,
              //     "email": "string",
              //     "freezeFlag": "string",
              //     "id": "string",
              //     "loginDate": "2018-12-09T13:07:09.683Z",
              //     "loginFlag": "string",
              //     "loginIp": "string",
              //     "loginName": "string",
              //     "mobile": "string",
              //     "name": "string",
              //     "no": "string",
              //     "officeId": "string",
              //     "phone": "string",
              //     "photo": "string",
              //     "recommendCode": "string",
              //     "recommenderId": "string",
              //     "regIp": "string",
              //     "remarks": "string",
              //     "score": 0,
              //     "updateDate": "2018-12-09T13:07:09.683Z",
              //     "userType": "string"
              //   },
              //   "userId": "string"
              // }
      ],
        currentCoin: 'usdt',
        page: 0,
        total: 0,
        direction: 0,
        onePageNum: 10, // 一页显示10个
        payments: 'all',
        coinId: '1',
        cashId: 'all',
        mockPaymentList: [
          { name: 'USD', id: '0'},
          { name: 'CNY', id: '1'},
          { name: 'VND', id: '2'},
          ],
        searchForm: {   // 安排
          payments: 'all',
          cashId: 'all'
        },
        tradeForm: {
          id: '',
          direction: this.direction,
          code: '',
          amount: 0,
          currency: 0,
        },
        smsDialog: false,
        tradeBarVisible: false,
        price: 1,
      };
    },
    created() {
      // 拉取商家列表
      this.getMerchantList(this.page, this.onePageNum, this.direction, this.payments, this.coinId, this.cashId)
      // 拉取实名信息
      this.$store.dispatch('GetVerifyInfo').catch(_ => {})
      // 拉去支持的支付方式
      this.$store.dispatch('getSupportedPayway').catch(_ => {})
      // 拉取支持的币种
      this.$store.dispatch('getSupportCoin').catch(_ => {})
    },
    methods: {
      getMerchantList(page, size, direction, payments, coinId, cashId) {
        fbList(page, size, direction, payments, coinId, cashId).then(res => {
          if(res.code === '200'){
            let content = res.content
            if (content.records instanceof Array) {
            this.merchantList = content.records
            this.total = content.total
          }
          // console.log(this.merchantList)
          }
        }).catch(_=>{})
      },
      search(){
        this.page = 0;
        this.payments = this.searchForm.payments
        this.cashId = this.searchForm.cashId 
        console.log("搜索条件"+ this.page, this.onePageNum, this.direction, this.payments, this.coinId, this.cashId)
        this.getMerchantList(0, 10, 0, this.payments, this.coinId, this.cashId)
      // this.getMerchantList(this.page, this.total, this.direction, this.payments, this.coinId, this.cashId)
      },
      pageChange(s){
        console.log("页数改变 "+ s)
        this.getMerchantList(s, 10, this.direction, this.payments, this.coinId, this.payments)
      },
      filter(){

      },
      getPaynameById(id){
       switch (id) {
         case '1': return 'wechat';
         case '2': return 'bankCard';
         case '9fe2dcef18e94c85adb3ff6da9c2a78d': return 'alipay'
       }
      },
      chooseOrder(order){
        this.price = order.price
        this.currentOrder = order
        this.tradeForm.id = order.id
        this.tradeForm.direction = this.direction
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
        this.$refs["tradeForm"].validate(valid => {
          if (valid) {
            // 发送验证码吗
            codeSender().then(res=>{
              if(res.code === '200'){
                this.smsDialog = true;
              }else{
                this.$notify.error(this.$t('shitHappens'))
              }
            }).catch(_=>{})
          }
        });
      },
      doTrade(){
        let form = this.tradeForm
        console.log(form.id, form.direction, form.code, form.amount)
        // fbTrade(form.id, form.direction, form.code, form.amount).then(res => {
        //     dialogVisible = false
        //     if(res.code === '200'){
        //         this.$notify.success("下单成功，请于15分钟内完成交易")
        //         console.log(res)
        //         // this.push({ name: '***' })
        //     }else{
        //       this.$notify.error("下单失败"+ res.content.message)
        //       console.log(res)
        //     }
        // })
        
      },
      //界面
      getIcon(iconName) {
        return this.$store.getters.getPaymentIcon(iconName);
      },
      getAvatarColor(id) {
        return getAvatarColor(id);
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
      
    },
    watch: {
      direction(curVal,oldVal){
        this.page = 0,
        this.getMerchantList(this.page, this.onePageNum, this.direction, this.payments, this.coinId, this.cashId)
      },
      coinId(curVal,oldVal){
        this.page = 0,
        this.getMerchantList(this.page, this.onePageNum, this.direction, this.payments, this.coinId, this.cashId)
      },
      //  tradeForm: {
         
      //   // handler(curVal, oldVal){
      //   //   curVal.amount =  
      //   // },
      //   deep:true
      // },
          getAmount(newvalue,old){
           this.tradeForm.currency = newvalue*this.price
         },
         getCurrency(newvalue,old){
           this.tradeForm.amount = newvalue/this.price
         },
      
    },
    computed: {
      getAmount(){
        return this.tradeForm.amount
      },
      getCurrency(){
        return this.tradeForm.currency
      }
    },
  
  };
</script>



<style lang="scss" scoped>
   .search-box {
       text-align: right;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
  }
  .trade-content {
    width: 90%; // background: #fff;
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
      display: flex;
      // flex-direction: column;
     
    }
    .trade-select {
      display: flex;
      justify-content: space-between;
      .coin-choice /deep/ {
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
   
    .iconfont {
      font-size: 18px;
    }
    .icon-alipay {
      color: deepskyblue;
    }
    .icon-wechat {
      color: forestgreen;
    }
    .icon-yinhangqia {
      color: yellowgreen;
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
         margin: 40px 20px 0 0 !important;
      } 
</style>