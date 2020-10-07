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
        <el-radio-group v-model="radio1" size="mini">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
      </div>
      <!--/ 按钮组 -->

      <!-- 素材列表 -->
      <el-row :gutter="20">
        <el-col :lg="4" :sm="6" :md="4" v-for="(img, index) in images" :key="index">
          <el-image
            style="height: 100px"
            :src="img.url"
            fit="cover"
          ></el-image
        ></el-col>
      </el-row>
      <!--/ 素材列表 -->
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
      radio2: '收藏',
      images: [] // 素材列表
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages()
  },
  mounted () { },
  methods: {
    loadImages () {
      getImage().then(res => {
        this.images = res.data.data.results
      })
    }
  }
}
</script>

<style lang="less">
</style>
