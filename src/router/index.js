import Vue from 'vue'
import VueRouter from 'vue-router'
// 由于引用的为index文件，所以可以不用写到根地址
// @ 是 VueCLI 中提供的一种特殊的路径规则，它直接指向 src 目录路径
// 注意：在 VueCLI 创建的项目中，无论你在哪里使用 @ 符号，它永远指向 src
// 引入登录页文件
import login from '@/views/login'
// 引入主页布局文件；
import layout from '@/views/layout'
// 引入内容区域模块；
import Home from '@/views/Home'
// 引入文章模块；
import Article from '@/views/article'
// 引入发布模块；
import Publish from '@/views/publish'
// 引入注册全局路由；
Vue.use(VueRouter)

const routes = [
  // 主页路由；
  {
    // 默认路由；
    path: '/',
    component: layout,
    // 二级路由；
    children: [
      {
        // 首页 默认子路由；
        path: '',
        component: Home
      },
      {
        // 文章列表；
        path: '/article',
        component: Article
      },
      {
        // 发布模块；
        path: '/publish',
        component: Publish
      }
    ]
  },
  // 登录页路由；
  {
    path: '/login',
    component: login
  }
]

const router = new VueRouter({
  routes
})

export default router
