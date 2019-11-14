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
        <!--导航-->
        <el-menu style="width:201px" background-color="#353b4e" text-color="#adafb5" active-text-color="#ffd04b">
          <!--一级菜单-->
          <el-menu-item>首页</el-menu-item>
          <!--二级菜单-->
          <el-submenu>
            <template slot="title">内容管理</template>
            <el-menu-item>发布文章</el-menu-item>
            <el-menu-item>内容列表</el-menu-item>
            <el-menu-item>评论列表</el-menu-item>
            <el-menu-item>素材管理</el-menu-item>
          </el-submenu>
          <!--二级菜单-->
          <el-submenu>
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
        <el-header>顶部</el-header>
        <el-main>
          <!--放置二级路由容器-->
          内容展示区
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  components: {}
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
