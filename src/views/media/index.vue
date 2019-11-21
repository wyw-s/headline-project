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
export default {
  name: 'media',
  data () {
    return {
      images: [], // 存放响应的结果信息
      radio1: '全部' // 值为选中时label的值
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
