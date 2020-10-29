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
                >立即修改</el-button
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
          <input
            id="file"
            type="file"
            hidden
            ref="file"
            @change="onFileChange"
          />
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          alt=""
          ref="preview-image"
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdataPhoto" > 确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserProfile,
  updateUserPhoto
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

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

      }, // 用户资料
      dialogVisible: false, // 控制上传图片裁切预览得显示状态
      previewImage: '', // 预览图片
      cropper: null,
      locading: false,
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
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
        this.user = res.data.data
      })
    },

    // 点击修改头像
    onFileChange () {
      // 预览图片
      const file = this.$refs.file
      const blobData = window.URL.createObjectURL(file.files[0])
      this.previewImage = blobData
      // 展示弹出层，预览显示用户选择的图片
      this.dialogVisible = true
      // 解决选择相同文件不触发 change 事件
      this.$refs.file.value = ''
    },

    // handleClose (done) {
    //   this.$confirm('确认关闭？')
    //     .then(_ => {
    //       done()
    //     })
    //     .catch(_ => { })
    // }

    // 点击开始裁切图片的动画
    onDialogOpened () {
      const image = this.$refs['preview-image']
      // 图片裁切器
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxMovable: false
        // crop (event) {
        // console.log(event.detail.x)
        // console.log(event.detail.y)
        // console.log(event.detail.width)
        // console.log(event.detail.height)
        // console.log(event.detail.rotate)
        // console.log(event.detail.scaleX)
        // console.log(event.detail.scaleY)
        // }
      })
    },
    // 点击关闭裁切图片时的动画
    onDialogClosed () {
      // 对话框关闭销毁裁截器
      this.cropper.destroy()
    },
    onUpdataPhoto () {
      // 获取裁切的图片的对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        // 封装请求
        // 请求更新用户头像请求提交fd
        updateUserPhoto(fd).then(res => {
          console.log(res)
          // 关闭对话框
          this.dialogVisible = false
          // 请求更新用户头像
          // this.loadUser()
          // 更新视图展示
          this.user.photo = window.URL.createObjectURL(file)
          // 把服务端返回的图片进行展示有点慢
          // this.user.photo = res.data.data.photo
        })
      })
    }
  }
}

</script>

<style lang="less">
.preview-image-wrap {
  .preview-image {
    display: block;
    max-width: 100%;
    height: 200px;
  }
}
</style>
