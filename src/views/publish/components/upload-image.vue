<template>
  <div>
    <div class="upload-image">
      <img
          class="avatar"
          v-if="value"
          width="100%"
          :src="value" alt="">
      <i
          v-else
          class="el-icon-plus avatar-uploader-icon"
          @click="onUploadShow"
      ></i>
    </div>
    <!--
      使用对话框组件
    -->
    <el-dialog
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">
          <div style='margin-bottom: 20px'>
            <el-radio-group
                v-model="radio1"
                @change="getimages"
                style="margin-bottom: 14px;"
            >
                <el-radio-button label="all">全部</el-radio-button>
                <el-radio-button label="collect">收藏</el-radio-button>
            </el-radio-group>
            <el-row :gutter="10">
              <!--
              选择图片的时候获取当前点击的图片的索引，
              并存储起来，
              -->
              <el-col
                  :xs="24"
                  :sm="12"
                  :md="6"
                  :class="{
                  'col-item':true,
                  'img-item':index == activeindex
                  }"
                  v-for="(item,index) in images"
                  :key="item.id"
                  @click.native="activeindex = index"
              >
                <el-card :body-style="{ padding: '0px'}">
                  <img
                      :src="item.url"
                      class="image"
                      height=150
                  >
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <!--组件的属性name=>相当于传参的参数名-->
          <el-upload
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :headers="UploadHeaders"
              name="image"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    <el-button
        @click="centerDialogVisible = false"
    >取 消</el-button>
    <el-button
        type="primary"
        @click="OnConfirm"
    >确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'upload-image',
  props: {
    value: {
      type: String
    }
  },
  data () {
    return {
      activeName: 'first',
      centerDialogVisible: false,
      radio1: 'all',
      images: {},
      activeindex: null,
      dialogImageUrl: '',
      dialogVisible: false,
      // 设置请求头；
      UploadHeaders: {
        Authorization: `Bearer ${window.localStorage.getItem('login_token')}`
      }
      // previewImage: '' // 存放选中图片的url地址
    }
  },
  methods: {
    /**
     * 函数的默认参数，只能在函数被调用的时候使用，
     * 当函数的触发是由点击行为发生的那么 es6 的默认传参形式不能使用
     */
    onUploadShow () {
      this.getimages()
      this.centerDialogVisible = true
    },
    // 传入默认参数，让一开始加载所有的图片，
    getimages () {
      // 开始请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址；
        url: '/user/images',
        params: {
          collect: this.radio1 === 'collect'// 是否收藏图片
        }
      }).then(res => {
        this.images = res.data.data.results
        console.log('获取成功')
      }).catch(() => {
        console.log('获取失败')
      })
    },
    OnConfirm () {
      /**
       * 因为有素材区和上传图片区，所以需要加以判断
       */
      if (this.activeName === 'first') {
        // 判断，因为用户可能不选择
        if (this.images[this.activeindex]) {
          // 根据获取到的索引，来找到选中图片的url；
          this.$emit('input', this.images[this.activeindex].url)
        }
        this.centerDialogVisible = false
      } else {
        if (this.dialogImageUrl) {
          this.$emit('input', this.dialogImageUrl)
        }
        this.centerDialogVisible = false
      }
    },
    /**
     * 点击文件列表中已上传的文件时的钩子
     * 此钩子的默认参数会接受返回值，包含 响应结果 和组件自己的 url地址
     */
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      // this.dialogImageUrl = file.response.data.url
    }
  }
}
</script>

<style lang=less scoped>
  .upload-image {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 173px;
      height: 173px;
      line-height: 173px;
      text-align: center;
    }
    .avatar {
      width: 173px;
      height: 173px;
      display: block;
    }
  }
  .col-item {
    margin-bottom: 20px;
    .action {
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 30px;
    }
  }
  .img-item {
    border: 2px solid #000;
  }
</style>
