<template>
  <div class="trade-order">
    <div class="trade-inner">
      <h2>{{$t('order.myOrders')}}</h2>
      <el-table
        v-loading='isLoading'
        :data="order_list"
        :default-sort = "{prop: 'timeStamp', order: 'descending'}"
        style="width: 100%"
        class="hidden-xs-only">
        <el-table-column :label="$t('order.orderNo')">
          <template slot-scope="scope">
            <router-link :to="{ name:'orderDetail', params: { id: scope.row.id}}">{{ scope.row.id }}</router-link>
          </template>
        </el-table-column>

        <el-table-column :label="$t('order.orderType')">
          <template slot-scope="scope">
            <span :class="scope.row.direction === 1? 'sell': 'buy'">{{ scope.row.direction ==='1'? '卖出': '买入' }} </span>{{ scope.row.amount.toFixed(6) }} {{ getCoinNameByID(scope.row.coinId).toUpperCase() }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('order.orderTotal')">
          <template slot-scope="scope">
            {{ (scope.row.price*scope.row.amount).toFixed(6) }}{{  getCashNameById(scope.row.cashId).toUpperCase() }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('exchange.main.price')">
          <template slot-scope="scope">
            {{ scope.row.price.toFixed(6) }} {{  getCashNameById(scope.row.cashId).toUpperCase() }}
          </template>
        </el-table-column>

        <el-table-column :label="$t('order.fee')">
          <template slot-scope="scope">
            {{ scope.row.fee.toFixed(6) }} {{  getCoinNameByID(scope.row.coinId).toUpperCase() }}
          </template>
        </el-table-column>

        <el-table-column width='200px' :label="$t('exchange.main.time')" prop="timeStamp">
          <template slot-scope="scope">
            <!-- {{ parseTime(scope.row.updateDate,'{y}-{m}-{d} {h}:{i}') }} -->
            {{scope.row.updateDate}}
          </template>
        </el-table-column>

        <el-table-column :label="$t('exchange.main.status')">
          <template slot-scope="scope">
            <span> <i :class="getStatusLogo(scope.row.status)"/> {{ getStatusInfo(scope.row.status) }}</span>
          </template>
        </el-table-column>

        <el-table-column :label="$t('order.orderUser')">
          <template slot-scope="scope">
            <router-link :to="{ name: 'trader', params: { id: scope.row.userId }}">
              {{ scope.row.user.name }}
            </router-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="m-order-list hidden-sm-and-up">
        <span style="margin: 30px; font-size: 30px">{{$t('exchange.main.status')}}</span>
        <div v-for="item in order_list" class="order-list">
          <div class="order-list-label">
            <span class="m-text-info">订单号</span>
            <span><router-link :to="{ name:'orderDetail', params: { id: item.id}}">{{ item.id }}</router-link></span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">交易类型</span>
            <span :class="getSellTypeClass(item.type)">{{ item.type }} </span> {{ item.number }} {{ item.coinType }}
          </div>
          <div class="order-list-label">
            <span class="m-text-info">交易数量</span>
            <span>{{ item.number }} {{ item.coinType }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">总价</span>
            <span>{{ item.id }} {{ item.currencyType }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">单价</span>
            <span>{{ item.id }} {{ item.currencyType }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">手续费</span>
            <span>{{ item.id }} {{ item.coinType }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">时间</span>
            <span>{{ parseTime(item.id,'{y}-{m}-{d} {h}:{i}') }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">状态</span>
            <span> <i :class="getStatusLogo(item.status)"/> {{ getStatusInfo(item.status) }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">交易对象</span>
            <router-link :to="{ name: 'trader', params: { id: item.target_user.id }}">
              {{ item.target_user.name }}
            </router-link>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { parseTime } from '../../utils/index'
import { fbOrders } from '../../api/coin_trade'
import { mapGetters } from 'vuex';
export default {
  name: 'TradeOrder',
  data() {  
    return {
      order_list: [{
        "amount": 0,
        "cashId": "1",
        "coinId": "1",
        "direction": "string",
        "expire": 0,
        "fee": 0,
        "id": "123123123123",
        "max": 0,
        "message": "string",
        "min": 0,
        "paywayIds": "string",
        "price": 0,
        "remarks": "string",
        "status": "9",
        "tradeAmount": 0,
        "tradeTime": "2018-12-11T12:00:41.693Z",
        "type": "string",
        "updateDate": "2018-12-11T12:00:41.693Z",
        "user": {
          "companyId": "string",
          "country": {
            "abbr": "string",
            "code": "string",
            "enName": "string",
            "id": "string",
            "name": "string",
            "remarks": "string",
            "updateDate": "2018-12-11T12:00:41.693Z"
          },
          "countryCode": "string",
          "discount": 0,
          "email": "string",
          "freezeFlag": "string",
          "id": "string",
          "loginDate": "2018-12-11T12:00:41.693Z",
          "loginFlag": "string",
          "loginIp": "string",
          "loginName": "string",
          "mobile": "string",
          "name": "string",
          "no": "string",
          "officeId": "string",
          "phone": "string",
          "photo": "string",
          "recommendCode": "string",
          "recommenderId": "string",
          "regIp": "string",
          "remarks": "string",
          "score": 0,
          "updateDate": "2018-12-11T12:00:41.693Z",
          "userType": "string"
        },
        "userId": "string"
      }],
      isLoading: true,
      localId: 1,
      foreignId: 1,
      state: 10,
      start: '2018-12-10',
      end: '2022-12-12',
      order: '1',

    }
  },
  created(){
    this.isLoading = true
    this.$store.dispatch('getSupportCoin')
    fbOrders(0,100,10,this.localId,this.foreignId, this.state,this.start,this.end,this.order)
    .then(res=>{
      this.order_list = res.content
      this.isLoading = false
    }).catch(_=>{
      this.isLoading = false
      console.log(_)})
  },
  methods: {
    getSellTypeClass(type) {
      if (type === '1') {
        return 'type-sell'
      } else {
        return 'type-buy'
      }
    },
    parseTime(time, obj) {
      return parseTime(time, obj)
    },
    getStatusLogo(i) {
      if (i === '3') {
        return 'order-cancel el-icon-circle-close'
      } else if (i === '2') {
        return 'order-success el-icon-circle-check\n'
      } else if(i === '9') {
        return 'order-pending el-icon-loading'
      }
    },
    getStatusInfo(i) {
      if (i === '3') {
        return this.$t('order.canceled')
      } else if (i === '2') {
        return this.$t('order.passed')
      } else if(i === '9') {
        return this.$t('order.pending')
      }
    }

  },
  computed: {
    ...mapGetters([
      'getCoinNameByID',
      'getCashNameById'
    ])
  }

}
</script>

<style lang="scss" scoped>
  .trade-order {
    // width: 90%;
    // width: 1200px;
    // margin: auto;
    // padding-top: 40px;
    background-color: #fff;
    min-height: 800px;
    .trade-inner {
      width: 1200px;
      margin: auto;
      padding-top: 40px;
      h2 {
        font-size: 24px;
      }
      .el-table {
        margin-top: 40px;
      }
    }
    .type-sell {
      color: rgb(103, 201, 154);
      font-weight: 600;
    }
    .type-buy {
      color: #638BD4;
      font-weight: 600;

    }
    .order-cancel {
      color:#d6453c
    }
    .order-success {
      color: #55a532;
    }
    .order-pending {
        color: #7a98f7;
    }
    .el-table /deep/{
      a {
        color: #638bd4;
        text-decoration: none;
        transition: color .2s ease;
      }
    }
    .m-order-list {
      .order-list {
        padding-top: 24px;
        padding-bottom: 24px;
        border-bottom: 1px solid #dddee1;
        .order-list-label {
          font-size: 14px;
          display: flex;
          line-height: 2.4;
          a {
            color: #7a98f7;
          }
          .m-text-info {
            width: 100px;
            margin-right: 80px;
            color: #999;
          }
        }
      }
    }
  }
</style>
