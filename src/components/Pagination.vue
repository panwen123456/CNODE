<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="jduge" class="pagebtn">......</button>
    <!-- 动态绑定选中页面按钮的样式 currentPage是类名，当前页码与btn相同使用样式,不相同使用默认样式pagebtn-->
    <!-- 绑定按钮事件，传递页码btn，点击按钮则改变当前页-->
    <button v-for="btn in pagebtns"  
            @click="changeBtn(btn)"
    :class="[{currentPage:btn === currentPage},'pagebtn']">
      {{btn}}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>
  <!-- Pagination在PostList中是作为子组件传递的 -->
<script>
  import { number } from 'bfj-node4/src/events';
import $ from 'jquery'
  export default {
    name:'Pagination',
    data(){
      return {
        pagebtns:[1,2,3,4,5,'......'],
        //表示当前选中的页面
        currentPage:1,
        jduge:false
      }
    },
    methods:{
      //将传递进的页码改为当前页
      changeBtn(page){
        //点击上一页，下一页,首页，如果点击的不是number则可判断,innerText表示上一页下一页的按钮
        if(typeof page !== 'number') {
          switch(page.target.innerText) {
            case '上一页':
              //点击当前样式按钮的上一个按钮
              $('button.currentPage').prev().click();
              break;
            case '下一页':
              $('button.currentPage').next().click();
              break;
              //点进首页时pageBen要重置,同时让按钮点击到第一页
            case '首页':
              this.pagebtns = [1,2,3,4,5,'......'];
              this.changeBtn(1);
              break;
            default:
              break;
          }
          // 点击下一页，不让按钮执行下面的方法
          return;
        }
        this.currentPage = page;
        if(page>4){
          this.jduge = true;
        }else{
          this.jduge = false;
        }
        //实现页码显示1-5到2-6的转变，例如点击到最后页数5时，得往后加一个元素，移除第一个元素，增加6，移出1
        if(page === this.pagebtns[4]){
          this.pagebtns.shift();//移除第一个元素
          this.pagebtns.splice(4,0,this.pagebtns[3]+1)//添加最后一个
        }
        //同理实现向前翻-1页的效果,限制出现负数页的效果
        else if(page === this.pagebtns[0] && page !== 1){
          //点击第一个元素时，移除最后一个元素，往前加一个元素
          //现在第一个位置加一个
          this.pagebtns.unshift(this.pagebtns[0]-1);
          this.pagebtns.splice(5,1);
        }
        //点击任意页面按钮触发handleList改变渲染PostList页面事件
        this.$emit('handleList',this.currentPage);
      }
    }
  }
</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>