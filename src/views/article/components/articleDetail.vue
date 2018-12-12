<template>
  <div>
    <div class="article-nav">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'article_list' }">文章中心</el-breadcrumb-item>
        <el-breadcrumb-item>文章详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="article-tabs">
      <el-tabs height="600px" type="card" tab-position="left">
        <el-tab-pane
          v-for="item in getArticlesByCategoryId(category_id)"
          :key="item.id"
          :label="item.title"
        >
          <article-content :article_id="item.id"></article-content>
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
  
}
</style>
