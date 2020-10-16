<template>
  <div class="comment-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论信息</el-breadcrumb-item>
        </el-breadcrumb>
        <!--/ 面包屑 -->

        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="data" label="标题" width="180">
          </el-table-column>
          <el-table-column prop="name" label="总评论数" width="150">
          </el-table-column>
          <el-table-column prop="address" label="粉丝评论数"> </el-table-column>
          <el-table-column prop="status" label="状态"> </el-table-column>
          <el-table-column prop="address" label="操作"> </el-table-column>
        </el-table>
        <!--/ 表格 -->
      </div>

      <!-- 分页 -->
      <div class="block">
        <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
      </div>
      <!--/ 分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      articles: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () { },
  methods: {
    loadArticles () {
      getArticles({
        response_type: 'comment'
      }).then(res => {
        this.articles = res.data.data.results
        console.log(this.articles)
      })
    }
  }
}
</script>

<style>
</style>
