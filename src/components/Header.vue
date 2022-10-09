<template>
  <!-- 点击图片回到首页 -->
  <div class="header">
    <router-link :to="{name:'root'}">
      <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>
    <ul>
      <li><a href="#">首页</a></li>
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">登录</a></li>
    </ul>
  </div>
</template>

<script>
import root from 'lodash/_root';

  export default {
    name: 'Header'
  }
</script>

<!-- scoped表示样式只对当前组件有效 -->
<style scoped>
.header{
  background: #5a5555;
  height: 50px;
  margin-top: 10px;
}

img{
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}

ul{
  list-style: none;
  float: right;
  margin: 4px;
}

li{
  display: inline-block;
  padding: 10px 15px;
}

a{
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  text-shadow: none;
}

</style>