<template>
  <div class="main">
    <!--卡片组件-->
    <el-card class="box-card">
      <div class="login-index">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!--表单组件-->
      <el-form style="margin-top: 25px ">
        <!--输入手机号-->
        <el-form-item>
          <el-input v-model="form.name" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!--输入验证码-->
        <el-form-item>
          <el-input style="width: 180px" v-model="form.name" placeholder="验证码"></el-input>
          <el-button plain style="float: right;">发送验证码</el-button>
        </el-form-item>
        <!--条款勾选-->
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        <!--登录-->
        <el-form-item>
          <el-button type="primary" style="width: 100%;margin-top: 20px">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: ''
      }
    }
  }
  // methods: {
  //   onSubmit () {
  //     console.log('submit!')
  //   }
  // }
}
</script>

<style lang='less' scoped>
  .main {
    background: url("../../assets/img/login_bg.jpg");
    background-size: cover;
    /*vh 是相对于浏览器计算的  100vh==>和浏览器一样高*/
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .login-index {
      text-align: center;

      img {
        width: 170px;
      }
    }

    .box-card {
      width: 350px;
      height: 340px;
      padding: 0 18px;
    }
  }

</style>
