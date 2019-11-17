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
            <el-option label="哈哈" value="css"></el-option>
            <el-option label="哈哈" value="css">1</el-option>
            <el-option label="哈哈" value="css">2</el-option>
            <el-option label="哈哈" value="css">3</el-option>
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
        title: '',
        content: '',
        channel_id: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
