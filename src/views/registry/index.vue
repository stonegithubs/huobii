<template>
  <div :style="{ background: 'url('+ BackgroundURL +') center no-repeat'}" class="login">
    <div class="lg-form">
      <h1>{{ $t('login.welcomeToRegist')}}</h1>
      <registry-form/>
    </div>
    <div class="lg-text">
      <!-- <p v-for="(item,index) in registryTip" v-bind:key="index">{{ item.message }}</p> -->
      <p>{{ $t('login.signUpTip1') }}</p>
      <p>{{ $t('login.signUpTip2') }}</p>
      <p>{{ $t('login.signUpTip3') }}</p>
      <p>{{ $t('login.signUpTip4') }}</p>
    </div>
  </div>
</template>

<script>
import registryForm from './components/registryForm'
export default {
  name: 'Registry',
  components: {
    registryForm
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

<style lang="scss" scoped>
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
