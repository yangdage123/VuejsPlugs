<template>
  <div class="hello">
  	<button @click="postSome">点我</button>
  	<button @click="exportData">下载一句话</button>
  	<button @click="postData">请求2</button>
  	
  	
   <div>
   	<template v-for="i in arr">
   		<div @click="i.dosth">{{i.name}}</div>
   	</template>
   </div>
   
   
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      arr:[
      	{
      		name:'去签到',
      		dosth(){
      			window.location.href = 'www.qiandao.com';
      		}
      	},
      	{
      		name:'去抽奖',
      		dosth(){
      			window.location.href = 'www.choujiang.com';
      		}
      	},
      	{
      		name:'去充值',
      		dosth(){
      			window.location.href = 'www.chongzhi.com';
      		}
      	}
      ]
    }
  },
  methods:{
  	postSome(){
  		this.$doPost('www.baidu.com',{a:'1'}).then((res) => {
  			console.log(res);
  		}).catch((data) => {
  			console.log(data)
  		})
  	},
  	exportData(){
  		this.$download({name:'test',data:'你好啊'});
  	},
  	postData(){
//		let obj = new FormData();
//		obj.append('a','yang')
		let obj ={
			a:'a'
		}
		let fd = new FormData();
		fd.append('a','a');
		
		
  		this.$ajax({
  			url:'www.baidu.com',
  			data:fd,
  			type:'post',
  		}).then((res) => {
  			
  		}).catch((data) => {
  			console.log(data)
  		});
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
