// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import requestPlug from './assets/plugs/requestPlug'
import download from './assets/plugs/download'

Vue.config.productionTip = false;
Vue.use(requestPlug);
Vue.use(download);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
