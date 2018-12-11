<template>
  <!--<div class="">-->
  <b-navbar class="trade-navbar" toggleable="md" type="dark">

    <b-navbar-toggle target="nav_collapse"/>

    <b-navbar-brand href="/"><img :src="LOGO" class="nav-logo" alt=""></b-navbar-brand>

    <b-collapse id="nav_collapse" is-nav>

      <b-navbar-nav>
        <b-nav-item><router-link :to="{ path: '/trade' }">法币交易</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'ccExchange'}">币币交易</router-link></b-nav-item>
        <b-nav-item><router-link :to="{ name: 'ccMargin'}">C2C交易</router-link></b-nav-item>
        <b-nav-item> <router-link :to="{ name: 'welfare'}">糖果活动</router-link></b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="checkAuth">
          <router-link :to="{ name: 'tradeOrder'}">
            <i class="iconfont icon-file-text"/>订单
          </router-link>
        </b-nav-item>

        <b-nav-item v-if="checkAuth">
          <router-link :to="{ name: 'tradeFinance'}"><i class="iconfont icon-wallet"/>资产</router-link>
        </b-nav-item>
        <!--<b-nav-item><router-link :to="{ name: 'ccMargin'}">C2C交易</router-link></b-nav-item>-->
        <!--<b-nav-item><router-link :to="{ name: 'ccMargin'}">C2C交易</router-link></b-nav-item>-->

        <b-nav-item v-if="checkAuth" right>
          <router-link :to="{ name: 'tradeUserCenter'}"><i class="iconfont icon-user"/>个人中心</router-link>
        </b-nav-item>
        <b-nav-item v-if="!checkAuth" disabled>
          <router-link :to="{ name: 'login'}">登录</router-link>
        </b-nav-item>
        <b-nav-item v-if="!checkAuth" disabled>
          <router-link :to="{ name: 'registry'}">注册</router-link>
        </b-nav-item>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>

  <!--</div>-->

</template>

<script>
export default {
  name: 'TradeNavbar',
  data() {
    return {
      LOGO: require('../../../assets/LOGO/LOGO.png')

    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo
    },
    checkAuth() {
      return !!this.$store.state.user.token
    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";
  .trade-navbar {
    min-height: 60px;
    overflow: hidden;
    background-color: #181b2a;
    padding-right: 20px;
    z-index: 0;
    position: relative;
    .nav-logo {
      height: 26px;
    }
    nav {
      height: 60px;
    }
    .navbar-nav {
      margin-left: 20px;
      z-index: 999;
      a {
        &:hover {
          text-decoration: none !important;
        }
      }
    }
    .nav-item a {
      color: $hbColor!important;
      font-size: 14px;
      margin-left: 10px;
    }
    #nav_collapse ul li a {
      margin-left: 0;
      text-decoration: none;
    }
    .show ul {
      margin-left: 0 !important;
    }

  }

</style>
