<template>
    <!-- 登录 -->
    <div class="login_container">
            <!-- form表单区域 -->
        <el-form class="login_form" :model="user" :rules="loginFormRules">
            <!-- logo区域 -->
            <div class="login_logo"></div>
            <!-- 手机号输入框 -->
            <el-form-item class="loginFormNumber" prop="mobile">
                <el-input placeholder="请输入手机号" v-model="user.mobile" ></el-input>
            </el-form-item>

            <!-- 验证码区域 -->
            <el-form-item class="loginFormCode" prop="code" >
                <el-input placeholder="请输入验证码" v-model="user.code" ref="loginFormRules.code"></el-input>
            </el-form-item>

            <!-- 单选按钮区域 -->
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>

            <!-- 验证区域 -->
            <el-form-item >
                <el-button class="login_form_button" type="primary"  @click="onLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less">
.login_container{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    // flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url(./login_bg.jpg) no-repeat;
    background-size: cover;
    .login_form{
        padding: 30px;
        min-width: 300px;
        background-color: #ffffff;
        .login_logo{
            margin-bottom: 20px;
            width: 300px;
            height: 47px;
            background: url(./logo_index.png) no-repeat;
        }
        .login_form_button{
            width: 100%;
        }
    }
}
</style>

<script>
import request from '@/utils/request.js'

export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度在 11 个数字', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输验证码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 4 到  6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onLogin: function () {
      const user = this.user

      request({
        method: 'POST',
        url: '/mp/v1_0/authorizations',
        // data用来设置请求体
        data: user
      }).then(res => {
        console.log(res)

        // 登陆成功消息提示
        this.$message({
          message: '登录成功',
          type: 'success'
        })
      }).catch(err => {
        console.log('登陆失败', err)

        // 登陆失败消息提示
        this.$message.error('登陆失败，你的手机号或验证码输入错误')
      })
    }
  }
}
</script>
