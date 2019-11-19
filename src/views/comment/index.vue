<template>
  <div>
    <el-card>
      <div slot="header">
        <span>评论管理</span>
      </div>
      <el-table
          :data="articles"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          element-loading-spinner="el-icon-loading"
          element-loading-text="拼命加载中"
          style="width: 100%"
          v-loading="loading">
        <el-table-column
            label="标题"
            prop="title"
            width="250">
        </el-table-column>
        <el-table-column
            label="总评论数"
            prop="total_comment_count"
        >
        </el-table-column>
        <el-table-column
            label="粉丝评论数"
            prop="fans_comment_count">
        </el-table-column>
        <el-table-column label="评论状态">
          <template
              slot-scope="scope"
          >
            <el-switch
                @change="OnState(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-model="scope.row.comment_status"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="$router.push('/comment/'+scope.row.id)"
            >修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px;display: flex;justify-content: center">
        <el-pagination
            :disabled="forbidden"
            :total="page"
            @current-change="OnChange"
            background
            layout="prev, pager, next"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      // 用于存放评论列表
      articles: [],
      page: null,
      forbidden: true,
      loading: true
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 获取评论列表的方法
    loadArticles (page = 1) {
      this.forbidden = true
      this.loading = true
      // 发送请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        url: '/articles',
        params: {
          page,
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
        this.page = res.data.data.total_count
        this.forbidden = false
        this.loading = false
        console.log('获取成功')
      }).catch(() => {
        console.log('获取失败')
      })
    },
    // 组件提供的change事件，状态改变时的回调函数
    OnState (article) {
      console.log(45)
      // 发送axios请求；
      this.$axios({
        // 设置请求方式；
        method: 'PUT',
        // 设置请求地址；
        url: '/comments/status',
        // 设置query参数；这里的id 需要手动转化一下，因为id是个对象
        params: { article_id: article.id.toString() },
        // 设置body参数；
        data: { allow_comment: article.comment_status }
      }).then(() => {
        this.$message({
          type: 'success',
          message: `${article.comment_status ? '启用' : '关闭'}成功`
        })
        // 修改成功则从新加载页面；
        this.loadArticles()
      }).catch(() => {
        this.$message.error('操作失败')
      })
    },
    // 分页组件的触发事件；
    OnChange (page) {
      /*
      * 获取当前点击的页码并作为参数传入
      */
      this.loadArticles(page)
    }
  }
}
</script>

<style scoped>
</style>
