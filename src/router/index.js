import Vue from 'vue'
import VueRouter from 'vue-router'
// 由于引用的为index文件，所以可以不用写到根地址
// @ 是 VueCLI 中提供的一种特殊的路径规则，它直接指向 src 目录路径
// 注意：在 VueCLI 创建的项目中，无论你在哪里使用 @ 符号，它永远指向 src
// 引入登录页文件
import login from '@/views/login'
// 引入主页布局文件；
import layout from '../views/layout'
// 引入内容区域模块；
import Home from '@/views/Home'
// 引入文章模块；
import Article from '@/views/article'
// 引入发布模块；
import Publish from '@/views/publish'
// 引入nprogress文件；
import NProgress from 'nprogress'
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

/*
* router.beforeEach((to, from, next) => {
* 注册一个全局前置守卫：
* 参数1：to，将要进入目标的路由对象;
* 参数2：from，将要离开的路由对象
* 参数3：next，它是一个方法，用于路由放行
* })
* */
// 路由导航前置钩子函数，在未完成前允许我们做一些事；
router.beforeEach((to, from, next) => {
  // 开启进度条；
  NProgress.start()
  // console.log(to)
  // console.log(from)
  // console.log(next)
  /*
  * 因为所有的页面都会经过判断，所以需要判断路由经过时是否是登录页login；
  * 若是则直接放行；若不是的则需要进行验证用户的登录状态 */
  if (to.path === '/login') {
    next()
    return
  }
  // 若登录的是非登录状态，则需验证；
  // 获取本地的token值；
  const token = window.localStorage.getItem('login_token')
  /*
  * 判断token 是否存在；存在则进入下个钩子函数；若不存在强制跳转到登录页
  * 如果所在的登录页是在非登陆状态下访问的非登录页面后跳转而来的，
  * 那么这里手动的终止进度条,否则进度条不会停止 */
  if (token) {
    next()
  } else {
    /*
    * 原因分析：判断不成立时执行以下代码，跳转页面，然后会再次判断，由此类推便形成了
    * 死循环，所以后面的代码不执行 */
    next('/login')
    NProgress.done()
  }
})

/*
* 路由导航后置钩子函数，在路由导航完成后允许我们做一些事；
* 路由导航结束后，关闭进度条 */
router.afterEach(() => {
  NProgress.done()
})

export default router
