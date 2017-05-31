<template>
  <div id="app">
    <header>
      <div>
        <img class="logo" src="./assets/logo.png">
        <span>vue.js 中文社区</span>
      </div>
    </header>
    
    <div class="router">
      <router-view></router-view>
    </div>

    <Bottom></Bottom>
  </div>
</template>

<script>
import Bottom from './components/bottom'
export default {
  name: 'app',
  components: {Bottom}
}
</script>

<style lang='less' scoped>
@import './assets/css/reset.css';
@import './assets/css/index.less';

/* header */
header {
  background:@bg;
}

header > div {
  width:300px;
  text-align:center;
  margin:0 auto;
}

.logo {
  width:45px;
  height:45px;
}

header span {
  display:inline-block;
  color:#fff;
  font-size:20px;
  margin-top:10px;
  vertical-align:top;
}



.router {
  /*background:#E1E1E1;*/
  /*padding:5px 10px;*/
}

</style>
