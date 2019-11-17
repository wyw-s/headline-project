<template>
  <el-card class="box-card">
    <div slot="header">
      <span>发表文章</span>
    </div>
    <el-form label-width="80px" ref="form">
      <el-form-item label="标题">
        <el-input placeholder='文章名称' v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input type="textarea" v-model="article.content"></el-input>
      </el-form-item>
      <!--<el-form-item label="封面">-->
      <!--  <el-radio-group v-model="form.resource">-->
      <!--    <el-radio label="单图"></el-radio>-->
      <!--    <el-radio label="三图"></el-radio>-->
      <!--    <el-radio label="无图"></el-radio>-->
      <!--    <el-radio label="自动"></el-radio>-->
      <!--  </el-radio-group>-->
      <!--</el-form-item>-->
      <el-form-item label="频道">
        <el-select placeholder="请选择" v-model="article.channel_id">
          <!--option 会把下拉列表的value值，同步到region_id数据中-->
          <!--默认选中所有频道-->
          <el-option
              :key="item.id"
              :label="item.name"
              :value="item.id"
              v-for="item in channels"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit(false)" type="primary">发表</el-button>
        <el-button>存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: 'Publish',
  data () {
    return {
      article: {
        title: '', // 文本内容
        content: '', // 文章名称
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: '' // 文章id
      },
      // 存放频道，循环遍历到页面上；
      channels: []
    }
  },
  created () {
    // 页面加载，就需要把频道信息显示出来
    this.loadChannels()
  },
  methods: {
    onSubmit (draft) {
      // 发送axios请求；
      this.$axios({
        // 设置请求方式；
        method: 'POST',
        // 设置请求地址；
        url: '/articles',
        // 设置请求头并携带 token 数据；
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('login_token')}`
        },
        // 设置请求参数;
        params: {
          draft
        },
        data: this.article
      }).then(() => {
        console.log('发表成功')
      }).catch(() => {
        console.log('保存失败')
      })
    },
    // 用于获取频道列表
    loadChannels () {
      // 这里不需要 token
      // 发送axios请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址；
        url: '/channels'
      }).then(res => {
        // console.log(res)
        // 判断成立则把获取到的数据保存到数组中；
        this.channels = res.data.data.channels
      }).catch(() => {
        console.log('获取数据失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
