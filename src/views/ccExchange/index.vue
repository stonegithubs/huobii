<template>
  <div class="cc-exchange">
    <div class="sidebar">
      <!--<sidebar-img></sidebar-img>-->
      <sidebar-chart/>
      <sidebar-notice/>
    </div>
    <div class="cc-content">
      <!--k线图-->
      <hb-chart/>
      <div class="trade-wrap">
          <!--交易栏-->
          <trade-panel/>
        <!--最新报价-->
          <order-book/>
      </div>
      <!--正在委托-->
      <open-orders v-if="this.$store.state.user.token" />
      <!--历史委托-->
      <order-history v-if="this.$store.state.user.token" />

      <div class="market-wrap">
      <!--深度图-->
            <!-- <market-depth/> -->
          <coin-detail/>
            <!--实时成交-->
            <market-trades/>
      </div>
      <!--币种资料-->
    </div>
  </div>
</template>

<script>
  import sidebarImg from './components/siderbarImg'
  import sidebarChart from './components/sidebarChart'
  import sidebarNotice from './components/sidebarNotice'
  import hbChart from './components/hbChart'
  import openOrders from './components/openOrders'
  import orderHistory from './components/orderHistory'
  import orderBook from './components/orderBook'
  import tradePanel from './components/tradePanel'
  import marketDepth from './components/marketDepth'
  import coinDetail from './components/coinDetail'
  import marketTrades from './components/marketTrades'
  export default {
    name: 'CcExchange',
    components: {
      'sidebar-img': sidebarImg,
      'sidebar-chart': sidebarChart,
      'sidebar-notice': sidebarNotice,
      'hb-chart': hbChart,
      'open-orders': openOrders,
      'order-history': orderHistory,
      'order-book': orderBook,
      'trade-panel': tradePanel,
      'market-depth': marketDepth,
      'coin-detail': coinDetail,
      'market-trades': marketTrades
    },
    created() {
      this.$store.dispatch('getSupportCoin')
    }
  }
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme";
  .cc-exchange {
    min-width: 1200px;
    // margin-top: 10px; // display: flex;
    // margin-left:10px; 
    padding: 10px;
    .sidebar {
      @media only screen and (min-width: 1400px) {
        width: 360px;
      }
      @media only screen and (max-width: 1400px) {
        width: 280px;
      } // width: 360px;
      float: left;
      /*margin-left: 10px;*/
      color: #c7cce6;
      font-size: 14px;
    }
    .cc-content {
      @media only screen and  (min-width: 1400px) {
        // width: 1136px;
        margin-left: 370px;
      }
      @media only screen and (max-width: 1400px) {
        margin-left: 285px;
      } // margin-top: 10px;
      .trade-wrap {
        margin-top: 10px; // width: 1136px;
        // width: 100%;
        height: 490px;
        position: relative;
        display: flex;
        justify-content: space-between;
        .trade-panel {
          // position: absolute;
          width: 70%;
          // top: 0;
          // left: 0;
          // display: table-cell;
          // margin-right: 10px;
        }
        .order-book {
          // position: absolute;
          // right: 0;
          // display: table-cell;
          // vertical-align: top;
        }
      }
      .open-orders {
        margin-top: 10px;
      }
      .order-history {
        margin-top: 10px;
      }
      .market-wrap {
        // height: 100%;
        display: flex;
        margin-top: 10px;
        justify-content: space-between; 
        .market-depth {
          // display: inline-block;
          // margin-top: 10px;
          // float: left;
        }
        .market-trades {
          display: inline-block;
          margin-left: 10px;
        }
      }
      .coin-detail {
        // margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  }
</style>
