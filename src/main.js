// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//插件都是在main.js中引入的
import Axios from 'axios'

//$http发送请求
Vue.prototype.$http = Axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//PostList组件的时间过滤器
Vue.filter('formatDate',function(dataStr){
  if(!dataStr) return ''
  //现在的时间 - 传入的时间 = 相差的时间(毫秒)
  let time = parseInt((Date.now() - new Date(dataStr).getTime())/1000)
  switch (true) {
    case time < 0:
      return ''
    case time < 30:
      return '刚刚'
    case time < 60:
      return `${parseInt(time)}秒前`
    case time < 3600:
      return parseInt(time/60) + '分钟前'
    case time < 3600*24:
      return `${parseInt(time/3600)}小时前`
    case time < 3600*24*31:
      return `${parseInt(time/(3600*24))}天前`
    case time < 3600*24*31*12:
      return `${parseInt(time/(3600*24*31))}月前`
    default:
      return `${parseInt(time/(3600*24*31*12))}年前`
  }
})
//处理显示板块的文字
Vue.filter('tabFormatter', function(post){
  if(post.good === true) {
    return '精华'
  }else if(post.top === true) {
    return '置顶'
  }else if(post.tab === 'ask') {
    return '问答'
  }else if(post.tab === 'share') {
    return '分享'
  }else {
    return '招聘'
  }
})