<template>
  <div class="trade-order">

    <el-table :data="order_list"
              :default-sort = "{prop: 'timeStamp', order: 'descending'}"
              style="width: 100%"
              class="hidden-xs-only">
      <el-table-column label="订单号">
        <template slot-scope="scope">
         <router-link :to="{ name:'orderDetail', params: { id: scope.row.id}}">{{ scope.row.id }}</router-link>
        </template>
      </el-table-column>

      <el-table-column label="交易类型">
        <template slot-scope="scope">
          <span :class="getSellTypeClass(scope.row.type)">{{ scope.row.type }} </span>{{scope.row.number}} {{scope.row.coinType}}
        </template>
      </el-table-column>

      <el-table-column label="总价">
        <template slot-scope="scope">
          {{ scope.row.total }} {{scope.row.currencyType}}
        </template>
      </el-table-column>

      <el-table-column label="单价">
        <template slot-scope="scope">
          {{ scope.row.price }} {{scope.row.currencyType}}
        </template>
      </el-table-column>

      <el-table-column label="手续费">
        <template slot-scope="scope">
          {{ scope.row.charge }} {{scope.row.coinType}}
        </template>
      </el-table-column>

      <el-table-column label="时间" prop="timeStamp">
        <template slot-scope="scope">
          {{ parseTime(scope.row.timeStamp,'{y}-{m}-{d} {h}:{i}')}}
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <span> <i :class="getStatusLogo(scope.row.status)"></i> {{ getStatusInfo(scope.row.status) }}</span>
        </template>
      </el-table-column>

      <el-table-column label="交易对象">
        <template slot-scope="scope">
          <router-link :to="{ name: 'trader', params: { id: scope.row.target_user.id }}">
            {{ scope.row.target_user.name }}
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="m-order-list hidden-sm-and-up">
      <span style="margin: 30px; font-size: 30px">我的订单</span>
        <div v-for="item in order_list" class="order-list">
          <div class="order-list-label">
            <span class="m-text-info">订单号</span>
            <span><router-link :to="{ name:'orderDetail', params: { id: item.id}}">{{item.id}}</router-link></span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">交易类型</span>
            <span :class="getSellTypeClass(item.type)">{{item.type}} </span> {{item.number}} {{item.coinType}}
          </div>
          <div class="order-list-label">
            <span class="m-text-info">交易数量</span>
            <span>{{item.number}} {{item.coinType}}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">总价</span>
            <span>{{item.id }} {{item.currencyType}}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">单价</span>
            <span>{{item.id }} {{item.currencyType}}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">手续费</span>
            <span>{{ item.id }} {{item.coinType}}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">时间</span>
            <span>{{ parseTime(item.id,'{y}-{m}-{d} {h}:{i}')}}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">状态</span>
            <span> <i :class="getStatusLogo(item.status)"></i> {{ getStatusInfo(item.status) }}</span>
          </div>
          <div class="order-list-label">
            <span class="m-text-info">交易对象</span>
            <router-link :to="{ name: 'trader', params: { id: item.target_user.id }}">
              {{ item.target_user.name }}
            </router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import { parseTime } from '../../utils/index'
export default {
  name: "trade-order",
  data(){
    return {
      order_list:[
        {id:'115397779328293',type:'sell',coinType:'BTC',number:'5643.213', total:'100420', price:'1212', currencyType:'CNY', charge:'122',timeStamp:"1540022881", status:'-1',target_user:{id:'1',name:'测试名'}},
        {id:'115397779328293',type:'sell',coinType:'BTC', number:'3.413',total:'100', price:'1212', currencyType:'CNY', charge:'122',timeStamp:"1541022887", status:'1',target_user:{id:'2',name:'测试名'}},
        {id:'115397779328293',type:'buy',coinType:'BTC',number:'31233.213', total:'1000245', price:'1212', currencyType:'CNY', charge:'122',timeStamp:"1540022187", status:'0',target_user:{id:'212',name:'测试名'}},
        {id:'115397779328293',type:'sell',coinType:'BTC',number:'343.213', total:'124000', price:'121212', currencyType:'CNY', charge:'122',timeStamp:"1540021887", status:'-1',target_user:{id:'312',name:'测试名'}},
        {id:'115397779328293',type:'sell',coinType:'BTC', number:'533',total:'10', price:'121', currencyType:'CNY', charge:'122',timeStamp:"1540022887", status:'1',target_user:{id:'125',name:'测试名'}},
        {id:'115397779328293',type:'buy',coinType:'BTC', number:'12443.213',total:'10240', price:'131', currencyType:'CNY', charge:'122',timeStamp:"1530022887", status:'0',target_user:{id:'1582',name:'测试名'}},
        {id:'115397779328293',type:'sell',coinType:'BTC', number:'533',total:'1450', price:'112312', currencyType:'CNY', charge:'122',timeStamp:"1540012887", status:'1',target_user:{id:'182',name:'测试名'}},
        {id:'115397779328293',type:'sell',coinType:'BTC',number:'348713', total:'1645300', price:'1231', currencyType:'CNY', charge:'122',timeStamp:"1550022887", status:'-1',target_user:{id:'122',name:'测试名'}},
        {id:'115397779328293',type:'buy',coinType:'BTC',number:'124213', total:'101', price:'12', currencyType:'CNY', charge:'122',timeStamp:"1540022457", status:'0',target_user:{id:'112',name:'测试名'}},
      ],
    }
  },
  methods: {
    getSellTypeClass(type){
      if(type === 'sell'){
        return 'type-sell'
      } else  {
        return 'type-buy'
      }
    },
    parseTime(time,obj){
      return parseTime(time,obj)
    },
    getStatusLogo(i){
      if(i === '-1'){
        return 'order-cancel el-icon-circle-close'
      }else if(i === '0') {
        return 'order-success el-icon-circle-check\n'
      }else {
        return 'order-pending el-icon-loading'
      }
    },
    getStatusInfo(i){
        if(i === '-1'){
          return '已取消'
        }else if(i === '0') {
          return '已放行'
        }else {
          return '未付款'
        }
    }

  },

}
</script>

<style lang="scss" scoped>
  .trade-order {
    width: 90%;
    margin: auto;
    margin-top: 40px;
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
