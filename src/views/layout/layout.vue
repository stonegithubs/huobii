<template>
  <div class="lay-out">
    <navbar/>
    <div class="view-port">
      <div v-show="isClick" class="help-content">
        <div class="help-title">
          <div class="help-nav">
            <el-button v-show="contactPanel" @click="contactPanel=false" class="nav-back" icon='el-icon-back'>

            </el-button>
            <el-button @click="isClick=false" class="nav-close" icon='el-icon-minus'>

            </el-button>
            {{$t('index.help')}}
            </div>
          <div class="help-search">
            <el-input :placeholder="$t('index.needHelp')" v-model="inputVal">
              <template slot="append">
                <i @click="handleSearch()" class="el-icon-search"></i>
              </template>
            </el-input>
          </div>
        </div>
        <div class="help-body">
          <div v-show="!contactPanel">
            <h4>{{$t('index.bestSuggestion')}}</h4>
            <div>
              <ol>
                <li v-for="item in suggestList" :key="item.id">{{ item.title }}</li>
              </ol>
            </div>
          </div>
          <div class="contact-form" v-show="contactPanel">
            <el-form label-position="top" ref="form" :model="form" label-width="80px">
              <el-form-item :label="$t('index.name')">
                <el-input v-model="form.name"></el-input>
              </el-form-item>
              <el-form-item :label="$t('userInfo.email')">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
              <el-form-item :label="$t('index.desc')">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="help-footer">
          <el-button v-show="!contactPanel" @click="contactPanel=!contactPanel" class="help-contact">{{$t('index.contactUs')}}</el-button>
          <el-button v-show="contactPanel" @click="submit()" class="help-contact">{{$t('submit')}}</el-button>
        </div>
      </div>
      <div id="help-logo">
        <!-- <el-popover placement="top" width="342" trigger="click"> -->
        <el-button
          v-show="!isClick"
          @click="isClick = !isClick"
          slot="reference"
          class="help-button"
        >
          <img width="20px" height="20px" style :src="require('@/assets/svg/help.svg')" alt>
          <span>{{$t('index.help')}}</span>
        </el-button>
        <!-- </el-popover> -->
      </div>
      <mainbox/>
    </div>
    <!--<router-view/>-->
    <my-footer/>
  </div>
</template>

<script>
import "../../style/index.scss";
import navbar from "./components/navbar";
import mainbox from "./components/mainBox";
import myFooter from "./components/myFooter";

export default {
  name: "Layout",
  components: {
    navbar,
    mainbox,
    myFooter
  },
  data() {
    return {
      scrollTop: 0,
      isClick: false,
      suggestList: [
        {
          id: 1,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aperiam"
        },
        {
          id: 2,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aperiam"
        },
        {
          id: 3,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aperiam"
        },
        {
          id: 4,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aperiam"
        },
        {
          id: 5,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aperiam"
        },
        {
          id: 6,
          title:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque aperiam"
        }
      ],
      inputVal: "",
      contactPanel: false,
      form: {
        name: "",
        email: "",
        desc: ""
      }
    };
  },
  mounted() {
    // window.addEventListener("scroll", this.scroll);
    // document.getElementById('help-logo').style.top='640px'
  },
  computed: {
    // style(){
    //   return { 'height':this.scrollTop + 800 +'px'}
    // }
  },
  methods: {
    submit(){
      this.$alert(this.$t('index.thx4msg'))
    },
    handleSearch(e) {
      console.log(this.inputVal,e);
    },
    contactUs() {
      this.contactPanel = true;
    }
  },
  created() {
    this.$nextTick(() => {
      this.$store.dispatch("getSupportCash");
      this.$store.dispatch("getSupportCoin");
      this.$store.dispatch("getSupportedPayway");
      // this.$store.dispatch('GetUserInfo').catch(_=>{})
    });
  }
};
</script>

<style lang="scss">
@import "../../assets/custom-theme/theme.scss";
a:hover {
  text-decoration: none;
  color: white;
}
#help-logo {
  position: fixed;
  bottom: 30px;
  width: 50px;
  height: 50px;
  z-index: 9999999;
  right: 80px;

  .help-button {
    background-color: #638bd4 !important;
    color: #ffffff !important;
    border: #638bd4 !important;
    span {
      line-height: 20px;
      height: 20px;
      vertical-align: top;
    }

    border-radius: 999rem;
    font-weight: 700;
    white-space: nowrap !important;
  }
}
.lay-out {
  min-width: 1200px;
  // color: #c7cce6;
  background-color: $hbBackgroundColor;
  margin: auto;
  position: relative;
  .view-port {
    @media (max-width: 1200px) {
      width: 1200px;
    }
    margin: auto;
  }
}
::-webkit-scrollbar {
  /*height: 20px;*/
  width: 10px;

  background-color: transparent;
}
/*滚动条的轨道*/
::-webkit-scrollbar-track {
  background-color: $hbBackgroundColor;
  /*width: 1px;*/
}
/*滚动条的滑块按钮*/
::-webkit-scrollbar-thumb {
  background-color: rgba(97, 104, 138, 0.15);
  border-radius: 10px;
}
/*滚动条的上下两端的按钮*/
// ::-webkit-scrollbar-button{
/*display: none;*/
// }

.upper {
  text-transform: uppercase;
}
.help-content {
  // height: ;
  position: fixed;
  z-index: 9999999999;
  bottom: 10px;
  // z-index: 100;
  right: 10px;
  width: 342px;
  height: 550px;
  background-color: #fff;
  border-radius: 0.57143rem;
  box-shadow: 0 0 0.42857rem 0 rgba(0, 0, 0, 0.2);
  background: hsla(0, 0%, 100%, 0.98);
  .help-title {
    border-radius: 0.57143rem 0.57143rem 0 0;
    padding: 16px;
    background: #638bd4;
    color: #ffffff;
      position: relative;
    // height: 108px;
    .help-nav {
      text-align: center;
      line-height: 20px;
      height: 20px;
      font-size: 16px;
      margin-bottom: 10px;
      .el-button {
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: transparent;
        border: none;
        top: 0;
        color: #fff;
      }
      .nav-back{
        left: 0;
      }
      .nav-close {
        right: 15px;
      }
    }
    .help-search {
      .el-input-group__append {
        background-color: #fff;
      }
    }
  }
  .help-body {
    overflow-y: auto;
    overflow-x: hidden;
    box-sizing: border-box;
    flex-grow: 1;
    height: 370px;
    padding-top: 20px;
    padding-left: 5px;
    padding-right: 10px;
    font-size: 14px;
    list-style: decimal;
    .contact-form {
      padding: 0 20px;
    }
    h4 {
      margin-left: 24px;
      // font-size:
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  .help-footer {
    padding-bottom: 20px;
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: right;
    .el-button {
      margin-right: 10px;
      color: white;
      font-weight: 600;
      background-color: #638bd4;
    }
  }
}
</style>
