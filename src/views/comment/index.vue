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
        <el-table :data="articles" style="width: 100%">

          <el-table-column prop="title" label="标题" width="180">
          </el-table-column>

          <el-table-column
            prop="total_comment_count"
            label="总评论数"
            width="150"
          >
          </el-table-column>

          <el-table-column prop="fans_comment_count" label="粉丝评论数">
          </el-table-column>

          <el-table-column prop="comment_status" label="状态">
            <template slot-scope="scope">
              {{ scope.row.comment_status ? '正常' : '关闭' }}
            </template>
          </el-table-column>

          <el-table-column prop="address" label="操作">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.comment_status"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="onStatusChange(scope.row)"
              >
              </el-switch>
            </template>

          </el-table-column>
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
      })
    },
    onStatusChange () {
    }
  }
}
</script>

<style>
</style>
