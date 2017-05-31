<template>
	<div id="publish">
		<div class="tab-choose">
			<p>选择板块</p>
			<select v-model='tab'>
				<option value="share">分享</option>
				<option value="ask">问答</option>
				<option value="job">招聘</option>
			</select>
		</div>
		<div class="p-title">
			<p>标题</p>
			<input type="text" v-model='title' placeholder="标题数字10字以上">
		</div>
		<div class="p-md">
			<textarea v-model='content' placeholder="支持markdown格式"></textarea>
		</div>
		<button class="btn btn-primary publish-btn" @click='reply'>发布话题</button>
		<div v-if='!accessToken' class="mask">
			<div class="dialog">
				<h2>提示：</h2>
				<p>请先登录</p>
				<div>
					<router-link to='login'>确定</router-link>
					<router-link to='/'>取消</router-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
import marked from 'marked'
export default {
  name: 'publish',
  data () {
    return {
      title: '',
      content: '',
      tab: 'share',
      accessToken: '',
      url: 'https://www.vue-js.com/api/v1/topics'
    }
  },
  created () {
    this.accessToken = localStorage.getItem('accesstoken')
    console.log(this.accessToken)
  },
  methods: {
    reply () {
      this.content = marked(this.content)
      let that = this
      let obj = {
        accesstoken: this.accessToken,
        tab: this.tab,
        title: this.title,
        content: this.content
      }
      // console.log(obj)
      axios.post(this.url, obj).then(function (res) {
        let topicId = res.data.topic_id
        that.title = ''
        that.tab = 'share'
        that.content = ''
        that.$router.push({
          path: '/content/' + topicId
        })
      })
      .catch(function (err) {
        if (err) {
          console.log(err)
        }
      })
    }
  }
}
</script>  


<style>


#publish {
	margin: 10px;
}

.tab-choose > p,
.p-title > p {
	font-size: 14px;
	color: #C4C4C4;
	margin: 10px 0;
}

.tab-choose select {
	border:none;
	width: 99%;
	padding: 3px 0;
	border-bottom: 1px solid #E1E1E1;
	margin-bottom: 15px;
}

.tab-choose select:focus {
	border: none;
}

.p-title input {
	width: 99%;
	padding: 3px;
	margin-bottom: 20px;
	border-bottom: 1px solid #E1E1E1;
}



.p-md textarea {
	box-sizing: border-box;
	width: 99%;
	border: none;
	background: #F7F7F7;
	padding: 15px 10px;
	height: 300px;
	margin-bottom: 25px;
}

.publish-btn {
	width: 100%;
	background: rgba(44, 167, 80, 0.8)!important;
}

.publish-btn:hover {
	background: rgba(44, 167, 80, 1)!important;
}

.mask {
	position: fixed;
	top: 0;
	bottom: 0;
	width: 100%;
	background: rgba(0,0,0,0.3);
}

.dialog {
	width: 50%;
	height:140px;
	background: #fff;
	position: absolute;
	top: 50%;
	left: 25%;
	margin-top: -70px;
	box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.dialog h2 {
	font-size: 22px;
	margin: 15px 20px;
}

.dialog p {
	font-size: 16px;
	margin: 15px 25px;
	color: #666;
}

.dialog a {
	float: right;
	font-size: 16px;
	color: #3BAEA4;
	margin-right: 50px;
	text-decoration: none;
}

.dialog a:hover {
	color: #2CB2A5;
	font-size: 17px;
}

</style>
