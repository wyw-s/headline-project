<template>
  <div>
    <!--布局开始-->
    <el-container>
      <!--左侧内容-->
      <el-aside width="200px">左侧内容</el-aside>
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
  name: 'index',
  components: {}
}
</script>
