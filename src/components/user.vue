<template>
	<div id="user">
		<div class="u-head">
			<div class="u-avatar">
				<img :src="data.avatar_url">
			</div>
			<p class="username">{{data.loginname}}</p>
			<span class="score">积分：{{data.score}}</span>
			<span class="created-time">注册时间：{{data.create_at | timeago}}</span>
		</div>
		<div class="u-main">
			<p>最近创建的话题</p>
			<ul>
				<li v-for='val in data.recent_topics'>
					<img class="pic" :src="val.author.avatar_url">
					<router-link :to="'/content/'+val.id">{{val.title}}</router-link>
					<span class="time-rt">{{val.last_reply_at | timeago}}</span>
				</li>
			</ul>
			<p>最近参与的话题</p>
			<ul>
				<li v-for='val in data.recent_replies'>
					<img class="pic" :src="val.author.avatar_url">
					<router-link :to="'/content/'+val.id">{{val.title}}</router-link>
					<div class="f-rt">
						<img :src="data.avatar_url">
						<span>{{val.last_reply_at | timeago}}</span>
					</div>
				</li>
			</ul>

			<p>收藏话题</p>
			<ul>
				<li v-for='val in data.collect_topics'>
					<img class="pic" :src='val.author.avatar_url'>
					<router-link :to="'/content/'+val.id">{{val.title}}</router-link>
					<span class="time-rt">{{val.last_reply_at | timeago}}</span>
				</li>
			</ul>
		</div>
		<p class="u-cancel" @click='cancel'>退出登录</p>
	</div>
</template>

<script>
import axios from 'axios'
import timeago from 'timeago'
export default {
  name: 'user',
  data () {
    return {
      data: ''
    }
  },
  created () {
    let accesstoken = localStorage.getItem('accesstoken')
    if (!accesstoken) {
      this.$router.push({
        path: '/login'
      })
    }
    this.getData()
  },
  methods: {
    getData () {
      let that = this
      let accesstoken = localStorage.getItem('accesstoken')
      let url = 'https://www.vue-js.com/api/v1/accesstoken/'
      // post 获取用户名
      axios.post(url, {accesstoken: accesstoken}).then(function (res) {
        // console.log(res)
        let user = res.data.loginname
        axios.get('https://www.vue-js.com/api/v1/user/' + user)
        .then(function (res) {
          that.data = res.data.data
        })
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    cancel () {
      localStorage.setItem('accesstoken', '')
      this.$router.push({
        path: '/'
      })
    }
  },
  filters: {
    timeago (val) {
      let time = new Date(val)
      let thistime = timeago()
      return thistime.format(time, 'zh_CN')
    }
  }
}
</script>

<style>
@import '../assets/css/index.less';

#user {
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}
.u-head {
  width: 50%;
  margin: 20px auto;
  text-align: center;
}

.u-avatar img{
    width: 96px;
    height: 96px;
    border-radius: 50%;
}

.username {
  color: #009688;
    font-weight: 700;
    font-size: 24px;
    margin: 10px 0;
}

.score {
  float: left;
  margin-left: 10px;
}

.created-time {
  float: right;
}

.u-main {
  clear: both;
  padding: 10px 0;
}
.u-main p {
  padding: 8px 5px;
  background: #F6F6F6;
}

.u-main li {
  margin: 8px;
}

.time-rt {
  float: right;
}

.pic {
  width: 30px;
  height: 30px;
  margin-right: 8px;
}

.f-rt {
  float: right;
}

.f-rt img {
  width: 18px;
  height: 18px;
}

.u-cancel {
  text-align: center;
  margin: 20px 0;
  width: 100%;
  padding: 8px;
  color: #fff;
  border-radius: 5px;
  background: rgba(44, 167, 80, 0.8);
}

.u-cancel:hover {
  background: rgba(44, 167, 80, 1);
}

</style>
