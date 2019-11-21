<template>
  <div>
    <el-card>
      <div slot="header">
        <span>图片管理</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮
        </el-button>
      </div>
      <div style='margin-bottom: 20px'>
        <!--
        由官方提供的change事件，绑定值变化时触发的事件
        回调函数：有一个默认值为选中的 Radio label 值
        -->
        <el-radio-group
            v-model="radio1"
            @change="onTrigger"
        >
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <!--相关属性根据官方文档查询-->
        <el-upload
            style="float: right"
            :show-file-list='false'
            class="upload-demo"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="UploadHeaders"
            :on-success="onUploadSuccess"
            name="image"
            multiple
            :limit="3"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <el-row :gutter="10">
        <!--
        每一列并不是通栏到底的，是有内容的高度决定的；
        -->
        <el-col
            :xs="24"
            :sm="12"
            :md="6"
            class='col-item'
            v-for="item in images"
            :key="item.id"
        >
            <el-card :body-style="{ padding: '0px'}">
              <img
                  :src="item.url"
                  class="image"
                  height=200
              >
              <div style="padding: 14px;" class="action">
                  <i
                      :class="{
                      'el-icon-star-on': item.is_collected,
                      'el-icon-star-off': !item.is_collected
                      }"
                      @click="onCollect(item)"
                  ></i>
                  <i class="el-icon-delete-solid"></i>
              </div>
            </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>
<script>
// 设置请求头；
const token = window.localStorage.getItem('login_token')
export default {
  name: 'media',
  data () {
    return {
      images: [], // 存放响应的结果信息
      radio1: '全部', // 值为选中时label的值
      UploadHeaders: {
        Authorization: `Bearer ${token}`
      }
    }
  },
  created () {
    this.getimages()
  },
  methods: {
    // 传入默认参数，让一开始加载所有的图片，
    getimages (iscollect = false) {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址；
        url: '/user/images',
        params: {
          collect: iscollect // 是否收藏图片
        }
      }).then(res => {
        this.images = res.data.data.results
        console.log('获取成功')
      }).catch(() => {
        console.log('获取失败')
      })
    },
    /**
     * 该回调函数会接收一个默认值，为选中的lable的值；
     * 把该值作为实参传入并判断，trigger==> 触发
     */
    onTrigger (trigger) {
      // 括号内会产生一个布尔值，替换掉该函数的默认值
      this.getimages(trigger !== '全部')
    },
    onCollect (Collect) {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'PUT',
        // 设置请求地址；
        url: `user/images/${Collect.id}`,
        // 设置请求参数；
        data: {
          collect: !Collect.is_collected
        }
      }).then(() => {
        this.$message({
          type: 'success',
          message: '操作成功'
        })
        // console.log(res)
        // 更新图标展示；
        Collect.is_collected = !Collect.is_collected
      }).catch(() => {
        // console.log(err)
        this.$message.error('操作失败')
      })
    },
    /**
     * 文件上传成功时执行的回调
     */
    onUploadSuccess () {
      // 上传成功后从新加载数据信息
      /**
       * 新上传的图片应该处于非收藏状态，如果此时在全部，则点击上传，应该更新全部
       * 如果在收藏则更新收藏；
       */
      this.getimages(this.radio1 !== '全部')
      this.$message({
        type: 'success',
        message: '上传成功'
      })
    }
  }
}
</script>

<style lang=less scoped>
  .col-item {
    margin-bottom: 20px;
    .action {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 30px;
    }
  }

</style>
