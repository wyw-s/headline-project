<template>
  <div>
    <el-card>
      <div slot="header">
        <span>评论详情页</span>
      </div>
      <el-table
          :data="comments"
          style="width: 100%">
        <el-table-column
            label="头像"
            width="180">
          <template slot-scope="scope">
            <img :src="scope.row.aut_photo">
          </template>
        </el-table-column>
        <el-table-column
            prop="aut_name"
            label="评论内容"
            width="180">
        </el-table-column>
        <el-table-column
            label="点赞">
          <template slot-scope="scope">
           {{scope.row.is_liking == 1 ? '已点赞' : '未赞'}}
          </template>
        </el-table-column>
        <el-table-column
            prop="like_count"
            label="点赞数量">
        </el-table-column>
        <el-table-column
            label="评论日期">
          <template slot-scope="scope">
            {{ scope.row.pubdate | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column
            label="是否推荐">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.is_top"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="Ontop(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
            prop="reply_count"
            label="回复数量">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'comment-detail',
  data () {
    return {
      // 存放评论数据信息
      comments: []
    }
  },
  created () {
    // 页面加载显示评论信息
    this.loadComments()
  },
  methods: {
    loadComments () {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址；
        url: '/comments',
        // 设置请求参数；
        params: {
          type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.$route.params.articleId // 文章Id
        },
        data: {
          allow_comment: true // 是否允许评论
        }
      }).then(res => {
        /*
        * const comments = res.data.data.results
          comments.forEach(function (item) {
            item.pubdate = moment(item.pubdate).format('YYYY-MM-DD')
          })
          this.comments = comments
          不推荐这样做，因为把原始数据改动了，这样就获取不到原始数据了
        */
        this.comments = res.data.data.results
      }).catch(() => {
        console.log('响应错误')
      })
    },
    /*
    * 是否推荐；
    * 此接口有问题；不必深究
    * */
    Ontop (comment) {
      this.$axios({
        // 设置请求方式；
        method: 'PUT',
        // 设置请求地址；
        url: `comments/${comment.com_id}/sticky`,
        data: {
          sticky: comment.is_top
        }
      }).then(res => {
        this.$message({
          type: 'success',
          message: `${comment.is_top ? '推荐成功' : '已取消推荐'}`
        })
        console.log(res)
      }).catch(err => {
        this.$message.error('操作失败')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
