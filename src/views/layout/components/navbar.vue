<template>
  <div class="nav">
    <div class="logo-wrapper">
      <router-link to="/">
        <img class="logo" :src="LOGO" >
    </router-link>
    </div>
    <div style="width: 86%">
      <el-menu :default-active="$route.path" text-color="#c7cce6" background-color="#181b2a" active-text-color="#7a98f7" class="el-menu-demo" mode="horizontal">
        <slot name="nav-item">
          <el-menu-item index="1">
            <router-link :to="{ name: 'trade', params:{ option: 'buy', coin: 'btc' } }">法币交易</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{ name: 'ccExchange'}">币币交易</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{ name: 'ccMargin'}">C2C交易</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link :to="{ name: 'welfare'}">糖果活动</router-link>
          </el-menu-item>
        </slot>
        <div class="right-nav">
          <router-link :to="{ name: 'order'}" v-if="checkAuth"><i class="iconfont icon-file-text"></i>订单</router-link>
          <router-link :to="{ name: 'finance'}" v-if="checkAuth"><i class="iconfont icon-wallet"></i>资产</router-link>
          <el-submenu index="5" v-if="checkAuth">
            <template slot="title"><i class="iconfont icon-user"></i>个人信息</template>
           <!--  <router-link :to="{ name: 'invite'}">
              <el-menu-item index="5-1">我的邀请码</el-menu-item>
            </router-link> -->
            <router-link :to="{ name: 'user_center'}">
              <el-menu-item index="5-2">个人中心</el-menu-item>
            </router-link>
            <router-link :to="{ name: 'verify'}">
              <el-menu-item index="5-3">身份认证</el-menu-item>
            </router-link>
            <el-menu-item index="5-4" @click="logoutHandler">注销</el-menu-item>
          </el-submenu>
          <router-link :to="{ name: 'login'}" v-if="!checkAuth">登录</router-link>
          <router-link :to="{ name: 'registry'}" v-if="!checkAuth">注册</router-link>
          <el-submenu index="6">
            <template slot="title">Language</template>
            <el-menu-item index="6-1">SXAASA</el-menu-item>
            <el-menu-item index="6-2">账号安全</el-menu-item>
            <el-menu-item index="6-3">活动记录</el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script>
export default {
  name: "navbar",
  data() {
    return {
      LOGO: require('../../../assets/LOGO/LOGO.png')
    }
  },
  methods: {
    logoutHandler() {
      this.$store.dispatch('LogOut').then(_ => {
        this.$message.success("logout success")
      }).catch(err => {
        this.$message.error(err)
      })
    }

  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    checkAuth() {
      return !!this.$store.state.user.token
    }

  }
}
</script>

<style lang="scss" scoped>
.nav {
  height: 60px;
  overflow: hidden;
  background-color: #181b2a;

  .logo-wrapper {
    display: flex;
    align-items: center;
    margin: 0 20px;
    width: 130px;

    .logo {
      height: 25px;
      width: auto;
      overflow: hidden;
    }
  }

  .el-menu /deep/ {
    border: none;
    width: 100%;
    display: flex;

    .right-nav {
      margin-left: auto;
      display: flex;

      &:focus {
        border: none;
        box-shadow: none !important;
      }

      a {
        display: inline-block;
        height: 60px;
        padding: 0 15px;
        line-height: 60px;
        color: #c7cce6;
        font-size: 14px;
      }

      .el-submenu {
        color: #c7cce6;

      }

      .el-submenu__title {
        height: 60px;
        line-height: 60px;
      }
    }
  }

  /*.el-menu-demo {*/
  /*width: 100%;*/
  /*height: 60px;*/
  /*position: relative;*/
  /*font-size: 14px;*/
  /*display: -ms-flexbox;*/
  /*display: flex;*/
  /*-ms-flex-align: center;*/
  /*align-items: center;*/
  /*border-width: 0;*/
  /*}*/
  /*.logo {*/
  /*height: 25px;*/
  /*width: auto;*/
  /*margin-top: 18px;*/
  /*margin-left: 10px;*/
  /*}*/
  /*.logo-wrapper {*/
  /*margin-left: 15px;*/
  /*height: 60px;*/
  /*width: 170px;*/
  /*overflow: hidden;*/
  /*}*/
  /*.hola {*/
  /*margin-left: auto;*/
  /*}*/
  /*.el-tooltip {*/
  /*height: 60px;*/
  /*margin-bottom: 0;*/
  /*margin-left: 20px;*/
  /*line-height: 60px;*/
  /*a {*/
  /*color: #c7cce6;*/
  /*}*/
  /*}*/
}

</style>
