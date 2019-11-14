<template>
  <div class="main">
    <!--卡片组件-->
    <el-card class="box-card">
      <!--匿名插槽-->
      <div class="login-index">
        <img src="../../assets/img/logo_index.png" alt="">
      </div>
      <!--表单组件-->
      <el-form style="margin-top: 25px" :rules="loginrules" ref="ruleForm" :model="ruleform">
        <!--输入手机号-->
        <el-form-item prop="mobile">
          <el-input v-model="ruleform.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <!--输入验证码-->
        <el-form-item prop="code" style="margin-bottom: 10px">
          <el-input style="width: 180px" v-model="ruleform.code" placeholder="验证码"></el-input>
          <el-button plain style="float: right;">发送验证码</el-button>
        </el-form-item>
        <!--条款勾选-->
        <el-form-item prop="checked">
          <el-checkbox v-model="ruleform.checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <!--登录-->
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="onlogin('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    // 表单数据；
    return {
      ruleform: {
        mobile: '',
        code: '',
        checked: false
      },
      // 效验的数据及规则；
      loginrules: {
        mobile: [
          {
            required: true,
            message: '请输入手机号',
            trigger: 'blur'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '请正确输入手机号',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          },
          {
            pattern: /^\d{6}$/,
            message: '请输入6位数',
            trigger: 'change'
          }
        ],
        checked: [
          {
            /*
            * 当checked的值发生变化的时候触发执行函数 */
            // 自定义校验函数  validator
            // 其中有三个参数 (rule(当前规则),value(当前值),callback(回调函数))
            validator: function (rule, value, callback) {
              // 如果为true 就是选中了 则通过效验
              // if (value) {
              //   // 直接执行 回调函数 表示直接通过
              //   callback()
              // } else {
              //   callback(new Error('你需要勾选条款与协议'))
              // }
            // 利用三元表达式；
              value ? callback() : callback(new Error('你需要勾选条款与协议'))
            }
          }
        ]
      }
    }
  },
  methods: {
    // 登录的点击事件
    onlogin (ruleForm) {
      // $refs 为Element UI 提供的获取节点的方式
      // validate() 可以对整个表单进行效验，效验的规则：使用已有的规则重新进行效验
      this.$refs[ruleForm].validate((isok) => {
        if (isok) {
        // 如果为true 则通过效验
        // 则进行下一步 调用接口 完成登录；
          console.log('效验成功')
        }
      })
      // this.$refs.ruleForm.validate()
    }
  }
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
