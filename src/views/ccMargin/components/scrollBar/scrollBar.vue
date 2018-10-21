<template>
  <div>
    <ul id="con1" ref="con1" :class="{anim:animate==true}">
      <li v-for='item in items'>
        <span>{{item.name}}</span>
        <span>{{item.number}}</span>
        <span>{{item.type }}</span>
        <span>{{ item.state }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    name: "scroll-bar",
  data() {
    return {
      animate: false,
      items: [
        {name: "2467654376@qq.com", number:30, type: '买入', state: '成功'},
        {name: "23137654376@qq.com", number:350, type: '买入', state: '待确认'},
        {name: "23467654376@qq.com", number:3300, type: '买入', state: '成功'},
        {name: "23464376@qq.com", number:2, type: '买入', state: '成功'},
        {name: "2313654376@qq.com", number:34, type: '买入', state: '待确认'},
        {name: "376@qq.com", number:31100, type: '买入', state: '成功'},
      ]
    }
  },
  created(){
      setInterval(this.scroll,2000)
  },
  methods: {
      scroll(){
        this.animate=true;
        // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
        setTimeout(()=>{      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
        this.items.push(this.items[0]);  // 将数组的第一个元素添加到数组的
        this.items.shift();               //删除数组的第一个元素
        this.animate=false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
       },500)
      }

    }
  }
</script>

<style>
  #box{
    width: 300px;
    height: 32px;
    overflow: hidden;
    padding-left: 30px;
    border: 1px solid black;
  }
  .anim{
    transition: all 0.5s;
    margin-top: -30px;
  }
  #con1 li{
    list-style: none;
    line-height: 30px;
    height: 30px;
    width: 560px;
    /*text-align: center;*/
  }
  #con1 li span {
    display: inline-block;
    width: 115px;
    text-align: right;
    overflow: hidden;
  }
  #con1 li span:first-child {
    width: 180px;
    text-align: left;
    overflow: hidden;
    margin-left: 20px;
  }
  /*#con1 li span:last-child {*/
    /*float: right;*/
    /*width: 50px;*/
  /*}*/



</style>
