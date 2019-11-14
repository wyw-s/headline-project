<template>
  <!--头部组件-->
  <el-row type="flex" justify="space-between" align="middle">
    <!--左右贴边布局-->
    <el-col :span="21" class='left'>
      <!--ico图标-->
      <i class="el-icon-s-unfold"></i>
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <el-col :span="3" class="right">
      <!--头像-->
      <img src="../assets/img/avatar.jpg" alt="">
      <!--下拉菜单-->
      <el-dropdown trigger="click">
        <!--<span></span>-->
        <span class="el-dropdown-link">
          邓紫棋
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'layout-header'
}
</script>

<style lang="less" scoped>
  .left {
    display: flex;

    i {
      font-size: 22px;
    }

    span {
      margin-left: 5px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    img {
      width: 40px;
      border-radius: 50%;
      margin-right: 8px;
    }
  }

</style>
