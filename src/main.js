import Vue from 'vue'
import App from './App.vue'
// 引入 路由文件。
import router from './router'
// 引入element-ui组件。
import ElementUI from 'element-ui'
// 引入element-ui 样式文件。
import 'element-ui/lib/theme-chalk/index.css'
// 引入index.less文件。
import './styles/index.less'
// 引入axios文件；
import axios from 'axios'
// 设置全局基地址；
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 把axios赋值给全局对象；
Vue.prototype.$axios = axios // 将axios共享出去；
// 注册全局 element-ui
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
