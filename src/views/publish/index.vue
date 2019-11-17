<template>
    <el-card class="box-card">
      <div slot="header">
        <span>发表文章</span>
      </div>
      <el-form ref="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="article.title" placeholder='文章名称'></el-input>
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
          <el-select v-model="article.channel_id" placeholder="请选择">
            <!--option 会把下拉列表的value值，同步到region_id数据中-->
            <!--默认选中所有频道-->
            <el-option
                v-for="item in channels"
                :label="item.name"
                :value="item.id"
                :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
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
    onSubmit () {
      console.log('submit!')
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
