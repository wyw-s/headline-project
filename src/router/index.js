import Vue from 'vue'
import VueRouter from 'vue-router'
// 由于引用的为index文件，所以可以不用写到根地址
// 引入主页文件；
import Home from '../views/Home'
// 引入登录页文件
import login from '../views/login'
// 注册全局路由；
Vue.use(VueRouter)

const routes = [
  // 强制跳转到主页
  {
    path: '',
    redirect: '/index'
  },
  // 主页路由；
  {
    path: '/index',
    component: Home
  },
  // 登录页路由；
  {
    path: '/login',
    component: login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
