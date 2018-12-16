<template>
  <div
    :style="{ background: 'url('+ require('../../../assets/imgs/wrap_download.png') +') center no-repeat' }"
    class="client"
  >
    <div class="wrap-in">
      <h3>{{ $t('index.client.title') }}</h3>
      <p>{{ $t('index.client.dsc') }}</p>
      <div class="wrap-bg">
        <div class="item">
          <embed
            :src="require('@/assets/svg/android.svg')"
            width="80"
            height="80"
            type="image/svg+xml"
            pluginspage="http://www.adobe.com/svg/viewer/install/"
          >
          <el-popover
            placement="bottom"
            width="130"
            trigger="hover"
          >
          <div id="android"></div>
            <el-button plain size="small"  round slot="reference">Android</el-button>
          </el-popover>
        </div>
        <div class="item">
          <embed
            :src="require('@/assets/svg/apple.svg')"
            width="80"
            height="80"
            type="image/svg+xml"
            pluginspage="http://www.adobe.com/svg/viewer/install/"
          >
          <el-popover
            placement="bottom"
            width="130"
            trigger="hover"
          >
          <div id="ios"></div>
            <el-button plain size="small"  round slot="reference">IOS</el-button>
          </el-popover>
        </div>
        <div class="item">
          <embed
            :src="require('@/assets/svg/windows.svg')"
            width="80"
            height="80"
            type="image/svg+xml"
            pluginspage="http://www.adobe.com/svg/viewer/install/"
          >
          <el-popover
            placement="bottom"
            width="130"
            trigger="hover"
          >
           
          <div id="windows"></div>
            <el-button plain size="small"  round slot="reference">Windows</el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qrCode from 'qrcodejs2'
import { getClientLink } from "@/api/cms";
export default {
  name: "Client",
  data() {
    return {
      linkList: []
    };
  },
  created() {
    getClientLink().then(res => {
      // console.log(res)
      this.linkList = res.content;
      this.qrcode(this.linkList[0].image,'windows')
      this.qrcode(this.linkList[0].image,'ios')
      this.qrcode(this.linkList[0].image,'android')
    });
    
  },
  methods:{
    qrcode(url,client) {
      setTimeout(()=>{
        const qrcode = new qrCode(client, {
        width: 150, // 设置宽度，单位像素
        height: 150, // 设置高度，单位像素
        text: url // 设置二维码内容或跳转地址
      })
      },1)
      
    },
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/icons/iconfont.css";
.client {
  height: 636px;
  background-color: #152940 !important;
  padding-top: 80px;
  .wrap-in {
    height: 500px;
    text-align: center;
    color: #f2f3f8;
    h3 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    p {
      font-size: 15px;
      color: #9eb5ca;
    }
  }
  .wrap-bg {
    width: 830px;
    height: 360px;
    margin: auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    align-content: center;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      align-content: center;
      .el-button {
        margin: 20px 0;
        background-color: transparent;
        color: #9eb5ca;
        border-color: #9eb5ca;
        &:hover {
          opacity: .8;
          border-color: #9eb5ca;
        }
      }
    }
    // .download-app {
    //   margin-top: 70px;
    //   height: 150px;
    //   width: 474px;
    //   position: relative;
    //   .iconfont {
    //     position: absolute;
    //   }
    //   :nth-child(1) {
    //     font-size: 100px;
    //     left: 140px;
    //     top: 10px;
    //   }
    //   :nth-child(2){
    //     font-size: 26px;
    //     left: 178px;
    //     top: 53px;
    //   }
    //   :nth-child(3){
    //     font-size: 100px;
    //     left: 350px;
    //     top: 10px;
    //   }
    //   :nth-child(4){
    //     font-size: 39px;
    //     left: 381px;
    //     top: 42px;
    //   }
    //   :nth-child(5){
    //     font-size: 150px;
    //     left: 574px;
    //     top: -25px;

    //   }
    //   :nth-child(6){
    //     font-size: 48px;
    //     left: 624px;
    //     top: 35px;
    //   }
    //   a {
    //     display: inline-block;
    //     background-color: transparent;
    //     position: absolute;
    //     bottom: 0;
    //     height: 26px;
    //     line-height: 26px;
    //     min-width: 115px;
    //     text-align: center;
    //     border-radius: 20px;
    //     border: 1px solid;
    //     transition: all .2s ease-in-out;
    //     &:hover {
    //       background-color: #7a98f7;
    //       color:#FFF
    //     }
    //   }
    //   .ios {
    //     left: 129px;
    //     top: 168px;
    //   }
    //   .android {
    //     left: 342px;
    //     top: 168px;
    //   }
    //   .windows {
    //     left: 588px;
    //     top: 168px;
    //   }
    // }
  }
}
</style>
