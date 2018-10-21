<template>
  <div class="coin-detail">
    <div class="cd-title">
      <span>币种资料</span>
    </div>
    <div class="cd-inner">
      <div class="cd-left">
        <h3>
          <span style="text-transform: uppercase;color: #61688a">etc</span>
          <br/>
          以太坊(Ethereum)
        </h3>
        <div class="cd-line"></div>
        <div class="cd-in">
          <span style="color: #61688a;font-size: 14px;margin-bottom: 10px;display: inline-block">简介</span>
          <p>以太坊（Ethereum）是下一代密码学账本，可以支持众多的高级功能，包括用户发行货币，智能协议，去中心化的交易和设立去中心化自治组织(DAOs)或去中心化自治公司（DACs）。以太坊并不是把每一单个类型的功能作为特性来特别支持，相反，以太坊包括一个内置的图灵完备的脚本语言，允许通过被称为“合同”的机制来为自己想实现的特性写代码。一个合同就像一个自动的代理，每当接收到一笔交易，合同就会运行特定的一段代码，这段代码能修改合同内部的数据存储或者发送交易。</p>
        </div>
      </div>
      <div class="cd-right">
        <ul>
          <li><span>发行时间</span><p>2014-07-24</p></li>
          <li><span>发行总量</span><p>9631.15 万</p></li>
          <li><span>流通总量</span><p>9631.15 万</p></li>
          <li><span>众筹价格</span><p>$0.31</p></li>
          <li><span>白皮书</span><p><a href="https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper">https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper</a></p></li>
          <li><span>官网</span><p><a href="https://www.ethereum.org/">https://www.ethereum.org/</a></p></li>
          <li><span>区块查询</span><p><a href="https://www.ethereum.org/">https://www.ethereum.org/</a></p></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coin-detail"
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .coin-detail {
    width: 1136px;
    min-height: 424px;

    .cd-title {
      height: 48px;
      box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
      background-color: #1b1e2e;
      font-size: 16px;
      line-height: 48px;
      padding-left: 20px;
    }
    .cd-inner {
      height: 400px;
      background-color: #181b2a;
      overflow: hidden;
      padding: 10px 30px 30px;
      .cd-left {
        float: left;
        width: 370px;
        h3 {
          font-size: 16px;
          span {
            font-size: 22px;
            margin: 10px 0;
            display: inline-block;
          }
        }
        .cd-line {
          height: 1px;
          width: 90%;
          background-color: $hbBackgroundColor;
          margin: 20px 0;
        }
        .cd-in {
          p {
            font-size: 14px;
          }
        }

      }
      .cd-right {
        float: right;
        width: 570px;
        ul li {
          height: 48px;
          line-height: 48px;
          border-bottom: 1px solid;
          color: #61688a;
          font-size: 14px;
          p {
            width: 70%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #c7cce6;
            a {
              color : $hbHoverColor
            }
          }
          span {
            float: left;
            width: 30%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
</style>
