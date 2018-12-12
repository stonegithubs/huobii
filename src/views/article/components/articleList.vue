<template>
    <div class="article-list">
        <el-row :gutter="20">
            <el-col v-for="category in getCategory" :key="category.id" :span="12">
                <h3>
                    {{ category.name }}
                </h3>
                <div class="list-wrapper">
                    <div class="list-item" v-for="article in getArticles" :key="article.id" v-if="article.categoryId==category.id">
                        <router-link :to="{ name: 'article_detail', params: { category_id: category.id, article_id: article.id}}">
                            {{ article.title }}
                        </router-link>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {
        articleCategory,
        articles
    } from '../../../api/cms'
    import {mapGetters} from 'vuex'
    export default {
        name: 'article-list',
        data() {
            return {
                // articleCategory: [],
                // articles: [],
            }
        },
        created() {
            
            // articleCategory(0, 30).then(res => {
            //     this.articleCategory = res.content.records
            // }).catch(_ => {})
            // articles(0, 30).then(res => {
            //     this.articles = res.content.records
            // }).catch(_ => {})
            // // console.log(this.$route.params.article_id === undefined)
        },
        computed: {
            ...mapGetters([
                'getCategory',
                'getArticles'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    .article-list {
        width: 900px;
        margin: auto;
        margin-top: 40px;
        .el-col {
            height: 400px;
            h3 {
                font-size: 18px;
                font-weight: 600;
            }
            .list-wrapper {
                font-size: 16px;
                padding: 15px 0;
                .list-item {
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                    padding: 15px 0;
                }
                a {
                    color: rgba(42, 58, 75, 1);
                }
            }
        }
    }
</style>
