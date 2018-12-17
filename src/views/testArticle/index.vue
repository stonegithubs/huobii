<template>
    <div class="article-wrapper">
      <div class="article-inner">
        <router-view/>
      </div>
    </div>
</template>

<script>
export default {
  name: 'articles',
  data() {
    return {
      
    }
  },
  created() {
    if(this.$store.state.siteCMS.articles.length === 0){
      this.$store.dispatch('getArticleCategory')
      this.$store.dispatch('getArticleList')
    }
    // console.log(this.$route.params.article_id === undefined)
  }
}
</script>

<style lang="scss" scoped>
    .article-wrapper {
      min-height: 800px;
      background: #fff;
      padding: 50px 0;
      .article-inner {
      margin: auto;
      width: 1200px;
      }
    }
</style>