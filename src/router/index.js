import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SlideBar from '../components/SlideBar'

Vue.use(Router)

export default new Router({
  routes: [
    //根组件PostList
    {
      name: 'root',
      path: '/',
      components: {
        main: PostList
      }
    },
    {
      name: 'post_content',
      path:'/topic/:id&author=:name',//添加路径参数到UserInfo中
      // 将路径传递到其他组件Article中,引入后在router-view中渲染，此处main对应name显示的内容
      components:{
        main:Article,
        slidebar:SlideBar,
      }
    },
    {//设置Article里的路由和组件
      name:'user_info',
      path:'/userinfo/:name',
      //main会映射到App.vue中的页面上
      components:{
        main:UserInfo
      }
    },
  ]
})
