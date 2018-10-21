<template>
  <div class="hb-chart">
    <div class="hc-title">
      <span>BTC/USTD  6602  </span>
    </div>
    <div class="hc-inner">

    </div>
  </div>
</template>

<script>
export default {
name: "hb-chart",
data() {
      return {
        currentCoin: this.$store.state.coinData.symbolShow || 'btcsudt'
      }
  },
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .hb-chart {
    height: 528px;
    width: 1136px;
    .hc-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .hc-inner {
      background-color: #181b2a;
      height: 480px;
    }

  }
</style>
