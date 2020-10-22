<template>
  <div class="settings-content">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!--/ 面包屑 -->
      </div>

      <el-row>
        <el-col :span="12">
          <!-- 表单 -->
          <el-form
            :model="user"
            :rules="rules"
            ref="user"
            label-width="80px"
            class="demo-ruleForm"
            size="small"
          >
            <el-form-item label="编号"> {{ user.id }} </el-form-item>

            <el-form-item label="手机"> {{ user.mobile }} </el-form-item>

            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>

            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>

            <el-form-item label="邮箱" prop="emali">
              <el-input v-model="user.email"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即创建</el-button
              >
            </el-form-item>
          </el-form>

          <!--/ 表单 -->
        </el-col>

        <!-- 头像 -->
        <el-col :span="4" :offset="2">
          <label for="file">
            <el-avatar
              shape="square"
              :size="200"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
            <p>点击修改头像</p>
          </label>
          <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
          <input id="file" type="file" hidden ref="file"
          @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'settingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        id: null,
        mobile: '',
        name: '',
        intro: '',
        email: '',
        photo: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () { },
  methods: {
    submitForm () {
      console.log(123)
    },
    // 获取用户
    loadUser () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
      })
    },

    // 点击修改头像
    onFileChange () {
      console.log('file change')
    }
  }
}
</script>

<style>
</style>
