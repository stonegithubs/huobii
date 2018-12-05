<template>
  <div class="cc-exchange">
    <div class="sidebar">
      <!--<sidebar-img></sidebar-img>-->
      <sidebar-chart></sidebar-chart>
      <sidebar-notice></sidebar-notice>
    </div>
    <div class="cc-content">
      <!--k线图-->

      <hb-chart></hb-chart>

      <div class="trade-wrap">
        <!--交易栏-->
        <trade-panel></trade-panel>
        <!--最新报价-->
        <order-book></order-book>
      </div>

      <!--正在委托-->
      <open-orders  v-if="this.$store.state.user.token"></open-orders>
      <!--历史委托-->
      <order-history  v-if="this.$store.state.user.token"></order-history>

      <div class="market-wrap">
        <!--深度图-->
        <market-depth></market-depth>
        <!--实时成交-->
        <market-trades></market-trades>

      </div>

      <!--币种资料-->
      <coin-detail></coin-detail>


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
  name: "ccExchange",
  components: {
    'sidebar-img':sidebarImg,
    'sidebar-chart':sidebarChart,
    'sidebar-notice':sidebarNotice,
    'hb-chart':hbChart,
    'open-orders': openOrders,
    'order-history':orderHistory,
    'order-book':orderBook,
    'trade-panel':tradePanel,
    'market-depth':marketDepth,
    'coin-detail':coinDetail,
    'market-trades':marketTrades
  },
  created(){
     this.$store.dispatch('getSupportCoin')
  }


}
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme";
  .cc-exchange {
    width: 1500px;
    margin: auto;
    .sidebar {
      width: 360px;
      float: left;
      /*margin-left: 10px;*/
      color: #c7cce6;
      font-size: 14px;
    }
    .cc-content {
      width: 1136px;
      margin-left: 370px;
      margin-top: 10px;
      .trade-wrap {
        margin-top: 15px;
        width: 1136px;
        height: 490px;
        position: relative;
        .trade-panel {
          position: absolute;
          top: 0;
          left: 0;
        }
        .order-book {
          position: absolute;
          right: 0;
        }

      }
      .open-orders {
        margin-top: 10px;
      }
      .order-history {
        margin-top: 10px;
      }
      .market-wrap {
        height: 100%;
        .market-depth {
          display: inline-block;
          margin-top: 10px;
          float: left;
        }
        .market-trades {
          display: inline-block;
          margin-left: 10px;
          margin-top: 10px;
        }
      }

      .coin-detail {
        margin-top: 10px;
        margin-bottom: 20px;
      }
    }
  }

</style>
