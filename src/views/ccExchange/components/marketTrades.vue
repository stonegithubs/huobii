<template>
    <div class="market-trades">
      <div class="mt-title">
        <span>实时成交</span>
      </div>
      <div class="mt-inner">
        <el-table :data="marketTradesData"    style="width: 100%">
          <el-table-column
            prop="type"
            width="60"
            label="买/卖">
          </el-table-column>
          <el-table-column
            prop="price"
            :label="'价格'+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
          </el-table-column>
          <el-table-column
            prop="number"
            :label="'数量'+'('+this.$store.state.coinData.targetCoin.toUpperCase()+')'"
          >
          </el-table-column>
          <el-table-column
            prop="total"
            :label="'累计'+'('+this.$store.state.coinData.mainCoin.toUpperCase()+')'">
          </el-table-column>
        </el-table>
      </div>
    </div>
</template>

<script>
export default {
  name: "market-trades",
  data(){
    return {
      marketTradesData: [],
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .market-trades {
    width: 445px;
    height: 520px;
    /*background-color: lemonchiffon;*/
    .mt-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .mt-inner {
      height: 472px;
      .el-table {
        background-color: #181b2a;
        color: $hbColor;
        font-size: 13px;
        min-height:472px;
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
