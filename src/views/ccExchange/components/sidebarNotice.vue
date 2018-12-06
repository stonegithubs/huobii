<template>
  <div class="sidebar-notice">
    <div class="title hb-tab">
      <span>{{$t('exchange.sidebar.notice')}}</span>
    </div>
    <div class="in ">
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
    color: $hbColor;
    .title {
      height: 48px;
      line-height: 48px;
      font-size: 16px;
      padding: 0 20px;
      box-shadow: 0 3px 6px rgba(209, 211, 223, 0.8);    
      z-index: 10;
      background-color: #fff;
      position: relative;
      margin-top: 20px;
      a {
        transition: all .2s ease-in-out;

        :hover{
          color: $hbHoverColor;

        }
      }
    }
    .in {
      padding: 0 20px;
      background-color: #fff;
      ul {
        li {
          border-bottom: 1px solid #fcfdfd;;
          padding-top: 10px;
          min-height: 70px;
          text-align: right;
          border-top: 1px solid rgb(209, 211, 223);
          .notice-inner {
            display: block;
            height: 36px;
            line-height: 18px;
            text-align: left;
            overflow: hidden;
            color: $hbColor;
            font-size: 13px;
            transition: all .2s ease-in-out;
          }
          .notice-time {
            font-size: 11px; // opacity: 0.5;
            // color: #61688a;
            height: 30px;
          }
          a:hover {
          color: $hbHoverColor;
          }
        }
      }
    }
  }
</style>
