<template>
  <div class="order-history">
    <div class="hb-tab">
      <div class="mod-name">
        <span>历史委托</span>
      </div>
  
    </div>
    <div class="inner">
    
     <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            :label="$t('exchange.main.time')"
            width="180">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeTime }}</span>
            </template>
          </el-table-column>

          <el-table-column
          :label="$t('index.tradeShow.pair')"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.forgCoinId }}/{{ scope.row.localCoinId }}</span>
            </template>
          </el-table-column>
          <!-- todo:这里id要查询到币种 -->

          <el-table-column
            :label="$t('exchange.main.direction')">
          <template slot-scope="scope">
              <span>{{ scope.row.direction }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('exchange.main.price')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
          <template slot-scope="scope">
              <span>{{ scope.row.price }}</span>
            </template>
          </el-table-column>

          <el-table-column
            :label="$t('exchange.main.amount')+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ scope.row.amount }}</span>
            </template>
          </el-table-column>

          <el-table-column
           :label="$t('exchange.main.total')+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
            <template slot-scope="scope">
              <span>{{ scope.row.tradeAmount }}</span>
            </template>
          </el-table-column>

          <el-table-column
            prop=""
            :label="$t('exchange.main.deal')">
          </el-table-column>
          
          <el-table-column
            prop=""
            :label="$t('exchange.main.notClosed')">
          </el-table-column>
          <el-table-column
            prop=""
            :label="$t('exchange.main.operation')">
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
      // background-color: #1b1e2e;
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
        // background-color: #181b2a;
        color: $hbColor;
        font-size: 13px;
        min-height:140px;
      }
      .el-table th, .el-table tr {
        // background-color: #181b2a;
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
