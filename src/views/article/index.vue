<template>
  <div>
    <el-card>
      <div slot='header'>
        <span>全部图文</span>
      </div>
      <el-form :model='filterForm'>
        <el-form-item label='文章状态:'>
          <el-radio-group v-model='filterForm.resource'>
            <el-radio :label='null'>全部</el-radio>
            <el-radio label='0'>草稿</el-radio>
            <el-radio label='1'>待审核</el-radio>
            <el-radio label='2'>审核通过</el-radio>
            <el-radio label='3'>审核失败</el-radio>
            <el-radio label='4'>已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model='filterForm.region_id' placeholder="请选择频道">
            <!--option 会把下拉列表的value值，同步到region_id数据中-->
            <!--默认选中所有频道-->
            <el-option label="所有频道" :value='null'></el-option>
            <el-option
                :label="item.name"
                :value="item.id"
                v-for="item in channels"
                :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='时间选择'>
          <!--使用format指定输入框的格式；使用value-format指定绑定值的格式。-->
          <el-date-picker
              v-model="filterForm.value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style='margin-left: 68px'>
          <el-button
              type="primary"
              @click="onloadArticles"
          >查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <div slot='header'>
        <!--插值表达式-->
        <span>共找到{{total_count}}条符合条件的内容</span>
      </div>
      <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
      >
        <el-table-column
            prop="data"
            label="封面"
            width="180">
          <!--自定义列表数据-->
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
          <!--
            slot-scope="scope" 可以自定义表格
            scope：代表每一项
            scope.row.status==>代表类型：0、1、2、3、4
          -->
          <template slot-scope="scope">
            <el-tag
                :type='articleStatus[scope.row.status].type'>
              <!--要显示的文本内容-->
              {{ articleStatus[scope.row.status].label }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="pubdate"
            label="发布日期"
        ></el-table-column>
        <el-table-column
            prop="address"
            label="操作"
        >
          <!--自定义列表数据-->
          <template>
            <el-button type="danger" size='mini'>删除</el-button>
            <el-button type="primary" size='mini'>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination
          background
          layout="prev, pager, next"
          :total="total_count"
          style='margin-left:250px'
          @current-change='onPageChange'
          :disabled="loading"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  // 不要使用保留字或保留的html组件做为组件的id
  name: 'Article',
  data () {
    return {
      filterForm: {
        // axios 不会发送值为 null、undefined 类型的参数。！！！
        resource: null,
        // 当此数据为null时，axios则会默认获取全部类型
        region_id: null,
        // 存放日期
        value1: ''
      },
      // 记录文章总数量,初始化的数据要设为0，不然上面的数据在计算分页时会报错；
      total_count: 0,
      // 存放文章列表信息；
      tableData: [],
      // loading 加载
      loading: true,
      /**
       * 存放获取到的频道列表信息;
       * 把数据循环遍历渲染到页面上
       */
      channels: [],
      // 状态信息
      articleStatus: [
        {
          type: '',
          label: '草稿'
        },
        {
          type: 'warning',
          label: '待审核'
        },
        {
          type: 'success',
          label: '审核通过'
        },
        {
          type: 'danger',
          label: '审核失败'
        },
        {
          type: 'info',
          label: '已删除'
        }
      ]
    }
  },
  created () {
    // 页面加载显示列表信息；
    this.loadArticles()
    // 页面加载就显示频道信息；
    this.loadChannels()
  },
  methods: {
    // 数据分页；page=1 为默认值，es6的语法
    loadArticles (page = 1) {
      // 页面一加载就开启
      this.loading = true
      /**
       * 发送axios请求来获取列表数据
       * 因为获取数据需要访问服务器上的资源，所以需要验证token的值
       */
      // 获取token；
      const GetToken = window.localStorage.getItem('login_token')

      // 发送axios请求；
      this.$axios({
        // 设置请求头；除了登录接口不需要外，其他的都要设置请求头
        headers: {
          // 格式要求；
          Authorization: `Bearer ${GetToken}`
        },
        // 设置请求类型；
        method: 'GET',
        // 设置请求地址；
        url: '/articles',
        // 设置请求参数: 无；
        params: {
          page,
          // 查询指定状态的数据，若值为null 那么axios会忽略此参数；
          // 根据状态文章的状态来筛选数据
          status: this.filterForm.resource,
          // 根据文章的类型来筛选数据
          channel_id: this.filterForm.region_id,
          /*
          * 初始加载页面时，值为空字符串，获取到的值为undefined,axios 对undefined 会忽略，
          * 但是日期组件自带的有清空日期的功能，
          * 当用户手动清除日期的时候，数据被重置为 null 了，
          * 如果数据为  null，那你 `null[下标]` 就报错了，
          * 所以这里要手动校验一下。此时 valuel的值为null ，所以获取索引会报错
          */
          begin_pubdate: this.filterForm.value1 ? this.filterForm.value1[0] : null,
          end_pubdate: this.filterForm.value1 ? this.filterForm.value1[1] : null
        }
        // 接收响应结果
      }).then(res => {
        // console.log(res)
        // 判断；
        if (res.status === 200) {
          // 响应接收完成则关闭
          this.loading = false
          // 把获取到的列表信息保存到数组中；
          this.tableData = res.data.data.results
          // 把获取到的总文章数从新赋值
          this.total_count = res.data.data.total_count
        }
      }).catch(() => {
        console.log('获取数据失败')
      }).finally(() => {
        // 无论成功还是失败都会执行
        this.loading = false
      })
    },
    // 组件提供的点击事件，回调函数的结果为当前页
    onPageChange (page) {
      // 把得到的当前页的数据作为实参传入，加载函数；进而刷新页面
      this.loadArticles(page)
    },
    // 注册点击查询事件；
    onloadArticles () {
      // 点击查询调用查询的方法
      this.loadArticles()
    },
    // 用于获取频道列表
    loadChannels () {
      // 发送axios请求；
      this.$axios({
        // 设置请求方式；
        method: 'GET',
        // 设置请求地址；
        url: '/channels'
      }).then(res => {
        // console.log(res)
        // 判断成立则把获取到的数据保存到数组中；
        this.channels = res.data.data.channels
      }).catch(() => {
        console.log('获取数据失败')
      })
    }
  }
}
</script>

<style scoped>

</style>
