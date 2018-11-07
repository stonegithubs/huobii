<template>
  <div class="sidebar-notice">
    <div class="title">
      <a href="#">公告</a>
    </div>
    <div class="in">
      <ul id="notice_list">
        <li v-for="(item, index) in notice" v-bind:key="index">
          <router-link class="notice-inner" :to="{ name: 'index'}">{{ item.description }} </router-link>
          <div class="notice-time">{{ parseTime(item.updateDate,'{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {
    parseTime
  } from '../../../utils/index'
  export default {
    name: "sidebar-notice",
    created() {
      if (this.$store.state.siteCMS.notice.length === 0) {
        this.$store.dispatch('getNoticeRemote').then(() => {
          this.notice = this.$store.state.siteCMS.notice;
        })
      } else {
        this.notice = this.$store.state.siteCMS.notice;
      }
    },
    data() {
      return {
        notice: [],
      }
    },
    methods: {
      parseTime(time, cFormat) {
        return parseTime(time, cFormat)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../../assets/custom-theme/theme";
  .sidebar-notice {
    .title {
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      padding: 0 20px;
      background-color: rgb(27, 30, 46);
      margin-top: 20px;
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
          border-bottom: 1px solid #1f2943;
          .notice-inner {
            display: block;
            height: 36px;
            line-height: 18px;
            text-align: left;
            overflow: hidden;
            color: #c7cce6;
            font-size: 14px;
          }
          .notice-time {
            font-size: 11px; // opacity: 0.5;
            color: #61688a;
            height: 30px;
          }
        }
      }
    }
  }
</style>
