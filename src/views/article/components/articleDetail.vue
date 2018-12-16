<template>
  <div class="article-detail">
    <div class="article-header">
      <div
        class="big-banner"
        style="background-image: url('https://cdn.8btc.com/wp-content/uploads/2018/12/201812120724447125-380x228.jpg')"
      ></div>
      <div class="main-title">
        <div class="title-container">
          <h1>{{article.title}}</h1>
        </div>
        <div class="time">{{parseTime(article.updateDate)}}</div>
      </div>
    </div>
    <div class="article-body">
      <div v-html="content">
      </div>
    </div>
  </div>
</template>

<script>
import { articleDetail } from "../../../api/cms";
import { mapGetters } from "vuex";
import { parseTime } from "@/utils";
export default {
  name: "article-detail",
  data() {
    return {
      article_id: "",
      article: {},
      content:''
    };
  },
  created() {
    this.article_id = this.$route.params.article_id;
    articleDetail(this.article_id).then(res => {
      if (res && res.code === "200") {
        this.article = res.content;
        this.content = res.content.data.content
      }
    });
  },
  computed: {
    ...mapGetters([
      "getCategory",
      "getArticles",
      "getCategoryById",
      "getArticlesByCategoryId"
    ])
  },
  methods: {
    parseTime(s) {
      return parseTime(s);
    }
  }
};
</script>

<style lang="scss" scoped>
.article-detail {
  min-height: 800px;
  min-width: 1200px;
  background-color: #fff;
  .article-header {
    position: relative;
    height: 320px;
    overflow: hidden;
    margin-bottom: 16px;
    z-index: 1;
    width: 100%;
    .big-banner {
      // height: 240px;
      position: absolute;
      top: -40px;
      left: -40px;
      right: -40px;
      bottom: -40px;
      background-position: 50%;
      background-size: 100%;
      filter: blur(20px);
      z-index: 1;
    }
    .main-title {
      position: relative;
      background-image: linear-gradient(-180deg, transparent, #000);
      background-size: cover;
      z-index: 2;
      height: 100%;
      .title-container {
        padding-top: 120px;
        padding-bottom: 40px;
        margin: 0 200px;
        text-align: center;
        h1 {
          color: #fff;
          font-size: 38px;
          line-height: 46px;
          font-weight: 700;
        }
      }
        .time {
          font-size: 14px;
          line-height: 22px;
          color: hsla(0, 0%, 100%, 0.64);
          text-align: center;
        }
    }
  }
  .article-body {
    width: 1200px;
    margin: auto;
    min-height: 800px;
    padding: 70px 0 150px 0;
  }
}

// .article-tabs /deep/ {
//   margin-top: 50px;
//   min-height: 800px;
//   .el-tabs__item:hover {
//     color: rgba(71, 78, 112, 1);
//   }
//   .is-active {
//     background-color: rgba(71, 78, 112, 1);
//     color: #ffffff !important;
//   }
//   .tltle-list {
//     // display:inline-block;
//     width: 160px;
//   }
// }
</style>
