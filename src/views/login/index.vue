

<template>
  <div class="login" :style="{ background: 'url('+ BackgroundURL +') center no-repeat'}">
    <div class="lg-form">
      <h1>数字资产交易平台</h1>
      <el-tabs v-model="activeName" >
        <el-tab-pane label="密码登陆" name="normal_login">
          <loginForm></loginForm>
        </el-tab-pane>
        <el-tab-pane label="快速登录" name="fast_login">
          <fastLoginForm></fastLoginForm>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="lg-text">
      <h3>还不是BT交易所的用户？</h3>
      <p>立即注册，开始交易</p>
      <p>
        <router-link :to="{ name: 'registry' }">免费注册</router-link>
      </p>
      <!-- <googleVerify></googleVerify> -->
    </div>
  </div>
</template>
<script>
  import loginForm from './components/loginForm'
  import fastLoginForm from './components/fastLoginForm'
  import {
    getCountry
  } from "../../api/common";
  import {mapGetters} from 'vuex'
  export default {
    name: 'login',
    components: {
      loginForm,
      fastLoginForm
    },
    data() {
      return {
        BackgroundURL: require('../../assets/imgs/login.png'),
        activeName: 'normal_login'
      }
    },
    methods: {
      countrySort(countrya, countryb) {
        return countrya.id - countryb.id
      }
    },
    computed:{
      ...mapGetters([
        'getCountry'
      ])
    },
    
    created() {
      if(getCountry.length === 0){
        this.$store.dispatch('getCountryList')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/custom-theme/theme.scss";
  .login /deep/ {
    width: 1200px !important;
    margin: auto;
    height: 800px;
    // background-color: #fcfdfd!important;
    .el-tabs__item {
      color: #c7cce6;
    }
    .el-tabs__nav-wrap::after {
      background: transparent;
    }
    .el-form-item__label {
      padding: 0;
      line-height: 0
    }
    .el-tabs__active-bar {
      background-color: #638BD4;
    }
    .is-active {
      color: #638BD4;
    }
    .el-tabs__header {
      margin: 40px 0;
    }
    .lg-form {
      width: 520px;
      height: 500px;
      float: left;
      margin-top: 15px;
      h1 {
        margin-top: 100px;
        margin-bottom: 50px; 
        font-size: 40px;
      }
    }
    .lg-text {
      width: 570px;
      height: 265px;
      float: right;
      margin-top: 150px;
      color: #61688a;
      h3 {
        font-size: 18px;
      }
      p {
        margin: 20px 0;
        font-size: 16px;
      }
      a {
        color: $hbHoverColor;
      }
    }
  }
</style>
