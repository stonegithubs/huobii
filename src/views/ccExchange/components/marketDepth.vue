<template>
    <div class="market-depth">
      <div class="md-title">
        <span>深度图</span>
      </div>
      <div class="md-inner">

      </div>
    </div>
</template>

<script>
export default {
  name: "market-depth"
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
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .md-inner {
      background-color: #181b2a;
      height: 470px;
    }
  }
</style>
