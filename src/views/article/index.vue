<template>
  <!-- <div class="article-wrapper">
      <div class="article-inner">
        <router-view></router-view>
      </div>
  </div>-->
  <div class="article-center">
    <div class="article-inner">
      <div class="article-left">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :lazy="true"
            v-for="(item,index) in getCategory"
            :key="item.id"
            :name="index.toString()"
          >
            <template slot="label">
              <span class="tab-title">{{item.name}}</span>
            </template>
            <div>
              <div class="article-list">
                <div class="banner">
                  <div class="banner-left img-box">
                    <a href="www.baidu.com">
                      <img :src="require('@/assets/imgs/testBanner2.png')" alt>

                      <div class="title-text big-title">安全预警： 以太坊钱包和挖矿设备可能被洗劫一空？？？？</div>
                    </a>
                  </div>

                  <div class="banner-right">
                    <div class="banner-top img-box">
                      <img :src="require('@/assets/imgs/testBanner3.jpg')" alt>

                      <div class="title-text big-title">安全预警： 以太坊钱包和挖矿设备可能被洗劫一空？？？？</div>
                    </div>
                    <div class="banner-bottom img-box">
                      <img :src="require('@/assets/imgs/testBanner1.jpg')" alt>
                      <div class="title-text big-title">安全预警： 以太坊钱包和挖矿设备可能被洗劫一空？？？？</div>
                    </div>
                  </div>
                </div>
                <div class="list-wrapper">
                  <div class="list-item" v-for="item in article_list" :key="item.id">
                    <div class="thumb img-box">
                      <img :src="require('@/assets/imgs/testBanner2.png')" alt>
                    </div>
                    <div class="text-body">
                      <div class="body-title">
                        <router-link :to="{name: 'article_detail', params:{article_id:item.id}}">{{item.title}}</router-link>
                      </div>
                      <div class="item-content">{{item.description}}</div>
                      <div class="bottom-tip">
                        <div class="time">{{parseTime(item.updateDate)}}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="article-right">
        <right-component></right-component>
      </div>
    </div>
  </div>
</template>
<script>
// import articleList from "./components/articleList";
import rightComponent from "./components/rightComponent";
import { mapGetters } from "vuex";
import { getArticleByCategoryId } from "@/api/cms";
import { parseTime } from '@/utils'

export default {
  components: { rightComponent },
  name: "articles",
  data() {
    return {
      activeName: "0",
      article_list: []
    };
  },
  created() {
    if (this.$store.state.siteCMS.articles.length === 0) {
      this.$store.dispatch("getArticleCategory");
      this.$store.dispatch("getArticleList");
    }
    console.log(this.$route.params.article_id === undefined);
  },
  methods: {
    handleClick(val) {
      let categoryId = this.getCategory[val.index].id;
      getArticleByCategoryId(categoryId, 0, 20).then(res => {
        console.log(res);
        this.article_list = res.content.records;
      });
    },
     parseTime(s) {
      return parseTime(s);
    }
  },
  computed: {
    ...mapGetters(["getCategory"])
  }
};
</script>

<style lang="scss" scoped>
.article-center {
  background-color: #fff;
  padding: 50px 0;
  .article-inner {
    width: 1200px;
    margin: auto;
    display: flex;
    .article-left {
      // background: hotpink;
      min-height: 800px;
      width: 800px;
      padding: 0 12px;
      .el-tabs /deep/ {
        .tab-title {
          color: rgba(0, 0, 0, 0.56);
          font-size: 20px;
          line-height: 28px;
          height: 20px;
          font-weight: 600;
        }
        .el-tabs__active-bar {
          background-color: red;
          height: 4px;
        }
        .is-active {
          // color: rgba(0,0,0,.88);
          .tab-title {
            color: black;
          }
        }
        .article-list {
          padding: 10px 0;
          .img-box {
            img {
              width: 100%;
              height: 100%;
              display: block;
              transition: all 0.3s ease;
            }
          }
          .img-box:hover {
            img {
              transform: scale(1.03);
            }
          }
          .banner {
            display: flex;
            margin-bottom: 20px;
            .title-text {
              position: absolute;
              background: rgba(0, 0, 0, 0.56);
              bottom: 0;
              left: 0;
              right: 0;

              border-radius: 4px;

              color: #fff;
              font-weight: 700;
              transition: all 0.3s ease;
              margin: 8px;
            }
            .banner-left {
              width: 500px;
              height: 300px;
              border-radius: 4px;
              overflow: hidden;
              position: relative;
              .big-title {
                padding: 16px 24px;
                margin: 16px;
                font-size: 20px;
                line-height: 28px;
              }
            }

            .banner-right {
              width: 272px;
              padding-left: 8px;
              display: flex;
              flex-direction: column;
              .banner-top {
                width: 317px;
                height: 146px;
                border-radius: 4px;
                overflow: hidden;
                position: relative;
              }
              .banner-bottom {
                width: 317px;
                height: 146px;
                border-radius: 4px;
                overflow: hidden;
                margin-top: 8px;
                position: relative;
              }
            }
          }
          .list-wrapper {
            .list-item {
              border-top: 1px dotted gray;
              position: relative;
              margin: 0 -16px;
              padding: 24px 16px;
              border-radius: 4px;
              transition: all 0.3s ease;
              display: flex;
              &:hover {
                background: #fff;
                box-shadow: 0 8px 10px 1px rgba(0, 0, 0, 0.06),
                  0 3px 14px 2px rgba(0, 0, 0, 0.04),
                  0 0 5px -3px rgba(0, 0, 0, 0.08);
                transition: all 0.3s ease;
                transform: translateY(-4px);
              }
              .thumb {
                border-top: 1px solid #eee;
                position: relative;
                float: left;
                margin-right: 16px;
                width: 256px;
                height: 154px;
                overflow: hidden;
                border-radius: 4px;
              }
              .text-body {
                width: 478px;
                .body-title {
                  font-size: 20px;
                  line-height: 28px;
                  margin-bottom: 8px;
                  margin-top: 0;
                  max-height: 56px;
                  overflow: hidden;
                  a {
                    color: black;
                    font-weight: 600;
                  }
                  a:hover {
                    color: #e32c28;
                    transition: all 0.3s ease;
                  }
                }
                .item-content {
                  font-size: 14px;
                  line-height: 22px;
                  color: rgba(0, 0, 0, 0.56);
                  max-height: 44px;
                  margin-bottom: 24px;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;
                  overflow: hidden;
                }
                .bottom-tip {
                  font-size: 14px;
                  line-height: 22px;
                  color: rgba(0, 0, 0, 0.56);
                  width: 478px;
                  text-align: right;
                }
              }
            }
          }
        }
      }
    }
    .article-right {
      min-height: 800px;
      width: 400px;
      padding: 0 12px;
    }
  }
}

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
