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

      <!-- 添加素材 -->
      <el-dialog title="上传素材" :visible.sync="dialogVisible" width="40%">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </el-dialog>
      <!--/ 添加素材 -->

      <!-- 素材列表 -->
      <el-row :gutter="5">
        <el-col
          :xs="12"
          :lg="4"
          :sm="6"
          :md="6"
          v-for="(img, index) in images"
          :key="index"
        >
          <el-image style="height: 100px" :src="img.url" fit="cover"></el-image>
        </el-col>
      </el-row>
      <!--/ 素材列表 -->

      <!-- 分页 -->
      <div class="block">
        <el-pagination layout="prev, pager, next"> </el-pagination>
      </div>
      <!--/ 分页 -->
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
    return {
      radio1: '全部',
      images: [], // 素材列表
      dialogVisible: false // 弹出添加素材框
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(false)
  },
  mounted () { },
  methods: {
    loadImages (collect) {
      getImage({
        collect
      }).then(res => {
        this.images = res.data.data.results
      })
    },

    onCollectChange (value) {
      this.loadImages(value)
    }
  }
}
</script>

<style lang="less">
.v-modal{
  display: none;
}
</style>
