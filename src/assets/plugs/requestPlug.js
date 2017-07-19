/**
 * 发送post请求的插件
 */
// 处理请求参数的函数
function getParamFactory(obj){
	let param = {};
	if(obj.__proto__ !== {}.__proto__){
		throwError('$ajax方法传入的参数不是object');
		return;
	}
	if(Object.keys(obj).length === 0){
		throwError('$ajax方法传入的参数不能为空的object');
		return;
	}
	if(!obj.url){
		throwError('$ajax方法的参数没有找到请求的url');
		return;
	}
	// 处理发送请求的url
	param.url = obj.url;
	// 处理请求的type
	if(obj.type){
		param.type = obj.type;
	}else{
		param.type = 'post';
	}
	// 处理请求的参数
	if(obj.data && obj.data.__proto__ === new FormData().__proto__){
		param.data = obj.data;
	}else{
		param.contentType = 'application/x-www-form-urlencoded;chartset=UTF-8';
		if(obj.data && obj.data.__proto__ === {}.__proto__){
			param.data = dataFactory(obj.data);
		}
	}
	return param;
}
// 提示异常错误的函数
function throwError(str){
	console.error(str);
}
// 将请求参数从obj转化成良好的字符串格式
function dataFactory(data){
	let str = '';
	for(let i in data){
		str += `${i}=${data[i]}&`;
	}
	return str.substr(0,str.length-1);
}
// 状态更改的处理函数
function handler(resolve,reject,client,url){
	if(client.readyState !== 4){
			return;
		}
		if(client.status == 200){
			if(client.response.code == 200){
				resolve(client.response);
			}else{
				reject({
					showClose:true,
					message:'后台处理异常'+url,
					type:'error',
					duration:0
				})
			}
		}else{
			reject({
				showClose:true,
				message:'请求失败'+url,
				type:'error',
				duration:0
			})
		}
}

const requestPlug = {
	install(Vue,options){
		Vue.prototype.$ajax = (obj) => {
			let param = getParamFactory(obj);
			let promise = new Promise((resolve,reject) => {
				let client = new XMLHttpRequest();
				client.open(param.type,param.url);
				client.onreadystatechange = () => {
					handler(resolve,reject,client,param.url);
				}
				client.responseType = 'json';
				if(param.contentType){
					client.setRequestHeader('Content-Type',param.contentType);
				}
				client.send(param.data);
			})
			return promise;
		}
	},
}
export default requestPlug;
