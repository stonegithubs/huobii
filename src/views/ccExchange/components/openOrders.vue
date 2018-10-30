<template>
    <div class="open-orders">
      <div class="title">
        <div class="mod-name">
          <span>当前委托</span>
        </div>
        <!--<div class="mod-btn">-->
          <!--<a>买入</a>-->
          <!--<a>卖出</a>-->
          <!--<a>全部</a>-->
        <!--</div>-->
      </div>
      <div class="inner">
        <!--<ul class="l_th">-->
          <!--<li class="trade_time">时间</li>-->
          <!--&lt;!&ndash;<li class="trade_type">交易类型</li>&ndash;&gt;-->
          <!--<li>交易对</li>-->
          <!--<li>方向</li>-->
          <!--<li>价格 (BTC)</li>-->
          <!--<li>数量 (ETH)</li>-->
          <!--<li>委托总额 (BTC)</li>-->
          <!--<li>已成交</li>-->
          <!--<li>未成交</li>-->
          <!--<li>操作</li>-->
        <!--</ul>-->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            label="时间"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
            label="交易对">
            <template slot-scope="scope">
              <span>{{ scope.row.forgCoinId }}/{{ scope.row.localCoinId }}</span>
            </template>
          </el-table-column>
          <!-- todo:这里id要查询到币种 -->

          <el-table-column
            label="方向">
          <template slot-scope="scope">
              <span>{{ scope.row.direction }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="'价格'+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
          <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="'数量'+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column
           :label="'委托总额'+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeAmount }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop=""
            label="已成交">
          </el-table-column>
          
          <el-table-column
            prop=""
            label="未成交">
          </el-table-column>
          <el-table-column
            prop=""
            label="操作">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
import { getOrder } from "../../../api/coin_trade";
export default {
  name: "open-orders",
  data() {
    return {
      // 当前委托列表
      openOrderList: [
        {
          amount: 0,
          direction: "string",
          fee: 0,
          forgCoinId: "string",
          id: "string",
          localCoinId: "string",
          price: 0,
          remarks: "string",
          status: "string",
          tradeAmount: 0,
          tradeTime: "2018-10-29T08:29:58.449Z",
          userId: "string"
        }
      ]
    };
  },
  created() {
    getOrder()
      .then(response => {
        this.openOrderList = response.records;
      })
      .catch(_ => {});
  }
};
</script>

<style lang="scss">
@import "../../../assets/custom-theme/theme";

.open-orders {
  width: 1136px;
  min-height: 190px;
  /*background-color: darkgoldenrod;*/
  .title {
    height: 48px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    background-color: #1b1e2e;
    font-size: 16px;
    line-height: 48px;
    padding-left: 20px;
    .mod-name {
      float: left;
    }
  }
  .inner {
    min-height: 142px;
    .el-table {
      background-color: #181b2a;
      color: $hbColor;
      font-size: 13px;
      min-height: 140px;
    }
    .el-table th,
    .el-table tr {
      background-color: #181b2a;
    }
    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      display: none;
    }
    .el-table td,
    .el-table th.is-leaf {
      border-bottom: none;
    }
  }
}
</style>
