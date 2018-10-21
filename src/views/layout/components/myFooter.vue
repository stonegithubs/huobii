<template>
  <el-footer class="footer-wrapper">
    <el-container class="footer-inner">
        <dl>
          <dt><h1>{{ siteName }}</h1></dt>
          <dd style="margin-right: 60px"><p>{{ siteIntroduction}}</p></dd>
          <dd class="copyright" style=" margin-top: 90px;
    display: inline-block; margin-right: 60px">{{ copyright }}</dd>
        </dl>
        <dl style="margin-left: auto; width: 100px">
          <dt><h2>新手指南</h2></dt>
          <dd v-for="item in guide">
            <a href="#">{{item}}</a>
          </dd>
        </dl>
        <dl style="width: 100px">
          <dt><h2>币种资料</h2></dt>
          <dd v-for="item in coinInfo">
            <a href="#">{{item}}</a>
          </dd>
        </dl>
        <dl style="width: 100px">
          <dt><h2>服务协议</h2></dt>
          <dd v-for="item in agreement">
            <a href="#">{{item}}</a>
          </dd>
        </dl>
    </el-container>
  </el-footer>
</template>

<script>
import ElContainer from "element-ui/packages/container/src/main";
import { mapState } from 'vuex'
export default {
  name: "my-footer",
  components: {ElContainer},
  computed:{

  },

  data(){
    return{
      siteName: this.$store.state.staticData.siteName,
      siteIntroduction: this.$store.state.staticData.siteIntroduction,
      copyright:this.$store.state.staticData.copyright,
      guide: this.$store.state.staticData.guide,
      coinInfo:this.$store.state.staticData.coinInfo,
      agreement: this.$store.state.staticData.agreement,
    }
  }
}
</script>

<style lang="scss">
  .el-footer{
      min-height: 330px!important;
      height: auto;
      background-color: #181b2a;
      line-height: 14px;
      font-size: 14px;
      h1 {
        color: #c7cce6;
        height: 40px;
        font-size: 24px;
        line-height: 24px;
        font-weight: 400;
      }
      .footer-inner {
        color: #61688a;
        margin: auto;
        box-sizing: border-box;
        padding: 60px 20px 0;
        display: -ms-flexbox;
        display: flex;
        dl{
          margin-left: 100px;
          margin-bottom: 20px;
          flex-direction: row;
          flex-wrap: wrap;
          h2{
            height: 42px;
            line-height: 12px;
            font-size: 12px;
            font-weight: 400;
          }
          a{
            color: #c7cce6;
            display: inline-block;
            margin-bottom: 20px;
            &:hover {
              color: #7a98f7;
              text-decoration: none;
            }
          }
        }
      }
    }


</style>
