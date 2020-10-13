<template>
  <div class="image-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!--/ 面包屑 -->
      </div>

      <!-- 按钮组 -->
      <div>
        <el-radio-group v-model="radio1" size="mini" @change="onCollectChange">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          class="action-head"
          style="float: right; justify-content: space-between"
          type="primary"
          size="mini"
          @click="dialogVisible = true"
          >添加素材</el-button
        >
      </div>
      <!--/ 按钮组 -->

      <!-- 素材列表 -->
      <el-row :gutter="5">
        <el-col
          :xs="12"
          :lg="4"
          :sm="6"
          :md="6"
          v-for="(img, index) in images"
          :key="index"
          class="image-item"
        >
          <el-image style="height: 100px" :src="img.url" fit="cover"></el-image>

          <!-- 收藏和删除 -->
          <div class="image-action">
            <i class="el-icon-star-on"></i>
            <i class="el-icon-delete-solid"></i>
          </div>
          <!--/ 收藏和删除 -->

        </el-col>
      </el-row>
      <!--/ 素材列表 -->

      <!-- 分页 -->
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :total="50"
          @current-change="onPageChange"
          :page-size="pageSize"
          :current-page-sync="page"
        >
        </el-pagination>
      </div>
      <!--/ 分页 -->

      <!-- 添加素材 -->
      <el-dialog title="上传素材" :visible.sync="dialogVisible" width="60%">
        <el-upload
          class="upload-demo"
          drag
          action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
          multiple
          :headers="uploadHeaders"
          name="image"
          :on-success="onUploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-dialog>
      <!--/ 添加素材 -->
    </el-card>
  </div>
</template>

<script>
import { getImage } from '@/api/image'

export default {
  name: 'ImageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      radio1: '全部',
      images: [], // 素材列表
      dialogVisible: false, // 弹出添加素材框
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      page: 1, // 当前页数
      pageSize: 12, // 当前页面显示图片个数
      totalCount: 0, // 当前图片总数
      collect: false // 默认查询全部素材列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1, false)
  },
  mounted () { },
  methods: {
    loadImages (page = 1) {
      // 重置高亮页码， 防止页面页码不对应
      getImage({
        collect: this.collect,
        page,
        per_page: this.pageSize
      }).then(res => {
        this.images = res.data.data.results
        this.totalCount = res.data.data.total_count
      })
    },

    onCollectChange (value) {
      this.loadImages(1, value)
    },

    onUploadSuccess () {
      this.dialogVisible = false

      // 更新素材列表
      this.loadImages(this.page)

      this.$message({
        type: 'success',
        message: '上传成功'
      })
    },

    onPageChange (page) {
      this.loadImages(page)
    }
  }
}
</script>

<style lang="less">
.v-modal {
  display: none;
}
.image-action {
  position: absolute;
  bottom: 4px;
  right: 5px;
  left: 5px;
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  display: flex;
  font-size: 25px;
  justify-content: space-around;
  align-items: center;
  color: #fff;
}
.image-item{
  position: relative;
}
</style>
