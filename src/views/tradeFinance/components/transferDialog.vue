<template>
    <div class="transfer-dialog">
      <p class="font-gray font12" style="margin: 20px 0; ">请将{{coinInfo.name}}充值到以下地址</p>
      <p class="font18">{{coinInfo.address}}</p>
      <hr style="margin: 40px 0">
      <ul class="font12 font-gray tip-list">
        <li style="color: red">法币交易账户与币币交易账户共用一个{{ coinInfo.name }}的充值地址{{ coinInfo.name }}充值到账后会在下面的币币交易账户显示，通过划转功能 转至 法币交易账户后即可进行法币买卖交易</li>
        <li>请勿向上述地址充值任何非{{ coinInfo.name }}资产，否则资产将不可找回。</li>
        <li>您充值至上述地址后，需整个网络节点的确认，1次网络确认后可划转，到账时间一般为10分钟-60分钟。</li>
        <li>最小充值金额{{ coinInfo.min_amount }}小于最小金额的充值将不会上账。</li>
      </ul>

    </div>
</template>

<script>
    export default {
      name: "transfer-dialog",
      props:["coinInfo"],
      data(){
          return {

          }
      }
    }
</script>

<style lang="scss" scoped>
  .transfer-dialog {
    text-align: center;
  }
  .tip-list {
    padding: 0 10px;
    text-align: left;
    li {
      margin-bottom: 5px;
      list-style: disc;
    }
  }
</style>
