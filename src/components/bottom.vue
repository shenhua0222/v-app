<template>
	<div id="bottom" @click='addstyle($event)'>
		<router-link to='/' class='selected'>
			<span class="glyphicon glyphicon-home"></span><br/>首页
		</router-link>
		<router-link to='/publish'>
			<span class="glyphicon glyphicon-edit"></span><br/>发布
		</router-link>
		<router-link to='/message'>
			<span class="glyphicon glyphicon-envelope"></span><br/>消息
		</router-link>
		<router-link to='/user'>
			<span class="glyphicon glyphicon-user"></span><br/>我的
		</router-link>
	</div>
</template>

<script>
export default {
  name: 'bottom',
  date () {
    return {
      selected: true
    }
  },
  methods: {
    addstyle (ev) {
      let obj = ev.target.tagName.toUpperCase()
      let oA = document.querySelectorAll('#bottom a')
      if (obj === 'A') {
        this.clearStyle(oA)
        ev.target.setAttribute('class', 'selected')
      }
      if (obj === 'SPAN') {
        this.clearStyle(oA)
        ev.target.parentNode.setAttribute('class', 'selected')
      }
    },
    clearStyle (arr) {
      arr.forEach(function (item) {
        item.setAttribute('class', '')
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import '../assets/css/index.less';
@import '../assets/css/bootstrap.css';
	#bottom {
		position:fixed;
		bottom:0px;
		left:0px;
		background:#fff;
		width:100%;
		padding:5px 0 10PX 0;
		border-top:1px solid #cfcfcf;
		.flex;
	}

	#bottom  a {
		display:block;
		text-align:center;
		color:#cfcfcf;
		text-decoration:none;
	}

	#bottom a.selected {
		color: #369219;
	}



</style>

