<template>
  <footer class="hb-footer">
    <ul>
      <li v-for="(category, id) in list" v-bind:key="id">
        <span>{{ category.name }}</span>
        <a :class="category.id === item.parentID? '':'hid'"  v-for="item  in linkList" v-bind:key="item.id" :href="item.href">{{ item.title }}</a>
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
        links: [],
      }
    
    },
    computed: {
      // getList = () => this.categorys,
      list(){

        return this.categorys
      },
      linkList(){
        return this.links;
      }
    },
    created() {
      // this.categorys = sessionStorage.getItem("categorys", this.categorys)
      // this.links = sessionStorage.getItem("links", this.links)
      if( false){ }
      else{
        linkCategory()
        .then(res => {
          for(let item of res.content.records){
            this.categorys.push({
              id:item.id,
              name:item.name,
            })
          }
          // sessionStorage.setItem("categorys", JSON.stringify(this.categorys));
        })
        .then(() => {
          for(let item of this.categorys){
            // item.linkList = []
            cmsLink(item.id).then(res => {
              for(let link of res.content.records){
                // vm.$set(vm.item)
                let i = {
                  'parentID': item.id,
                  'title':link.title, 
                  'href':link.href,
                }
                this.links.push(i)
                // console.log(item)
              }
            });

          }

        //   console.log(this.links instanceof Array)
        //   // let a = []
        //   window.a = this.links
        //   console.log(a)
        //   let arr = []
        //   // for(let item of this.links){
        //   //   let a = {  }
        //   // }
        // sessionStorage.setItem("links", this.links);
        
        })
        .catch(_ => {});
      }
       
    }
  };
</script>

<style lang="scss" scoped>
  .hb-footer {
    height: 330px;
    background-color: #0a151e;
    padding-top: 50px;
    .hid {
      display: none
    }
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
