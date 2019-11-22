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
      <img :src="User.photo" alt="">
      <!--下拉菜单-->
      <el-dropdown trigger="click">
        <!--<span></span>-->
        <span class="el-dropdown-link">
          {{ User.name }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item>git地址</el-dropdown-item>
          <!--
          如果想要给一个组件注册一个原生 JavaScript 事件
          使用 .native 修饰符
          -->
          <el-dropdown-item @click.native='onLogout'>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'layout-header',
  data () {
    return {
      User: {}
    }
  },
  created () {
    this.LoadUser()
  },
  methods: {
    onLogout () {
      this.$confirm('此操作将退出登录状态', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认退出，删除本地的token数据；
        window.localStorage.removeItem('login_token')
        // 编程式导航，跳转到登录页面；
        this.$router.push('/login')
        // 消息提示
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    },
    /**
     * 获取用户个人资料
     */
    LoadUser () {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址
        url: '/user/profile'
      }).then(res => {
        this.User = res.data.data
      }).catch(() => {
        this.$message.error('获取失败')
      })
    }
  }
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
