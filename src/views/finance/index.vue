<template>
  <div class="finance">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="交易账户" name="first">
        <m-finance></m-finance>
      </el-tab-pane>
      <el-tab-pane label="杠杆账户" name="second">
        <margin></margin>
      </el-tab-pane>
    </el-tabs>
    <div class="add-info">
      <router-link :to="{ name: 'withdrawLog' }" style="margin-right: 20px">财务记录</router-link>
      <router-link :to="{ name: 'withdrawLog' }">提币地址管理</router-link>
    </div>
  </div>
</template>

<script>
  import mFinance from './components/mFinance'
  import margin from './components/margin'
  export default {
    name: "finance",
    components: {
      mFinance,
      margin,
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
  .finance {
    width: 1200px !important;
    margin: 40px auto auto !important;
    position: relative;
    .add-info {
      position: absolute;
      top: 12px;
      right: 20px;
      color: #7a98f7;
      transition: all .2s ease-in-out;
      font-size: 16px;
    }
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
