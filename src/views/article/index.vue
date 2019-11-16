<template>
  <div>
    <el-card class="article">
      <div slot='header'>
        <span>全部图文</span>
      </div>
      <el-form :model='articleform'>
        <el-form-item label='文章状态:'>
          <el-radio-group v-model='articleform.resource'>
            <el-radio label='全部'></el-radio>
            <el-radio label='草稿'></el-radio>
            <el-radio label='待审核'></el-radio>
            <el-radio label='审核通过'></el-radio>
            <el-radio label='审核失败'></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model='articleform.region_id' placeholder="请选择">
            <el-option label="大前端" value="shanghai"></el-option>
            <el-option label="css" value="beijing"></el-option>
            <el-option label="html" value="beijing"></el-option>
            <el-option label="js" value="beijing"></el-option>
            <el-option label="干掉java" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='时间选择'>
          <el-date-picker
              v-model="articleform.value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style='margin-left: 68px'>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <div slot='header'>
        <span>共找到60028条符合条件的内容</span>
      </div>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="data"
            label="封面"
            width="180">
          <template slot-scope="scope">
            <img width='50' :src="scope.row.cover.images[0]">
          </template>
        </el-table-column>
        <el-table-column
            prop="title"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态">
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布日期"
        ></el-table-column>
        <el-table-column
            prop="address"
            label="操作"
        >
          <template>
            <el-button type="danger">删除</el-button>
            <el-button type="primary">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      articleform: {
        resource: '',
        region_id: '',
        value1: ''
      },
      // 存放文章列表信息；
      tableData: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    loadArticles () {
      /*
      * 发送axios请求来获取列表数据
      * 因为获取数据需要访问服务器上的资源，所以需要验证token的值 */
      // 获取token；
      const GetToken = window.localStorage.getItem('login_token')

      // 发送axios请求；
      this.$axios({
        // 设置请求头；除了登录接口不需要外，其他的都要设置请求头
        headers: {
          // 格式要求；
          Authorization: ` Bearer ${GetToken}`
        },
        // 设置请求类型；
        method: 'GET',
        // 设置请求地址；
        url: '/articles'
        // 设置请求参数: 无；
        // 接收响应结果
      }).then(res => {
        console.log(res)
        // 判断；
        if (res.status === 200) {
          // 把获取到的列表信息保存到数组中；
          this.tableData = res.data.data.results
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
