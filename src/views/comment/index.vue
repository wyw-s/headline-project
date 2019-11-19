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
                inactive-color="#ff4949">
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
      articles: []
    }
  },
  created () {
    this.loadArticles()
  },
  methods: {
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
    }
  }
}
</script>

<style scoped>

</style>
