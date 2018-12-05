<template>
  <div class="nav">
    <div class="logo-wrapper">
      <router-link to="/">
        <img class="logo" :src="LOGO">
      </router-link>
    </div>
    <div style="width: 86%">
      <el-menu
        :default-active="$route.path"
        text-color="#c7cce6"
        background-color="#181b2a"
        active-text-color="#7a98f7"
        class="el-menu-demo"
        mode="horizontal"
      >
        <slot name="nav-item">
          <el-menu-item index="1">
            <router-link :to="{ name: 'trade', params:{ option: 'buy', coin: 'btc' } }">{{$t("navbar.trade")}}</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link :to="{ name: 'ccExchange'}">{{$t("navbar.exchange")}}</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link :to="{ name: 'ccMargin'}">{{$t("navbar.c2c")}}</router-link>
          </el-menu-item>
          <!-- <el-menu-item index="4">
            <router-link :to="{ name: 'welfare'}">糖果活动</router-link>
          </el-menu-item> -->
        </slot>
        <div class="right-nav">
          <router-link :to="{ name: 'order'}" v-if="checkAuth">
            <i class="iconfont icon-file-text"></i>订单
          </router-link>
          <router-link :to="{ name: 'finance'}" v-if="checkAuth">
            <i class="iconfont icon-wallet"></i>资产
          </router-link>
          <el-submenu index="5" v-if="checkAuth">
            <template slot="title">
              <i class="iconfont icon-user"></i>个人信息
            </template>
            <!--  <router-link :to="{ name: 'invite'}">
              <el-menu-item index="5-1">我的邀请码</el-menu-item>
            </router-link>-->
            <router-link :to="{ name: 'tradeUserCenter'}">
              <el-menu-item index="5-2">个人中心</el-menu-item>
            </router-link>
            <router-link :to="{ name: 'verify'}">
              <el-menu-item index="5-3">身份认证</el-menu-item>
            </router-link>
            <el-menu-item index="5-4" @click="logoutHandler">注销</el-menu-item>
          </el-submenu>
          <router-link :to="{ name: 'login'}" v-if="!checkAuth">{{$t("navbar.signIn")}}</router-link>
          <router-link :to="{ name: 'registry'}" v-if="!checkAuth">{{$t("navbar.signUp")}}</router-link>

          <el-dropdown @command="changeLanguage">
            <span class="el-dropdown-link">{{$t("lang")}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="th">ไทย</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
              <el-dropdown-item command="zh">简体中文</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      LOGO: require("../../../assets/LOGO/LOGO.png")
    };
  },
  methods: {
    logoutHandler() {
      this.$store
        .dispatch("LogOut")
        .then(_ => {
          this.$message.success("logout success");
        })
        .catch(err => {
          this.$message.error(err);
        });
    },
    changeLanguage(command){
      this.$i18n.locale = command
      // console.log(command)
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    checkAuth() {
      return !!this.$store.state.user.token;
    }
  }
};
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
      .el-dropdown {
        line-height: 60px;
        color: #c7cce6;
        margin-left: 13px;
      }
    }
  }
}
</style>
