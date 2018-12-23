<template>
  <div>
    <div class="article-nav animated bounceInLeft">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">{{$t('notice.index')}}</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'article_list_test' }">{{$t('notice.articleCenter')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('notice.articleDetail')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="article-tabs">
      <el-tabs v-model="article_id" 
      height="600px" type="card" tab-position="left">
        <el-tab-pane
          v-for="item in getArticlesByCategoryId(category_id)"
          :key="item.id"
          :name="item.id"
        >
        <template slot="label">
          <div class="animated bounceInLeft title-wrapper">
          <!-- <span class="tltle-list" v-html="item.title"> -->
            <!-- <span class="title-wrapper">   -->
            <span>
            {{html_decode(item.title)}}
            </span>
            <!-- </span> -->
          <!-- </span> -->
          </div>
        </template>
          <article-content  class="animated bounceInRight" :article_id="item.id"></article-content>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import articleContent from "./articleContent";
export default {
  name: "article-detail",
  components: {
    articleContent
  },
  data() {
    return {
      category_id: "",
      article_id: ""
      // article_content: ''
    };
  },
  created() {
    this.category_id = this.$route.params.category_id;
    this.article_id = this.$route.params.article_id;
  },
  methods:{
     html_decode(str) {
      let s = "";
      if (str.length == 0) return "";
      s = str.replace(/&amp;/g, "&");
      s = s.replace(/&lt;/g, "");
      s = s.replace(/&gt;/g, "");
      s = s.replace(/&nbsp;/g, "");
      s = s.replace(/&#39;/g, "");
      s = s.replace(/&quot;/g, '"');
      s = s.replace(/<br\/>/g, "");
      s = s.replace(/&ldquo;/g,'')
      s = s.replace(/&rdquo;/g,'')
      return s;
    }
  },
  computed: {
    ...mapGetters([
      "getCategory",
      "getArticles",
      "getCategoryById",
      "getArticlesByCategoryId"
    ])
  }
};
</script>

<style lang="scss" scoped>
.article-tabs /deep/ {
  margin-top: 50px;
  min-height: 800px;
  .el-tabs__item:hover {
      color:rgba(71, 78, 112, 1);
       }
  .is-active {
    background-color: rgba(71, 78, 112, 1);
    color: #ffffff!important;
  }
  .title-wrapper {
    white-space: normal;
    width: 180px;
    word-break: normal;
    text-align: left;
    line-height: 25px;
    padding: 10px 0;
    // min-height: 40px;
    span {
      white-space: normal;
      // word-break: break-all;
    }
  }
  .el-tabs__item{
    height: unset;
  }
  .tltle-list  {
    // display:inline-block;
    width: 10px;
    // span {
    //   width: 20px;
    // }
  }
}
</style>