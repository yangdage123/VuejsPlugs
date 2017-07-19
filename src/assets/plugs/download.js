/**
 * 页面下载txt格式到本地
 * @param Object
 * {
 * 	name:'文件下载的名字', string
 *  data:'保存的文本'   string
 * }
 */
const download = {
	install(Vue,options){
		Vue.prototype.$download = (param) => {
			if(param.constructor != Object){
				console.error('$download仅支持传入Object类型的参数!');
				return;
			}
			this.down(param)
		}
	},
	down(param){
		let a = document.createElement('a');
		a.target = '_blank';
		a.download = param.name + '.txt';
		a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(param.data);
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
}
export default download;