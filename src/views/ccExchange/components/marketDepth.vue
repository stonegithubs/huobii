<template>
  <div class="market-depth">
    <div class="hb-tab">
      <span>{{ $t('exchange.main.depth') }}</span>
    </div>
    <div class="md-inner"/>
  </div>
</template>

<script>
export default {
  name: 'MarketDepth'
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .market-depth {
    width: 681px;
    height: 520px;
    .md-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #fff;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }

  }
</style>
