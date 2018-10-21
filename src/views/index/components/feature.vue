<template>
  <div class="feature_wrap">
    <div class="section">
        <div class="feature">
          <div class="text-wrap fl">
            <h5>全球化的数字资产配置及交易服务</h5>
            <pre>遍布全球的项目拓展及运营管理体系
在多个国家和地区设有本地交易服务中心
服务超过130个国家的数百万用户</pre>
          </div>
          <div class="img-wrap fr "><img :src="require('../../../assets/imgs/feature_1.png')" ></div>
        </div >
        <div class="feature">
          <div class="img-wrap fl"><img :src="require('../../../assets/imgs/feature_2.png')" alt=""></div>
          <div class="text-wrap fr">
            <h5>SMART-Chain资产评估模型</h5>
            <pre>独立专业的区块链资产研究评估体系
长期跟踪产业链并提供最权威中立的资产分析
一站式的项目进度跟踪及信息披露系统</pre>
          </div>
        </div>
        <div class="feature">
          <div class="text-wrap fl">
            <h5>依托4年的数字资产安全风控经验</h5>
            <pre>安全稳定运营数字资产交易所超过四年
管理资产规模超过10亿美金，服务数百万用户
专业分布式架构和防DDOS攻击系统
98% 数字资产存储多重签名冷钱包</pre>
          </div>
          <div class="img-wrap fr "><img :src="require('../../../assets/imgs/feature_3.png')" alt=""></div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "feature"
    }
</script>

<style lang="scss">

  .feature_wrap {
    width: 100%;
    margin-top: 150px;
    position: relative;
      .section {
        min-height: 360px;
        height: 1500px;
        position: relative;
        font-size: 138%;
        margin: auto;
      }
      img {
        width: auto;
        height: 330px;
      }
      .feature {
        height: 500px;
        width: 1200px;
        margin: auto;
      h5 {
        padding-bottom: 25px;
        font-size: 34px;
        font-weight: 400;
        text-align: left;
      }
      pre {
        line-height: 32px;
        font-size: 18px;
        text-align: left;
        color:#c7cce6
      }
      }
      .text-wrap {
        width: 500px;
      }
      .img-wrap {
        width: 500px;
      }
      .fl {
        float: left;
      }
      .fr {
        float: right;
      }
  }

</style>
