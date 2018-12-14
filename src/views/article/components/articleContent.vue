<template>
    <div  class="article-content">
        <div class="content-title">
            <h1 v-html="article_content.title">
            </h1>
        </div>
        <div class="content-inner">
            <div v-html='article_content.data.content'></div>
        </div>
    </div>
    
</template>

<script>
import { articleDetail } from '../../../api/cms'
    export default {
        name: 'article-content',
        props:['article_id'],
        data() {
            return {
                article_content: {
                    title: '', 
                    data: {
                        content: ''
                    }
                }
            }
        },
        created() {
            articleDetail(this.article_id).then(res=>{
                this.article_content = res.content
            })
        },
        computed: {
            
        },
        watch: {
            article_id(id){
                articleDetail(this.id).then(res=>{
                this.article_content = res.content
            })
            }
        }
    }
</script>

<style lang="scss" scoped>
.article-content {
    padding:0 60px;
    .content-title{
            font-size: 32px;font-weight: 400;margin-bottom: 40px;
    }
    .content-inner {
line-height: 1.6;

    }
}
</style>
