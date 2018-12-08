<template>
  <div class="trade-finance">
    <div class="top-info">
      <div>
        <h2 class="font18">{{$t('wallet.myProperty')}}</h2>
      </div>
      <!-- <div class="value-show">
        <p class="font14">

          <span class="font-gray">总资产折合: </span>
          {{ estimatedValue }} {{ valueType }}
          ≈ {{ estimatedCurrency }}  <span class="font-blue font-weight">{{ $store.getters.getCurrencyType}}</span>
        </p>
        <span style="margin: 0 20px; color: #999999;"> | </span>
        <p class="font14">
          <span class="font-gray">缴纳保证金: </span>
          {{ estimatedValue }} {{ $store.getters.getCurrencyType}}
        </p>
      </div> -->

    </div>
    <trade-assets/>
    <assets-detail/>
  </div>
</template>

<script>
  import assetsDetail from './components/assetsDetail'
  import tradeAssets from './components/tradeAssets'
export default {
  name: "tradeFinance",
  components: {
    assetsDetail,
    tradeAssets
  },
  data(){
    return {
      estimatedValue: 0.00000,    //折合虚拟货币
      valueType: "BTC",           //虚拟货币种类
      estimatedCurrency: 0.00,    //折合现金
      securityDeposit: 0.00000,   //保证金
      securityDepositType: "HT",  //保证金币种

    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
  .trade-finance {
    @media (min-width: 768px) {
      width: 70%;
    }
    @media (max-width: 768px) {
      width: 90%;
    }
    margin: auto;
    
    .top-info {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin: 30px 0;
      .value-show {
        display: flex;
        align-items: center;
        p {
          margin: 0;
        }
      }
    }
  }

</style>
