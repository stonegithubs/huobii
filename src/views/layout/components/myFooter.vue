<template>
  <!-- <el-footer class="footer-wrapper">
      <el-container class="footer-inner">
          <dl>
            <dt><h1>{{ siteName }}</h1></dt>
            <dd style="margin-right: 60px"><p>{{ siteIntroduction}}</p></dd>
            <dd class="copyright" style=" margin-top: 90px;
      display: inline-block; margin-right: 60px">{{ copyright }}</dd>
          </dl>
          <dl style="margin-left: auto; width: 100px">
            <dt><h2>新手指南</h2></dt>
            <dd v-for="item in guide">
              <a href="#">{{item}}</a>
            </dd>
          </dl>
          <dl style="width: 100px">
            <dt><h2>币种资料</h2></dt>
            <dd v-for="item in coinInfo">
              <a href="#">{{item}}</a>
            </dd>
          </dl>
          <dl style="width: 100px">
            <dt><h2>服务协议</h2></dt>
            <dd v-for="item in agreement">
              <a href="#">{{item}}</a>
            </dd>
          </dl>
      </el-container>
    </el-footer> -->
  <footer class="hb-footer">
    <ul>
      <li v-for="(category, id) in categorys" v-bind:key="id">
        <span>{{ category.name }}</span>
        <a v-for="(link,index) in category.linkList" v-bind:key="index" :href="link.href">{{ link.title }}</a>
      </li>
    </ul>
  </footer>
</template>

<script>
  import {
    cmsLink,
    linkCategory
  } from "../../../api/cms";
  import ElContainer from "element-ui/packages/container/src/main";
  import {
    mapState
  } from "vuex";
  export default {
    name: "my-footer",
    components: {
      ElContainer
    },
    data() {
      return {
        categorys: [],
      }
    },
    created() {
      linkCategory()
        .then(res => {
          
          for(let item of res.content.records){
            this.categorys.push({
              id:item.id,
              name:item.name,
            })
          }
        })
        .then(() => {
          for(let item of this.categorys){
            cmsLink(item.id).then(res => {
              for(let link of res.content.records){
                item.linkList = []
                item.linkList.push({
                  title:link.title, 
                  href:link.href,
                })
              }
            });

          }
        })
        .catch(_ => {});
    }
  };
</script>

<style lang="scss" scoped>
  .hb-footer {
    height: 330px;
    background-color: #181b2a;
    padding-top: 50px;
    ul {
      width: 1000px;
      margin: auto;
      display: flex;
      justify-content: center;
      li {
        // float: left;
        display: flex;
        flex-direction: column;
        width: 293px;
        span {
          color: #596a7a;
          height: 31px;
          display: inline-block;
          font-size: 12px;
        }
        a {
          height: 24px;
          line-height: 24px;
          color: #9ca9b5;
          display: inline-block;
          font-size: 12px;
          text-decoration: none;
          transition: all .2s ease-in-out;
          cursor: pointer;
        }
      }
    }
  } // .el-footer /deep/{
  //   min-height: 330px!important;
  //   height: auto;
  //   background-color: #181b2a;
  //   line-height: 14px;
  //   font-size: 14px;
  //   h1 {
  //     color: #c7cce6;
  //     height: 40px;
  //     font-size: 24px;
  //     line-height: 24px;
  //     font-weight: 400;
  //   }
  //   .footer-inner {
  //     color: #61688a;
  //     margin: auto;
  //     box-sizing: border-box;
  //     padding: 60px 20px 0;
  //     display: -ms-flexbox;
  //     display: flex;
  //     dl{
  //       margin-left: 100px;
  //       margin-bottom: 20px;
  //       flex-direction: row;
  //       flex-wrap: wrap;
  //       h2{
  //         height: 42px;
  //         line-height: 12px;
  //         font-size: 12px;
  //         font-weight: 400;
  //       }
  //       a{
  //         color: #c7cce6;
  //         display: inline-block;
  //         margin-bottom: 20px;
  //         &:hover {
  //           color: #7a98f7;
  //           text-decoration: none;
  //         }
  //       }
  //     }
  //   }
  // }
</style>
