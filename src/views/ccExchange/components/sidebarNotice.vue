<template>
  <div class="sidebar-notice">
    <div class="title">
      <a href="#">公告</a>
    </div>
    <div class="in">
      <ul id="notice_list">
        <li v-for="item in notice">
          <router-link :to="{path:'/'}">{{ item.description }} </router-link>
          <div>{{ item.date }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "sidebar-notice",
  created(){
    if(this.$store.state.siteCMS.notice.length === 0){
      this.$store.dispatch('getNoticeRemote').then(() => {
        this.notice = this.$store.state.siteCMS.notice;
      })
    }
    else {
      this.notice = this.$store.state.siteCMS.notice;
    }
  },
  data() {
    return {
      notice: [],
    }
  }
}
</script>

<style lang="scss">
  @import "../../../assets/custom-theme/theme";

  .sidebar-notice {
    .title {
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      padding: 0 20px;
      background-color: rgb(27, 30, 46);
      margin-top: 10px;
      a {
        color: #c7cce6;
      }
    }
    .in {
      padding: 0 20px;
      background-color: #181b2a;
      ul {
        li {
          border-bottom: 1px solid #262a42;
          padding-top: 10px;
          min-height: 70px;
          text-align: right;
          div {
            font-size: 11px;
            opacity: 0.5;
          }
          a {
            display: block;
            height: 36px;
            margin-bottom: 10px;
            line-height: 18px;
            text-align: left;
            overflow: hidden;
            color: #c7cce6;
            font-size: 12px;
          }
        }
      }
    }
  }

</style>
