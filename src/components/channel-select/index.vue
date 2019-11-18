<template>
  <el-select
      placeholder="请选择频道"
      v-model='value'
      :value='value'
      @input="onInput"
  >
    <!--option 会把下拉列表的value值，同步到region_id数据中-->
    <!--默认选中所有频道-->
    <el-option
        :key="item.id"
        :label="item.name"
        :value="item.id"
        v-for="item in channels"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'channel-select',
  data () {
    return {
      value: {
        type: [String, Number],
        require: true
      },
      /**
       * 存放获取到的频道列表信息;
       * 把数据循环遍历渲染到页面上
       */
      channels: []
    }
  },
  created () {
    this.loadChannels()
  },
  methods: {
    // 用于获取频道列表
    loadChannels () {
      // 发送axios请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址；
        url: '/channels'
      }).then(res => {
        console.log(res)
        // 判断成立则把获取到的数据保存到数组中；
        this.channels = res.data.data.channels
      }).catch(() => {
        console.log('获取数据失败')
      })
    },
    onInput (Data) {
      this.$emit('input', Data)
    }
  }
}
</script>

<style scoped>

</style>
