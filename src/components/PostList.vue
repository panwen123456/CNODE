<template>
  <div class="PostList">
    <!-- 在数据未返回的时候，显示这个正在加载的gif -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <!-- 代表我们的主题贴子列表,数据返回则显示主题列表-->
    <div class="posts" v-else>
      <ul>
        <!-- 第一行li标题 -->
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>
        <!-- v-for循环渲染列表 -->
        <li v-for="post in posts">
          <!-- v-bind动态绑定img头像 -->
          <img :src="post.author.avatar_url">
          <!-- 回复/浏览 -->
          <span>
            <span class="reply_count">{{post.reply_count}}</span>
            /{{post.visit_count}}
          </span>
          <!-- 贴子的分类 精华置顶为true对应有各自class的背景色,其余为tab普通栏-->
          <!-- js里对象的key支持直接写下划线，不支持中划线，中划线要用 ' ' 包一下变成字符串 -->
          <span :class="[{put_good:(post.good === true),
          put_top: !!post.top, 'topiclist-tab':(post.good !== true && post.top !== true)}]">
            <!-- 帖子分类中文字显示的过滤器 -->
            <span>
              {{post | tabFormatter}}
            </span>
          </span>
          <!-- 标题 此处设置点击到Article的路由，并在route/index.js定义-->
          <router-link :to="{
            name:'post_content',
            //传递的参数给Article,并用id接收,name传递到UserInfo
            params:{
              id: post.id,
              name: post.author.loginname
            }
          }">
            <span>
            {{post.title}}
            </span>
          </router-link>
          <!-- 最终恢复时间 过滤器写在main.js中-->
          <span class="last_reply">
            {{post.last_reply_at | formatDate}}
          </span>
        </li>
        <li>
          <!-- 分页  子组件给父组件传递数据的问题 定义自定义事件方法-->
          <!-- Pagination在PostList中是作为子组件传递的，li是父组件，将点击的页码传递给父组件-->
          <pagination @handleList="renderList"></pagination>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import pagination from './Pagination'
  export default {
    name: 'PostList',
    data() {
      return {
        isLoading: false,
        posts:[],//代表页面的列表数组
        postpage: 1//代表需要传递的页码
      }
    },
    components:{
      pagination,
    },
    methods:{
      getData(){
        this.$http.get('http://mock.hunger-valley.com/cnode/api/v1/topics',{
          // page: 1,get请求一定要写params参数
          params:{
            //传递页码数据
            page: this.postpage,
            limit: 20,
          }
        })
          .then(res => {
            //加载成功去除动画，显示列表
            this.isLoading = false;
            console.log(res)
            this.posts = res.data.data;
          })
          .catch(err => {
            //处理返回失败后的问题
            console.log(err)
          })
      },
      //接收的参数为子组件Pagination传递来的参数,接收到显示弹窗
      renderList(value){
        //获取请求来的data页码数据，并接收子组件传递的参数
        this.postpage = value;
        this.getData();
      }
    },
    
    beforeMount(){
      this.isLoading = true; //加载成功之前执行加载动画
      this.getData(); //在页面加载之前获取数据
    }
  }
</script>

<!-- scoped表示样式只对当前组件有效 -->
<style scoped>
  .PostList{
    background-color: #e1e1e1;
  }
  .posts {
    margin-top: 10px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  /* 不包含第一个li标题的其他样式 */
  ul li:not(:first-child) {
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 80px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  /* 第一个li标题样式 */
  .toobar {
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .toobar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }
</style>