import Vue from 'vue'
import App from './App.vue'
// 引入 路由文件。
import router from './router'
// 引入element-ui组件。
import ElementUI from 'element-ui'
// 引入element-ui 样式文件。
import 'element-ui/lib/theme-chalk/index.css'
/*
* 注意：加载第三方包中的具体文件不需要写具体路径，直接写包名即可
* 总结就是："包名/具体文件路径"
* */
// 引入nprogress样式文件；
import 'nprogress/nprogress.css'
// 引入index.less文件。
import './styles/index.less'
// 引入axios文件；
import axios from 'axios'
// 引入 json-bigint 文件；
import JSONbigint from 'json-bigint'
// 设置全局基地址；
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
/*
* axios 默认会把响应的json数据转换成对象，
* 但是它也允许我们自定义转换功能，
*/
axios.defaults.transformResponse = [function (data, headers) {
  /*
  * 因为所有的响应结果都会经过这里进行处理，二删除操作是没有响应结果的返回，
  * 所以转换出错；
  * 解决：把会发生错误的代码放到 try 里面，try==> js原始的方法
  */
  try {
    return JSONbigint.parse(data)
  } catch (err) {
    // 如果try 里面的代码执行错误，则执行catch里面的代码；
    return {}
  }
}]
// 把axios赋值给全局对象；
Vue.prototype.$axios = axios // 将axios共享出去；
// 注册全局 element-ui
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
