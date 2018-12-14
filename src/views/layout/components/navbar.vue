<template>
  <div class="nav">

    <div class="logo-wrapper">
        <h1>
          <router-link to="/">
            <img :src="LOGO" class="logo" :alt="$t('siteName')">
          </router-link>
        </h1>
    </div>

      <el-menu
        
        :default-active="$route.path"
        background-color="#243445"

        active-text-color="#ffffff"
        class="el-menu-demo"
        mode="horizontal"
      >
        <slot name="nav-item">
            <router-link :to="{ name: 'trade', params:{ option: 'buy', coin: 'btc' } }">
          <el-menu-item index="1">
              {{ $t("navbar.trade") }}
          </el-menu-item>
              </router-link>

            <router-link :to="{ name: 'ccExchange'}">
          <el-menu-item index="2">
              {{ $t("navbar.exchange") }}
          </el-menu-item>
              </router-link>

            <router-link :to="{ name: 'article_list'}">
           <el-menu-item index="3">
              {{ $t("navbar.article") }}
          </el-menu-item>
              </router-link>
          <!-- <el-menu-item index="3">
            <router-link :to="{ name: 'ccMargin'}">{{$t("navbar.c2c")}}</router-link>
          </el-menu-item> -->
          <!-- <el-menu-item index="4">
            <router-link :to="{ name: 'welfare'}">糖果活动</router-link>
          </el-menu-item> -->
        </slot>
        <div class="right-nav" >

          <el-submenu v-if="checkAuth" index="4">
            <template slot="title">
              <i class="iconfont icon-file-text"/>{{ $t("navbar.user.order") }}
            </template>

            <router-link :to="{ name: 'order'}">
              <el-menu-item index="4-1">
                {{ $t("navbar.user.exchangeOrder") }}
              </el-menu-item>
            </router-link>
            <router-link :to="{ name: 'advList'}">
              <el-menu-item index="4-2">
                {{ $t("navbar.user.financeOrder") }}
              </el-menu-item>
            </router-link>
          </el-submenu>

          <router-link v-if="checkAuth" :to="{ name: 'wallet'}">
            <i class="iconfont icon-wallet"/>{{ $t("navbar.user.finance") }}
          </router-link>
          <el-submenu v-if="checkAuth" index="5">
            <template slot="title">
              <i class="iconfont icon-user"/>{{ $t("navbar.user.userProfile") }}
            </template>
            <!--  <router-link :to="{ name: 'invite'}">
              <el-menu-item index="5-1">我的邀请码</el-menu-item>
            </router-link>-->
            <router-link :to="{ name: 'user_center'}">
              <el-menu-item index="5-2">{{ $t("navbar.user.userCenter") }}</el-menu-item>
            </router-link>
            <router-link :to="{ name: 'verify'}">
              <el-menu-item index="5-3">{{ $t("navbar.user.verify") }}</el-menu-item>
            </router-link>
            <router-link :to="{ name: 'tradeOrder'}">
              <el-menu-item index="5-4">{{ $t("navbar.myAdv") }}</el-menu-item>
            </router-link>
            <router-link :to="{ name: 'advertising'}">
              <el-menu-item index="5-5">{{ $t("navbar.sendAvd") }}</el-menu-item>
            </router-link>
            <el-menu-item index="5-6" @click="logoutHandler">{{ $t("navbar.user.logout") }}</el-menu-item>
          </el-submenu>
          <router-link v-if="!checkAuth" :to="{ name: 'login'}">{{ $t("navbar.signIn") }}</router-link>
          <router-link v-if="!checkAuth" :to="{ name: 'registry'}">{{ $t("navbar.signUp") }}</router-link>

          <el-dropdown @command="changeLanguage">
            <span class="el-dropdown-link">{{ $t("lang") }}
              <i class="el-icon-arrow-down el-icon--right"/>
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
</template>
<script>
export default {
  name: 'Navbar',
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
    logoutHandler() {
      this.$store
        .dispatch('LogOut')
        .then(_ => {
          this.$message.success('logout success')
        })
        .catch(err => {
          this.$message.error(err)
        })
    },
    changeLanguage(command) {
      localStorage.setItem('locale', command)

      this.$i18n.locale = command
      // console.log(command)
    }
  },
  beforeMount(){
    let locale = localStorage.getItem('locale')
    if(locale === 'zh'){
      this.$i18n.locale = 'zh' 
    }else if( locale === 'en'){
      this.$i18n.locale = 'en' 
    }else{
      this.$i18n.locale = 'th'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/custom-theme/theme';
.el-menu-item {
      color: $navbarFontColor;
          line-height: 60px;
    }
.nav {
  height: 60px;
  overflow: hidden;
  background-color: $navbarColor;
  color: $navbarFontColor;
  padding: 0 20px;
  display: block;

  .logo-wrapper {
    float: left;
    height: 100%;
    display: flex;
    align-items: center;
    width: 217px;

    .logo {
      height: 25px;
      width: auto;
      overflow: hidden;
    }
  }
  

  .el-submenu /deep/ {
    .el-submenu__title {
      i {
         color: $navbarFontColor;
      }
      color: $navbarFontColor;
    }
  }

  .el-menu /deep/ {
    border: none;
    display: flex;
    background-color: $navbarColor;
    color: $navbarFontColor;
    .el-menu-item {
      color: $navbarFontColor;
    }
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
        color:$navbarFontColor;
        font-size: 14px;
      }

      .el-submenu {
        color:$navbarColor;
      }

      .el-submenu__title {
        height: 60px;
        line-height: 60px;
      }
      .el-dropdown {
        line-height: 60px;
        color: $navbarFontColor;
        margin-left: 13px;
      }
    }
  }
}
</style>
