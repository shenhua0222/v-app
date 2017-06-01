<template>
  <div id="all">
  	<nav @click='handleTab($event)'>
      <span value='all'>全部</span>
      <span value='good'>精华</span>
      <span value='share'>分享</span>
      <span value='ask'>问答</span>
      <span value='job'>招聘</span>
    </nav>
  	<ul>
  		<li v-for='val in items'>
  			<img :src="val.author.avatar_url" :title="val.author.loginname">
  			<div class="reply_count">
  				<span>{{val.reply_count}}</span>
  				/ {{val.visit_count}}
  			</div>
  			<span class="bluetag" v-if='val.top'>置顶</span>
  			<span class="graytag" v-if='!val.top'>{{val.tab}}</span>
        <router-link :to="'content/'+val.id">{{val.title}}</router-link>
  			<span class="timeago">{{val.last_reply_at | timeago }}</span>
  		</li>
  		<p v-if='items.length===0'>暂无话题</p>
  	</ul>
  	<div v-infinite-scroll='loadmore' infinite-scroll-disabled='busy' infinite-scroll-distance='10'>
  		<div class="loading" v-if='busy&&!nomore'></div>
  		<br>
  	</div>
  </div>
</template>

<script>
import axios from 'axios'
import timeago from 'timeago'
export default {
  name: 'all',
  data () {
    return {
      busy: false,
      nomore: false,
      items: [],
      page: 1,
      tab: 'all'
    }
  },
  methods: {
    getDate () {
      var that = this
      axios.get(this.url).then(function (res) {
        that.items = res.data.data
      })
      // console.log(2)
    },
    handleTab (ev) {
      if (ev.target.tagName.toUpperCase() === 'SPAN') {
        this.tab = ev.target.getAttribute('value')
        this.page = 1
        this.nomore = false // 以下两行恢复下拉加载后动画初始状态
        this.busy = false
        this.getDate()
      }
    },
    loadmore () {
      this.busy = true
      this.page++
      setTimeout(function () {
        axios.get(this.url, this.page).then(function (res) {
          let arr = res.data.data
          if (arr.length === 0) {
            this.busy = true
            this.nomore = true
            return
          }
          this.items = this.items.concat(res.data.data)
          this.busy = false
        }.bind(this))
      }.bind(this), 100)
    }
  },
  created () {
    this.getDate()
  },
  filters: {
    timeago (val) {
      var time = new Date(val)
      var thisTime = timeago()
      return thisTime.format(time, 'zh_CN') // 转换时间格式成 ……之前
    }
  },
  computed: {
    url () {
      return 'https://www.vue-js.com/api/v1/topics?tab=' + this.tab + '&page=' + this.page
    }
  }
}
</script>

<style lang='less' scoped>
@import '../assets/css/index.less';


 nav {
   background:#1C6132;
   .flex;
 }

 nav span {
   display:block;
   width:120px;
   text-align:center;
   color:#E7E7E8;
   line-height:40px;
   font-size:14px;
   position:relative;
   transform: perspective(1px) translateZ(0);
   -webkit-transform: perspective(1px);
 }

 nav span:before {
  content:'';
  position:absolute;
  z-index: -1;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background:rgba(21,131,52,0.4);
  transition:transform 0.3s ease-out;
  -webkit-transition:transform 0.3s ease-out;
  transform: scaleX(0);
  transform-origin: 50%;
  -webkit-transform-origin: 50%;
 }

nav span:hover:before {
  transform: scaleX(1);
  /*opacity:0;*/
}


#all > ul {
	margin:5px 15px;
	background:#fff;
}

#all > ul li {
	padding:10px;
	border-bottom:1px solid #F0F0F0;
	font-size:14px;
}
#all > ul li img {
	width:30px;
	height:30px;
	vertical-align:middle;
}

.reply_count {
	display:inline-block;
	margin:0 5px;
	font-size:12px;
	color:#BCBCBC;
}

.reply_count span {
	color:#A37FC3;
}

.bluetag {
	background:#369219;
	color:#fff;
	.tag;
}

.graytag {
	background:#E5E5E5;
	color:#A0A0A0;
	.tag;
}

.timeago {
	float:right;
}

.loading {
	width:50px;
	height:50px;
	margin:0 auto;
	border:3px solid green;
	border-radius:50%;
	border-left-color:#fff;
	border-right-color:#fff;
	animation:loading 1s linear infinite;
}

@keyframes loading {
	0%   {transfrom: rotate(0deg);}
	100% {transform: rotate(360deg);}
}
</style>
