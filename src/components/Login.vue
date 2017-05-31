<template>
	<div id="login">
		<div class="login-box">
			<input type="text" v-model='val' placeholder="Access Token">
			<p v-if='err'>输入错误，请重新输入</p>
			<span class="login-btn" @click='login'>登陆</span>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      val: '',
      err: false
    }
  },
  methods: {
    login () {
      let that = this
      axios.post('https://www.vue-js.com/api/v1/accesstoken', {
        accesstoken: this.val
      })
      .then(function (res) {
        that.err = false
        localStorage.setItem('accesstoken', that.val)
        localStorage.setItem('loginname', res.data.loginname)
        that.$router.push({
          path: '/user'
        })
      })
      .catch(function (err) {
        console.log(err)
        that.err = true
      })
    }
  }
}
</script>

<style>
/*@import '../assets/css/index.less';*/


#login {
	width: 100%;
	height: 100%;
}

.login-box {
	width: 256px;
	height: 150px;
	position: absolute;
	left: 50%;
	top: 50%;
	margin: -75px 0 0 -128px;
	overflow: hidden;
}

#login input {
	width: 100%;
	padding: 5px 10px;
	border-bottom: 2px solid #eee;
}

.login-btn {
	display: block;
	width: 100%;
	margin: 15px 0;
	text-align: center;
	font-size: 14px;
	padding: 5px;
	box-sizing: border-box;
	background: rgb(10,173,57);
	color: #fff;
	border-radius: 3px;
}

.login-btn:hover {
	background: rgba(10,173,57,0.8);
}

</style>
