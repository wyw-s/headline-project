<template>
  <div>
    <el-card>
      <div slot="header">
        <span>评论管理</span>
      </div>
      <el-table
          :data="articles"
          style="width: 100%">
        <el-table-column
            prop="title"
            label="标题"
            width="250">
        </el-table-column>
        <el-table-column
            prop="total_comment_count"
            label="总评论数"
        >
        </el-table-column>
        <el-table-column
            prop="fans_comment_count"
            label="粉丝评论数">
        </el-table-column>
        <el-table-column label="评论状态">
          <template
              slot-scope="scope"
          >
            <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="OnState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            label="操作"
        >
          <template>
            <el-button
                type="primary"
                size="mini"
            >修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'CommentIndex',
  data () {
    return {
      // 用于存放评论列表
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
    // 获取评论列表的方法
    loadArticles () {
      // 发送请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        this.articles = res.data.data.results
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
    }
  }
}
</script>

<style scoped>

</style>
