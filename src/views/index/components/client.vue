<template>
  <div class="client" :style="{ background: 'url('+ require('../../../assets/imgs/wrap_download.png') +') center no-repeat' }">
    <div class="wrap-in">
      <h3>多平台终端接入</h3>
      <p>覆盖iOS、Android、Windows、Mac多个平台，支持全业务功能</p>
      <div class="wrap-bg">
        <div class="download-app">
          <i class="iconfont icon-shouji-copy type"> </i>
          <i class="iconfont icon-pingguo logo"> </i>

          <i class="iconfont icon-shouji-copy type"> </i>
          <i class="iconfont icon-anzhuo logo"> </i>

          <i class="iconfont icon-diannao type"> </i>
          <i class="iconfont icon-weiruan logo"> </i>

          <a class="ios">IOS</a>
          <a class="android">Android</a>
          <a class="windows">Windows</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name: "client"
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/icons/iconfont.css";
  .client {
    height: 636px;
    .wrap-in {
      height: 500px;
      text-align: center;
      h3 {
        font-size: 28px;
        margin-bottom: 30px;
      }
      p {
        font-size: 15px;
      }
    }
    .wrap-bg {
      width: 830px;
      height:270px;
      margin: auto;
      .download-app {
        margin-top: 70px;
        height: 150px;
        width: 474px;
        position: relative;
        .iconfont {
          position: absolute;
        }
        :nth-child(1) {
          font-size: 100px;
          left: 140px;
          top: 10px;
        }
        :nth-child(2){
          font-size: 26px;
          left: 178px;
          top: 53px;
        }
        :nth-child(3){
          font-size: 100px;
          left: 350px;
          top: 10px;
        }
        :nth-child(4){
          font-size: 39px;
          left: 381px;
          top: 42px;
        }
        :nth-child(5){
          font-size: 150px;
          left: 574px;
          top: -25px;

        }
        :nth-child(6){
          font-size: 48px;
          left: 624px;
          top: 35px;
        }
        a {
          display: inline-block;
          background-color: transparent;
          position: absolute;
          bottom: 0;
          height: 26px;
          line-height: 26px;
          min-width: 115px;
          text-align: center;
          border-radius: 20px;
          border: 1px solid;
          transition: all .2s ease-in-out;
          &:hover {
            background-color: #7a98f7;
            color:#FFF
          }
        }
        .ios {
          left: 129px;
          top: 168px;
        }
        .android {
          left: 342px;
          top: 168px;
        }
        .windows {
          left: 588px;
          top: 168px;
        }
      }
    }
  }
</style>
