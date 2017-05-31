<template>
	<div id="message">
		<h2 v-if='!loading'>请先登陆</h2>
		<div v-if='loading'>
			<h3 class="title-bar">新消息</h3>
			<ul>
				<li v-for='val in hasnot_read_messages'>
                  	{{val.topic.title}}
        		</li>
        		<p v-if='hasnot_read_messages.length===0'>无消息</p>
			</ul>
			<h3 class="title-bar">过往消息</h3>
			<ul>
				<li v-for='val in has_read_messages'>
					{{val.topic.title}}
				</li>
        		<p v-if='has_read_messages.length===0'>无消息</p>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'message',
  data () {
    return {
      data: '',
      accesstoken: '',
      loading: false,
      hasnot_read_messages: [],
      has_read_messages: []
    }
  },
  created () {
    this.accesstoken = localStorage.getItem('accesstoken')
    if (this.accesstoken) {
      this.loading = true
      this.getData()
    }
  },
  methods: {
    getData () {
      let that = this
      let url = 'https://www.vue-js.com/api/v1/messages?accesstoken=' + this.accesstoken
      axios.get(url).then(function (res) {
        // console.log(res)
        let data = res.data.data
        that.hasnot_read_messages = data.hasnot_read_messages
        that.has_read_messages = data.has_read_messages
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='less' scoped>
#message {
  padding:10px;
}

.title-bar {
  padding: 8px 5px;
  background: #F6F6F6;
}

#message ul {
  margin: 10px;
}

</style>
