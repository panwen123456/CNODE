<template>
  <div class="article">
    <!-- 如果正在加载，显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <!-- 加载成功显示以下div 此处点击title进入显示的内容，需绑定router-->
    <!-- PostList中点击链接进入到article的内容(标题)设置router-link -->
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">
          {{post.title}}
        </div>
        <ul>
            <li>•发布于: {{post.create_at | formatDate}}</li>
            <li>•作者:
              {{post.author.loginname}}
            </li>
            <li>•{{post.visit_count}}次浏览</li>
            <li>•来自{{post | tabFormatter}}</li>
        </ul>
        <div v-html="post.content" class="topic_content"></div>
      </div>
      <!-- 回复的列表 -->
      <div id="reply">
        <div class="topbar">回复</div>
        <div v-for="(reply,index) in post.replies" class="replySec">
          <div class="replyUp">
            <!-- 点击头像路由传递回复用户信息参数跳转到UserInfo界面 -->
            <router-link :to="{
              name:'user_info',
              params:{
                name:reply.author.loginname
              }
            }">
              <!-- 动态绑定回复头像 -->
              <img :src="reply.author.avatar_url">
            </router-link >
            <router-link :to="{
              name:'user_info',
                params:{
                  name:reply.author.loginname
                }
              }">
              <!-- 名字 -->
              <span>{{reply.author.loginname}}</span>
            </router-link>
            <!-- 第几楼 -->
          <span>
            &nbsp;{{index+1}}楼
          </span>
          <!-- 楼数大于0显示楼层 -->
          <span v-if="reply.ups.length>0">
          {{reply.ups.length}}
          </span>
          <span v-else>
          </span>
          </div>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Article',
    data() {
      return {
        isLoading:false,//是否正在加载
        post:{} //代表当前文章页的所有内容，所有属性。从PostList中的单个列表post点击传递来的内容
      }
    },
    methods:{
      //获取数据
      getArticleData() {
        //推荐第二种字符串模板形式
        // this.$http.get('http://mock.hunger-valley.com/cnode/api/v1/topic/'+this.$route.params.id)
        this.$http.get(`http://mock.hunger-valley.com/cnode/api/v1/topic/${this.$route.params.id}`)
          .then(res => {
            //接收请求来的数据
            if(res.data.success === true) {
              this.post = res.data.data
              this.isLoading = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    //请求之前获取数据
    beforeMount() {
      this.isLoading = true;
      this.getArticleData();
    },
    //Article和SlideBar在同一个页面，点击SlideBar的主题和回复link，同一路由发生变化
    //使同一个路由的页面Article组件显示getArticleData，需要添加watch监听
    watch:{
      '$route'(to,from) {
        this.getArticleData()
      }
    }
  }
</script>

<!-- 加了scope无法引入外面的图片 -->
<style>
@import url('../assets/markdown-github.css');
  .topbar {
    padding: 10px;
    background-color: #f6f6f6;
    height: 16px;
    font-size: 12px;
    margin-top: 10px;
  }

  .article:not(:first-child) {
    margin-right: 340px;
    margin-top: 15px;
  }

  #reply, .topic_header {
    background-color: #fff;
  }

  #reply {
    margin-top: 15px;
  }

  #reply img {
    width: 30px;
    height: 30px;
    position: relative;
    bottom: -9px;
  }

  #reply a, #reply span {
    font-size: 13px;
    color: #666;
    text-decoration: none;
  }
  .replySec{
    border-bottom:1px solid #e5e5e5;
    padding:0 10px;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }

  .replyUp a:nth-of-type(2) {
    margin-left: 0px;
    display: inline-block;
  }

  .topic_header {
    padding: 10px;
  }

  .topic_title {
    font-size: 20px;
    font-weight: bold;
    padding-top: 8px;
  }

  .topic_header ul {
    list-style: none;
    padding: 0px 0px;
    margin: 6px 0px;
  }

  .topic_header li {
    display: inline-block;
    font-size: 12px;
    color: #838383;
  }

  .topic_content {
    border-top: 1px solid #e5e5e5;
    padding: 0 10px;
  }

  .markdown-text img {
    width: 92% !important;
  }
</style>