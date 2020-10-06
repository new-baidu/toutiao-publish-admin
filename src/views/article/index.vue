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
          <el-radio-group v-model="status">
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
          <!-- <el-option
              :label="全部"
              :value="null"
              ></el-option> -->
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channels"
              :key="index"
            ></el-option>
            <!-- <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <!-- 频道区域 -->

        <!-- 日期 -->
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <!--/ 日期 -->

        <!-- 按钮 -->
        <el-form-item>
          <!-- button按钮的click事件有个默认参数，当你没有指定参数的时候，他会默认传递一个没用的数据<page: {"isTrusted":true}》 -->
          <el-button type="primary" @click="loadArticles(1)" :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
        <!--/ 按钮 -->
      </el-form>
    </el-card>
    <!--/ 数据筛选表单 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="articles"
        style="width: 100%"
        class="list-table"
        size="mini"
        v-loading="loading"
      >
        <el-table-column prop="date" label="封面" width="180">
          <!-- 封面 -->
          <template slot-scope="scope">
            <img
              class="article-cover"
              v-if="scope.row.cover.images[0]"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img v-else class="article-cover" src="./no-cover.gif" alt="" />
          </template>
          <!--/ 封面 -->
        </el-table-column>
        <el-table-column prop="title" label="标题" width="180">
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在   template   上声明     slot-scope="scope" -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
            <!-- <el-tag v-if="scope.row.status === 0">草稿</el-tag>
                <el-tag type="warning" v-else-if="scope.row.status === 1">待审核</el-tag>
                <el-tag type="success" v-else-if="scope.row.status === 2">审核通过</el-tag>
                <el-tag type="danger" v-else-if="scope.row.status === 3">审核失败</el-tag>
                <el-tag type="info" v-else-if="scope.row.status === 4">已删除</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
              @click="$router.push('/publish?id=' + scope.row.id.toString())"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
              @click="onDeleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--/ 数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        @current-change="onCurrentChange"
        :page-size="pageSize"
        :disabled="loading"
        :current-page.sync="page"
      />
      <!--/ 列表分页 -->
    </el-card>
  </div>
</template>

<script>
import {
  getArticles,
  getArtiCleChannels,
  deleteArticle
} from '@/api/article'

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

      // 数据列表
      articles: [],
      articleStatus: [
        {
          status: 0,
          text: '草稿',
          type: 'info'
        },
        {
          status: 1,
          text: '待审核',
          type: ''
        },
        {
          status: 2,
          text: '审核通过',
          type: 'success'
        },
        {
          status: 3,
          text: '审核失败',
          type: 'warning'
        },
        {
          status: 4,
          text: '已删除',
          type: 'danger'
        }
      ],

      totalCount: 0, // 总数据大小
      pageSize: 10, // 每页大小
      status: null, // 查询文章的状态，不传是全部
      channels: [], // 频道列表
      channelId: null, // 查询频道数据列表
      rangeDate: null, // 日期
      loading: true, // 表单数据加载中 loading
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // 获取文章列表
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        bagin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then((res) => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false // 关闭加载数据中
      })
    },
    // 获取文章频道
    loadChannels () {
      getArtiCleChannels().then((res) => {
        this.channels = res.data.data.channels
      })
    },

    onCurrentChange (page) {
      this.loadArticles(page)
    },

    // 删除文档
    onDeleteArticle (articleId) {
      console.log(articleId.toString())
      this.$confirm('确认删除吗?', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 确认执行
          deleteArticle(articleId.toString()).then(res => {
            // 删除成功，更新当前页面文章数据列表
            this.loadArticles(this.page)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}

.article-cover {
  width: 60px;
  background-size: cover;
}
</style>>
