<template>
  <div class="sidebar-notice">
    <div class="title hb-tab">
      <span>{{ $t('exchange.sidebar.notice') }}</span>
    </div>
    <div class="in">
      <ul id="notice_list">
        <li v-for="(item, index) in noticeList" :key="index">
          <a :href="item.link" class="notice-inner">{{ item.title }}</a>
          <!-- <p>{{ item.content }}</p> -->
          <div class="notice-time">{{ parseTime(item.updateDate,'{y}-{m}-{d} {h}:{i}:{s}') }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {siderNotice} from '@/api/cms'
import { parseTime } from "../../../utils/index";
import { mapGetters } from "vuex";
export default {
  name: "SidebarNotice",
  data() {
    return {
      noticeList: []
    };
  },
  computed: {
    // ...mapGetters(["getterBanner"]),
    // noticeList() {
    //   let notice = [];
    //   // return this.
    //   for (let item of this.$store.state.siteCMS.articles) {
    //     if (item.categoryId == "02508d648dd5462db978c1c71a90413c") {
    //       notice.push(item);
    //     }
    //   }
    //   return notice;
    // }
  },
  created() {
    siderNotice()
      .then(res => {
        if (res && res.code === "200") {
          this.noticeList = res.content.records;
        }
      })
      .catch(_ => {});
    // this.$nextTick(()=>{
    //  if(this.$store.state.siteCMS.articles.length === 0){
    //   this.$store.dispatch('getArticleCategory')
    //   this.$store.dispatch('getArticleList')
    // }
    // })

    // if(this.getterBanner.length === 0){
    //   this.$store.dispatch('getBanners')
    // }
  },
  methods: {
    parseTime(time, cFormat) {
      return parseTime(time, cFormat);
    }
  }
};
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
      transition: all 0.2s ease-in-out;

      :hover {
        color: $hbHoverColor;
      }
    }
  }
  .in {
    padding: 0 20px;
    background-color: #fff;
    ul {
      li {
        border-bottom: 1px solid #fcfdfd;
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
          transition: all 0.2s ease-in-out;
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
