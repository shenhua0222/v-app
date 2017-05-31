<template>
	<div class="content">
		<div class="head-up">
			<div class="title-wrap">
				<span v-if='data.top'>置顶</span>
				<span v-else-if='data.good'>精华</span>
				<h2>{{data.title}}</h2>
				<span v-if='!collect' class="collect" @click='on_collect'>加入收藏</span>
				<span v-if='collect' class="collect" @click='off_collect'>取消收藏</span>
			</div>
			<ul class="info">
				<li>发布于{{data.create_at | timeago}}</li>
				<!-- <li v-if='data.author.loginname'>作者 {{data.author.loginname}}</li> -->
				<li>{{data.visit_count}}次浏览</li>
				<li>来自 {{data.tab}}</li>
			</ul>
		</div>	

		<!-- md文档 -->
		<div v-html='data.content' class="content-md"></div>

		<!-- 评论 -->
		<div class="review">
			<p class="p-bg">{{data.replies.length}} 条回复</p>
			<ul>
				<li v-for='(item, index) in data.replies'>
					<div class="reply-info">
						<img class="viewer-avatar" :src="item.author.avatar_url">
						<span class="viewer">{{item.author.loginname}}</span>
						<span>{{index+1}}楼</span>
						<span>• {{item.create_at | timeago}}</span>
					</div>
					<div v-html='item.content' class="reply-md"></div>
				</li>
			</ul>
		</div>

		<div class="addreply">
			<p class="p-bg">添加回复</p>
			<div>
				<textarea v-model='content'></textarea>
				<button class="btn btn-primary" @click='reply'>回复</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import timeago from 'timeago'
export default {
  name: 'content',
  data () {
    return {
      data: {},
      id: '',
      content: '',
      collect: false,
      accesstoken: ''
    }
  },
  created () {
    this.id = this.$route.params.id
    this.accesstoken = localStorage.getItem('accesstoken')
    this.getData()
    if (this.accesstoken) {
      this.isCollected()
    }
  },
  methods: {
    getData () {
      let url = 'https://www.vue-js.com/api/v1/topic/' + this.id
      axios.get(url).then(function (res) {
        this.data = res.data.data
        // console.log(this.data)
      }.bind(this))
    },
    reply () {
      let that = this
      if (this.accesstoken) {
        let url = 'https://www.vue-js.com/api/v1/topic/' + this.id + '/replies'
        axios.post(url, {
          accesstoken: this.accesstoken,
          content: this.content
        })
        .then(function () {
          that.getData()
          that.content = ''
        })
        .catch(function () {
          alert('回复失败')
        })
      }
    },
    isCollected () {
      let that = this
      let loginname = localStorage.getItem('loginname')
      axios.get('https://www.vue-js.com/api/v1/user/' + loginname)
      .then(function (res) {
        let collected = res.data.data.collect_topics
        that.collect = collected.some(function (n) {
          return n.id === that.id
        })
      })
    },
    on_collect () {
      let that = this
      if (this.accesstoken) {
        axios.post('https://www.vue-js.com/api/v1/topic/collect', {
          accesstoken: this.accesstoken,
          topic_id: this.id
        })
        .then(function (res) {
          that.collect = true
        })
        .catch(function (err) {
          console.log(err)
        })
      } else {
        alert('请先登陆')
      }
    },
    off_collect () {
      let that = this
      axios.post('https://www.vue-js.com/api/v1/topic/de_collect', {
        accesstoken: this.accesstoken,
        topic_id: this.id
      })
      .then(function (res) {
        that.collect = false
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  filters: {
    timeago (val) {
      let time = new Date(val)
      let thisTime = timeago()
      return thisTime.format(time, 'zh_CN')
    }
  }
}
</script>

<style lang='less'>    
@import '../assets/css/index.less';

/* 下划线 */
.underline {
	border-bottom:1px solid #E5E5E5;
}

.content {
	padding:15px 10px 100px;
}

.head-up {
	.underline;
}

.title-wrap span {
	.tag;
	background:#369219;
	color:#fff;
} 

.title-wrap h2 {
	font-weight:bold;
	font-size:20px;
	display:inline;
	margin:2px 0 0 5px;
}

.collect {
	float:right;
}

.collect:hover {
	background: rgba(44, 180, 85, 1);
}

ul.info {
	margin:10px 0;
}

ul.info > li {
	display:inline-block;
	color:#838383;
	&:before {
		content: "•";
		padding:0 3px;
		color:#8B8D8B;
	}
}

/*md内容样式*/
.content-md {
	margin:15px;
}
.content-md h1,
.content-md h2,
.content-md h3,
.content-md h4,
.content-md h5,
.content-md h6 {
	font-weight:bold;
	margin:30px 0 15px;
	border-bottom:1px solid #eee;
}

.content-md h1 {
    font-size: 32.5px
}

.content-md h2 {
    font-size: 26px
}

.content-md h3 {
    font-size: 24.5px
}

.content-md p {
	font-size: 15px;
	line-height: 1.7em;
	overflow: auto;
	margin: 5px 0;
}

.content-md ul {
	margin: 1em 2em;
}

.content-md li {
	font-size: 14px;
    line-height: 2em;
    list-style-type: circle;
}

.content-md pre {
	font-size: 14px;
    padding: 0 15px;
    border: 0;
    margin: 20px -10px;
    border-width: 1px 0;
    background: #f7f7f7;
}

/*  评论区样式  */

.review {
	margin: 15px;
}

.review > ul > li {
	margin: 10px 0;
	.underline;
}

.p-bg {
	background-color: #f6f6f6;
	padding: 10px;
	color: #2D6C41;
	font-size: 14px;
}

.viewer-avatar {
	width:30px;
	height:30px;
	vertical-align:top;
}

.reply-info span {
	color: #4AB3E8;
}

.reply-info .viewer {
	color: #666;
	margin-left:5px;
}

.reply-md {
	margin: 10px 0 15px 10px;
}

.reply-md p {
	white-space: pre-wrap;
	word-wrap: break-word;
}

/* 添加回复板块样式 */

.addreply textarea {
	display:block;
	width: 98%;
    line-height: 2em;
    height: 150px;
    resize: vertical;
    font-size: 15px;
    padding: .5em;
    border: 0;
    box-shadow: 0 0 2px rgba(60,60,60,.5);
    margin: 10px auto;
}

.btn-primary {
	background: #3374DE;
}

.btn {
	
	border:none;
	color:#fff;
	padding:5px 10px;
	border-radius:3px;
}

.btn:hover {
	background: #085DF0;
}

</style>
