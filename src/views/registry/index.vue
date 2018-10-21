<template>
  <div class="login" :style="{ background: 'url('+ BackgroundURL +') center no-repeat'}">
    <div class="lg-form">
      <h1>欢迎注册</h1>
      <registry-form></registry-form>
    </div>
    <div class="lg-text">
      <p v-for="item in registryTip">{{ item.message }}</p>
    </div>
  </div>
</template>

<script>
  import registryForm from './components/registryForm'
  export default {
    name: 'registry',
    components: {
      registryForm
    },
    data() {
      return {
        BackgroundURL: require('../../assets/imgs/login.png'),
        registryTip: [
          { message:'国籍信息注册后不可修改，请务必如实选择。'},
          { message:'验证邮件可能会被误判为垃圾邮件，请注意查收。'},
          { message:'请妥善保存您的Huobi账号及登录密码。'},
          { message:'请勿和其他网站使用相同的登'}
          ]
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
