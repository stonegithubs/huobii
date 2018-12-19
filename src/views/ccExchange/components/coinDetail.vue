<template>
  <div class="coin-detail">
    <div class="hb-tab">
      <span>{{$t('exchange.main.coinDetail')}}</span>
    </div>
    <div class="cd-inner">
      <div class="cd-left">
        <h3>
          <span style="text-transform: uppercase;">{{title}}</span>
          <br>
          {{coinData.introduction}}
        </h3>
        <div class="cd-line"/>
        <div class="cd-in">
          <span
            style="color: #61688a;font-size: 14px;margin-bottom: 10px;display: inline-block"
          >{{$t('exchange.main.coinDesc')}}</span>

          <div class="text-wrapper" v-html="html_decode(coinData.content)"></div>
          <!-- {{ html_decode(coinData.content) }}  -->
          <!-- <div>{{{ coinData.content }}}</div> -->
        </div>
      </div>
      <div class="cd-right">
        <ul>
          <li>
            <span>{{$t('exchange.main.pubDate')}}</span>
            <p>{{parseTime(coinData.publishDate)}}</p>
          </li>
          <li>
            <span>{{$t('exchange.main.pubAmount')}}</span>
            <p>{{coinData.totalSupply}}</p>
          </li>
          <li>
            <span>{{$t('exchange.main.tradeAmount')}}</span>
            <p>{{coinData.totalSupply}}</p>
          </li>
          <li>
            <span>{{$t('exchange.main.whitepaper')}}</span>
            <p>
              <a :href="coinData.whitePaperUrl">{{coinData.whitePaperUrl}}</a>
            </p>
          </li>
          <li>
            <span>{{$t('exchange.main.nowPrice')}}</span>
            <p>{{coinData.price}}</p>
          </li>
          <!-- <li><span>白皮书</span><p><a href="https://github.com/ethereum/wiki/wiki/%5BEnglish%5D-White-Paper">https://github.com/ethereum/wiki/wiki/%5BEnglsssssssssssssssssssssssssssssssssssssssssssish%5D-White-Paper</a></p></li> -->
          <li>
            <span>{{$t('exchange.main.webSite')}}</span>
            <p>
              <a :href="coinData.officialUrl">{{coinData.officialUrl}}</a>
            </p>
          </li>
          <li>
            <span>{{$t('exchange.main.block')}}</span>
            <p>
              <a :href="coinData.exporerUrl">{{coinData.exporerUrl}}</a>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getCoinDetail } from "@/api/cms";
import { mapGetters } from "vuex";
import { setTimeout } from "timers";
import { parseTime } from "@/utils";

export default {
  name: "CoinDetail",
  data() {
    return {
      title: "ETC",
      coinData: {
        id: "2",
        content: "&lt;p&gt;\r\n\t泰达币测试正文&lt;/p&gt;",
        introduction: "泰达币测试介绍",
        publishDate: 1540900984000,
        totalSupply: "1111111111",
        price: "1",
        whitePaperName: "泰达币白皮书",
        whitePaperUrl:
          "https://baike.baidu.com/item/%E6%AF%94%E7%89%B9%E5%B8%81/4143690",
        officialUrl: "https://bitcoin.org/",
        exporerUrl: "https://www.blockchain.com/zh-cn/explorer"
      }
    };
  },
  created() {
    this.getDetail();
  },
  computed: {
    ...mapGetters(["getTargetCoin", "getCoinIdByName"]),
    targetCoin() {
      return this.$store.state.coinData.targetCoin;
    }
  },
  methods: {
    parseTime(a) {
      return parseTime(a);
    },
    getDetail() {
      setTimeout(() => {
        let id = this.getCoinIdByName(this.targetCoin);
        getCoinDetail(id).then(res => {
          this.title = res.content.title;
          this.coinData = res.content.data;
        });
      }, 1000);
    },
    html_decode(str) {
      let s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "<");
      s = s.replace(/&gt;/g, ">");
      s = s.replace(/&nbsp;/g, " ");
      s = s.replace(/&#39;/g, "'");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(/<br\/>/g, "\n");
      return s;
    }
  },
  watch: {
    targetCoin() {
      this.getDetail();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/custom-theme/theme";

.coin-detail {
  // width: 1136px;
  // width:802px;
  width: 66.3%;
  min-height: 424px;
  // margin-top: 0;

  .cd-title {
    height: 48px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
    // background-color: #1b1e2e;
    font-size: 16px;
    line-height: 48px;
    padding-left: 20px;
  }
  .cd-inner {
    height: 430px;
    background-color: #fff;
    overflow: hidden;
    padding: 10px 30px 30px;
    display: flex;
    justify-content: space-between;
    .cd-left {
      // float: left;
      // width: 160px;
      padding-right: 30px;
      .text-wrapper {
      max-height:   260px;
      overflow: hidden;
      text-overflow: ellipsis;

      }
      // width: 350px;
      max-width: 400px;
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
        // width: 90%;
        // background-color: $hbBackgroundColor;
        margin: 20px 0;
      }
      .cd-in {
        p {
          font-size: 14px;
        }
      }
    }
    .cd-right {
      padding-left: 5px;
      width: 40%;
      // float: right;
      // width: 570px;
      ul li {
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #eee;
        // color: #61688a;
        font-size: 14px;
        p {
          width: 70%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          // color: #c7cce6;
          a {
            color: $hbHoverColor;
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
