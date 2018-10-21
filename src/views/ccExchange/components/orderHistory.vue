<template>
  <div class="order-history">
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
        :data="orderHistoryData"
        style="width: 100%">
        <el-table-column
          prop="date"
          label="时间"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="交易对"
          width="180">
        </el-table-column>
        <el-table-column
          prop=""
          label="方向">
        </el-table-column>
        <el-table-column
          prop=""
          label="价格(BTC)">
        </el-table-column>
        <el-table-column
          prop=""
          label="数量(ETC)">
        </el-table-column>
        <el-table-column
          prop=""
          label="委托总额(ETC)">
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
export default {
  name: "order-history",
  data(){
    return {
      orderHistoryData: [],
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .order-history {
    width: 1136px;
    min-height: 190px;
    /*background-color: darkgoldenrod;*/
    .title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
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
        min-height:140px;
      }
      .el-table th, .el-table tr {
        background-color: #181b2a;
      }
      .el-table--border::after, .el-table--group::after, .el-table::before {
        display: none;
      }
      .el-table td, .el-table th.is-leaf {
        border-bottom: none;
      }
    }
  }
</style>
