<template>
  <div class="order">
    <el-tabs v-model="activeName" type="card" >
      <el-tab-pane label="当前委托" name="first">
        <current-order/>
      </el-tab-pane>
      <el-tab-pane label="委托历史" name="second">
        <history-order/>
      </el-tab-pane>
      <el-tab-pane label="成交明细" name="third">
        <detail-order/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import currentOrder from './components/currentOrder'
import detailOrder from './components/detailOrder'
import historyOrder from './components/historyOrder'
export default {
  name: 'Index',
  components: {
    currentOrder,
    detailOrder,
    historyOrder
  },
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme";
  .order {
    width: 1200px !important;
    margin: 40px auto auto !important;
    .el-tabs {
      background-color: #181b2e;
    }
    .el-tabs__content {
      height: 500px;
      background-color: #1b1e2e;
      padding: 0 10px 10px 10px;
    }
     .hc-inner {
      background-color: #181b2a;
      height: 480px;
    }
    .el-tabs__header {
      background-color: #1b1e2e;
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
      margin: 0 0 10px;
    }
    .el-tabs__item {
      color: $hbColor;
      font-size: 16px;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      color: $hbHoverColor;
      border-bottom: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav,.el-tabs--card>.el-tabs__header .el-tabs__item {
      border: none;
    }

    .el-tabs--card>.el-tabs__header {
      border-bottom: none
    }
  }

</style>
