<template>
  <el-card class="box-card">
    <div slot="header">
      <span>发表文章</span>
    </div>
    <el-form label-width="80px" ref="form">
      <el-form-item label="标题">
        <el-input placeholder='文章名称' v-model="article.title"></el-input>
      </el-form-item>
      <el-form-item label="内容"  style="height: 300px">
        <quill-editor
            :options="editorOption"
            ref="myQuillEditor"
            v-model="article.content"
            style="height: 200px"
        >
        </quill-editor>
      </el-form-item>
      <el-form-item label="封面">
        <el-radio-group v-model="article.cover.type">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
        <!--
        根据选择的状态进行遍历
        因为-1不能遍历，所以需要加判断
        -->
        <template v-if="article.cover.type !== -1">
          <el-row :gutter="20">
            <el-col :span="5" v-for="item in article.cover.type" :key="item">
              <upload-image v-model="article.cover.images[item-1]"></upload-image>
            </el-col>
          </el-row>
        </template>
      </el-form-item>
      <el-form-item label="频道">
        <!--使用组件-->
        <channel-select v-model="article.channel_id"></channel-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit(false)" type="primary">发表</el-button>
        <el-button @click="onSubmit(true)">存入草稿</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
// 引入上传组件；
import UploadImage from './components/upload-image.vue'
import ChannelSelect from '../../components/channel-select/index'
// 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
// 引入富文本编辑器
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'Publish',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    quillEditor,
    ChannelSelect,
    UploadImage
  },
  data () {
    return {
      article: {
        title: '', // 文本内容
        content: '', // 文章名称
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: []
        },
        channel_id: null // 文章id
      },
      editorOption: {}, // 富文本编辑器的配置选项对象
      // 存放频道，循环遍历到页面上；
      channels: []
    }
  },
  created () {
    // 页面加载，就需要把频道信息显示出来
    // this.loadChannels()
    /*
    * 因为编辑和发表共用一个组件，而只有编辑的时候会携带id值，所以用
    * id做判断；
    * */
    if (this.$route.params.articleId) {
      // 判断成功则调用方法
      this.loadArticles()
    }
  },
  methods: {
    // 用于获取同步编辑的表单内容
    loadArticles () {
      this.$axios({
        method: 'GET',
        url: `/articles/${this.$route.params.articleId}`
      }).then(res => {
        this.article = res.data.data
      })
    },
    onSubmit (draft) {
      /*
      * 由于编辑是共用的一个组件，所以当我们点击发表的时候需要判断
      * 当前的状态是新发布的还是编辑后的发布
      * 根据不求对 请求执行不同的逻辑
      */
      if (this.$route.params.articleId) {
        // 请求编辑文章
        this.updateArticle(draft)
      } else {
        // 请求添加文章；
        this.addArticle(draft)
      }

      // 发送axios请求；
      // this.$axios({
      //   // 设置请求方式；
      //   method: 'POST',
      //   // 设置请求地址；
      //   url: '/articles',
      //   // 设置请求头并携带 token 数据；
      //   // headers: {
      //   //   Authorization: `Bearer ${window.localStorage.getItem('login_token')}`
      //   // },
      //   // 设置请求参数;
      //   params: {
      //     draft
      //   },
      //   data: this.article
      // }).then(() => {
      //   console.log('发表成功')
      // }).catch(() => {
      //   console.log('保存失败')
      // })
    },
    // 封装添加文章的方法，当判断成立不成立时调用
    addArticle (draft) {
      this.$axios({
        method: 'POST',
        url: '/articles',
        params: {
          draft
        },
        data: this.article
      }).then(() => {
        // 发表成功跳转页面；
        this.$router.push('/article')
        this.$message({
          type: 'success',
          message: '发表成功'
        })
      }).catch(() => {
        this.$message.error('发表失败')
      })
    },
    // 封装编辑文章的方法，当判断成立成立时调用
    updateArticle (draft) {
      this.$axios({
        // 由接口文档定义
        method: 'PUT',
        // 动态路由地址  注意url的大小写！！！！！
        url: `/articles/${this.$route.params.articleId}`,
        params: {
          // 值为 false 或 true
          draft
        },
        data: this.article
      }).then(() => {
        // 响应成立则提示
        this.$message({
          type: 'success',
          message: '修改成功'
        })
      }).catch(() => {
        this.$message.error('修改失败')
      })
    }
    /**
     * 用于获取频道列表
     * 已被封装成单个组件使用
     */
  }
}
</script>

<style scoped>

</style>
