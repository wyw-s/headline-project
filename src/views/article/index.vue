<template>
  <div>
    <el-card class="article">
      <div slot='header'>
        <span>全部图文</span>
      </div>
      <el-form :model='articleform'>
        <el-form-item label='文章状态:'>
          <el-radio-group v-model='articleform.resource'>
            <el-radio label='全部'></el-radio>
            <el-radio label='草稿'></el-radio>
            <el-radio label='待审核'></el-radio>
            <el-radio label='审核通过'></el-radio>
            <el-radio label='审核失败'></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道列表">
          <el-select v-model='articleform.region_id' placeholder="请选择">
            <el-option label="大前端" value="shanghai"></el-option>
            <el-option label="css" value="beijing"></el-option>
            <el-option label="html" value="beijing"></el-option>
            <el-option label="js" value="beijing"></el-option>
            <el-option label="干掉java" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label='时间选择'>
          <el-date-picker
              v-model="articleform.value1"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item style='margin-left: 68px'>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 10px">
      <div slot='header'>
        <span>共找到60028条符合条件的内容</span>
      </div>
      <el-table
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="date"
            label="封面"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="标题"
            width="180">
        </el-table-column>
        <el-table-column
            prop="address"
            label="状态">
        </el-table-column>
        <el-table-column
            prop="address"
            label="发布日期"
        ></el-table-column>
        <el-table-column
            prop="address"
            label="操作"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      articleform: {
        resource: '',
        region_id: '',
        value1: ''
      },
      tableData: [
        {
          date: '2019-05-02',
          name: '王小虎',
          address: '北京市顺义区金沙路99号'
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          address: '北京市顺义区金沙路99号'
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          address: '北京市顺义区金沙路99号'
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          address: '北京市顺义区金沙路99号'
        },
        {
          date: '2019-05-02',
          name: '王小虎',
          address: '北京市顺义区金沙路99号'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
