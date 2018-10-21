<template>
  <div class="login" :style="{ background: 'url('+ BackgroundURL +') center no-repeat'}">
      <div class="lg-form">
        <h1>数字资产交易平台</h1>
        <loginForm></loginForm>
      </div>
      <div class="lg-text">
        <h3>还不是BT交易所的用户？</h3>
        <p>立即注册，开始交易</p>
        <p><router-link :to="{ name: 'registry' }">免费注册</router-link></p>
      </div>
    </div>
</template>

<script>
  import loginForm from './components/loginForm'
  export default {
    name: 'login',
    components: {
      loginForm
    },
  data() {
    return {
      BackgroundURL: require('../../assets/imgs/login.png')
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  @import "../../assets/custom-theme/theme.scss";
  .login {
    width: 1200px !important;
    margin: auto;
    height: 800px;
    .lg-form {
      width: 520px;
      height: 500px;
      float: left;
      margin-top: 15px;

      h1 {
        margin-top: 100px;
        margin-bottom: 50px;
        margin-left: 100px;
        font-size: 40px;
      }
    }
    .lg-text {
      width: 570px;
      height: 265px;
      float: right;
      margin-top: 150px;
      color:#61688a;
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
