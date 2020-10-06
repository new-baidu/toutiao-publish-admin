<template>
  <div class="publish-container">
    <el-card class="box-card">
      <!-- 面包屑路径导航 -->
      <div class="clearfix" slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--/ 面包屑路径导航 -->

      <!-- 表单 -->
      <el-form :model="article" label-width="40px" ref="form">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>

        <el-form-item label="内容">
          <!-- <el-input type="textarea" v-model="article.content"></el-input> -->
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            lang="zh"
            height="300"
            placeholder="请输入文章内容"
          ></el-tiptap>
        </el-form-item>

        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道区域">
          <el-select placeholder="请选择频道" v-model="article.channel_id">
            <el-option
              :label="channels.name"
              :value="channels.id"
              v-for="(channels, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="onPublish(false)" type="primary">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
      <!--/ 表单 -->
    </el-card>
  </div>
</template>

<script>
import {
  getArtiCleChannels,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  Fullscreen,
  TodoItem,
  TodoList,
  TextColor,
  Preview,
  CodeBlock,
  FontSize
} from 'element-tiptap'
import { uploadImage } from '@/api/image'

// tiptap编辑样式
import 'element-tiptap/lib/index.css'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      channels: [], // 文章频道列表
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: { // 文章封面  -1:自动  0:无图  1:一张  2:三张
          type: 0,
          images: [] // 封面图片地址
        },
        channel_id: null // 频道id
      },
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Underline({ bubble: true, menubar: false }), // 下划线
        new TextColor(), // 字体颜色
        new FontSize(), // 字体大小
        new Italic(), // 斜体
        new Strike(), // 删除线
        new ListItem(),
        new TodoItem(),
        new TodoList(), // 任务列表
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new Image({
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
              // console.log(res)
            })
          }
        }), // 图片
        new Fullscreen(), // 全屏
        new CodeBlock(), // 预览
        new Preview() // 代码块
      ]
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()

    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () { },
  methods: {
    onSubmit () {
      console.log('submit!')
    },

    // 获取文章频道
    loadChannels () {
      getArtiCleChannels().then(({ data }) => {
        this.channels = data.data.channels
      })
    },

    // 添加文章
    onPublish (draft = false) {
      // 找到数据接口
      // 封装请求方法
      // 请求提交表单
      const articleId = this.$route.query.id
      if (articleId) {
        updateArticle(articleId, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        })
      } else {
        addArticle(this.article, draft).then(res => {
          // 处理相应结果
          this.$message({
            message: '发布成功',
            type: 'success'
          })
        })
      }
    },

    // 修改文章
    loadArticle () {
      console.log('loadArticle')
      getArticle(this.$route.query.id).then(res => {
        // 模板编辑展示
        this.article = res.data.data
      })
    }
  }
}

</script>

<style lang="less"></style>
