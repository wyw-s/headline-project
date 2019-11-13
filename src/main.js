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
// 注册全局 element-ui
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
