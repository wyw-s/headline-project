<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <el-col :span=10>
        <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="用户昵称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="个人介绍">
            <el-input type="textarea" v-model="formData.intro"></el-input>
          </el-form-item>
          <el-form-item label="用户邮箱">
            <el-input v-model="formData.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="formData.mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit(true)">保存修改</el-button>
            <el-button @click="onSubmit(false)">取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span=5 :offset="1">
        <!--
        组件拥有默认的上传行为，但是默的是post请求方式和我们的不一样,
        但是组件同样的也给我们提供了自定义上传行为，http-request
        action="" 此属性必须有，否则报错
        -->
        <el-upload
            class="avatar-uploader"
            action=""
            :http-request="onUpload"
            :show-file-list="false"
        >
          <img :src="formData.photo" style="width: 100%">
          <span>点击上传头像</span>
        </el-upload>
      </el-col>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'account',
  data () {
    return {
      formData: {}
    }
  },
  created () {
    // 页面加载显示数据信息
    this.account()
  },
  methods: {
    /**
     * 获取用户信息列表
     */
    account () {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址
        url: '/user/profile'
      }).then(res => {
        this.formData = res.data.data
      })
    },
    /**
     * 点击保存修改
     * 注意；后台对数据做了验证昵称的字符数不能超过7个，否则报错！
     */
    onSubmit (type) {
      if (!type) {
        // 页面加载显示数据信息
        this.account()
        return
      }
      // 由接口文档得知，需要json格式的数据，对象结构==>可以只获取一部分
      const { name, intro, email } = this.formData
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'PATCH',
        // 设置请求地址；
        url: '/user/profile',
        // 设置请求参数；
        data: {
          name,
          intro,
          email
        }
      }).then(() => {
        // 修改成功从新加载页面；
        this.account()
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message.error('修改失败')
      })
    },
    /**
     * 自定义上传方式；
     * 此回调函数拥有一个默认的参数，官方文档为给出，
     * 默认的参数 的对象包含一个文件对象config.file
     */
    onUpload (config) {
      // 创建表单对象；
      const formobj = new FormData()
      // 添加数据；
      formobj.append('photo', config.file)
      // 开始请求；
      this.$axios({
        // 设置亲求方式；
        method: 'PATCH',
        // 设置请求地址；
        url: '/user/photo',
        // 设置请求参数；
        data: formobj
      }).then(res => {
        // 请求成功修改图片地址；
        this.formData.photo = res.data.data.photo
        this.$message({
          type: 'success',
          message: '上传成功'
        })
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
