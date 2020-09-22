<template>
    <div class="article-container">

      <!-- 数据删选表单 -->
      <el-card class="filter-card">

        <div slot="header" class="clearfix">
           <!-- 面包屑路径导航 -->
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          </el-breadcrumb>
          <!--/ 面包屑路径导航 -->
        </div>

          <!-- 数据筛选表单 -->
          <el-form ref="form" :model="form" label-width="40px" size="mini">
            <el-form-item label="状态">
              <el-radio-group v-model="form.resource">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
                <el-radio :label="4">已删除</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 频道区域 -->
            <el-form-item label="频道">
              <el-select v-model="form.region" placeholder="请选择频道">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <!-- 频道区域 -->

            <!-- 日期 -->
            <el-form-item label="日期">
              <el-date-picker
                v-model="form.data1"
                type="datetimerange"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :default-time="['12:00:00']">
              </el-date-picker>
            </el-form-item>
            <!--/ 日期 -->

            <!-- 按钮 -->
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            <!--/ 按钮 -->
          </el-form>
      </el-card>
          <!--/ 数据筛选表单 -->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          根据筛选条件共查询到 46147 条结果：
        </div>
          <!-- 数据列表 -->
          <el-table
            :data="tableData"
            style="width: 100%"
            class="list-table"
            size="mini">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
          <!--/ 数据列表 -->

          <!-- 列表分页 -->
          <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount">
          </el-pagination>
          <!--/ 列表分页 -->
      </el-card>

        <!-- 模板数据 -->
        <!-- <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1"></el-tag>
        </template> -->
        <!-- 模板数据 -->

        <!-- </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
        </el-table-column>
      </el-table> -->
      <!--/ 数据列表 -->

    </div>
</template>

<script>
import { getArticles } from '@/api/article'

export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        data1: '',
        data2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],

      // 数据列表
      articles: [
      ],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },
        { status: 1, text: '待审核', type: '' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'warning' },
        { status: 4, text: '已删除', type: 'danger' }
      ],

      // 总数据大小
      totalCount: 1000,
      // 每页大小
      pageSize: 0,
      // 查询文章的状态，不传是全部
      status: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
        console.log(this.articles)
      })
    },

    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>

<style lang="less">
.filter-card{
  margin-bottom: 30px;
}
.list-table{
  margin-bottom: 20px;
}
</style>>
