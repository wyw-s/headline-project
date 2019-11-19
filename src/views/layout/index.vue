<template>
  <div>
    <!--布局开始-->
    <el-container>
      <!--左侧布局-->
      <el-aside width="200px" class="my-left">
        <!--顶部图片-->
        <div class="my-logo_admin">
          <img src="../../assets/img/logo_admin.png">
        </div>
        <!--
        导航
        router: 是否使用 vue-router 的模式，
        启用该模式会在激活导航时以 index 作为 path 进行路由跳转
        -->
        <el-menu
            style="width:201px"
            background-color="#353b4e"
            text-color="#adafb5"
            active-text-color="#ffd04b"
            router
        >
          <!--
          一级菜单 index==>会匹配路由表中的路径 完成跳转
          -->
          <el-menu-item index='/'>首页</el-menu-item>
          <!--二级菜单-->
          <el-submenu index='1'>
            <template slot="title">内容管理</template>
            <el-menu-item index='/publish'>发布文章</el-menu-item>
            <el-menu-item index='/article'>内容列表</el-menu-item>
            <el-menu-item index='/comment'>评论列表</el-menu-item>
            <el-menu-item index='/image'>素材管理</el-menu-item>
          </el-submenu>
          <!--二级菜单-->
          <el-submenu index='2'>
            <template slot="title">粉丝管理</template>
            <el-menu-item>图文数据</el-menu-item>
            <el-menu-item>粉丝概括</el-menu-item>
            <el-menu-item>粉丝画像</el-menu-item>
            <el-menu-item>粉丝列表</el-menu-item>
          </el-submenu>
          <el-menu-item>账户信息</el-menu-item>
        </el-menu>
      </el-aside>
      <!--右侧布局容器-->
      <el-container>
        <el-header>
          <layout-hearder></layout-hearder>
        </el-header>
        <el-main>
          <!--放置二级路由容器-->
          <!--
          由于共用的同一个组件，而路由的渲染采用的是复用，而不是销毁在创建
          ，也就是 缓存；
          禁用路由缓存 只需要在路由的出口容器上添加有个Key就可以了
          -->
          <router-view :key="$route.path"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 导入 layout 文件；
import layoutHeader from '../../components/layout-header.vue'

export default {
  name: 'layout',
  // 注册组件；
  components: {
    'layout-hearder': layoutHeader
  }
}
</script>

<style lang='less' scoped>
  .my-left {
    height: 100vh;
    background-color: #323745;
    overflow: hidden;

    .my-logo_admin {
      width: 200px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2e2f32;

      img {
        width: 120px;
      }
    }
  }

</style>
