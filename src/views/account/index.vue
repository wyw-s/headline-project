<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账户信息</span>
      </div>
      <el-form ref="form" :model="formData" label-width="80px">
        <el-form-item label="用户头像">
          <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
          >
            <img :src="formData.photo" style="width: 80px">
          </el-upload>
        </el-form-item>
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
          <el-button type="primary" @click="onSubmit">保存修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
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
    this.account()
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    account () {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址
        url: '/user/profile'
      }).then(res => {
        console.log(res)
        this.formData = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
