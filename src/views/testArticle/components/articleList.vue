<template>
    <div class="article-list">
        <el-row :gutter="20">
            <el-col v-for="category in getCategory" :key="category.id" :span="12">
                <h3>
                    {{ category.name }}
                </h3>
                <div class="list-wrapper">
                    <div class="list-item" v-for="article in getArticles" :key="article.id" v-if="article.categoryId==category.id">
                        <router-link :to="{ name: 'article_detail_test', params: { category_id: category.id, article_id: article.id}}">
                            <span v-html="article.title"></span>
                        </router-link>
                    </div>
                   
                </div>
                 <div class="check-all">
                        <router-link :to="{ name: 'article_detail_test', params: { category_id: category.id}}">
                            {{$t('notice.checkAll')}}
                        </router-link>
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
                max-height: 350px;
                position: relative;
                overflow: hidden;
                .list-item {
                    border-bottom: 1px solid #ddd;
                    font-size: 16px;
                    padding: 15px 0;
                    white-space:nowrap;
                    overflow:hidden;
                    text-overflow : ellipsis 
                }
                a {
                    color: rgba(42, 58, 75, 1);
                }
               
            }
             .check-all {
                    // position: absolute;
                    // bottom: 0;
                    // margin-top: 20px;
                    font-size: 14px;
                    a{
                        color: rgba(71, 78, 112, 1);
                    }
                }
        }
    }
</style>