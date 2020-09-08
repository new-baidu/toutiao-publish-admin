<template>
    <!-- 登录 -->
    <div class="login_container">
            <!-- form表单区域 -->
        <el-form class="login_form" :model="user">
            <!-- logo区域 -->
            <div class="login_logo"></div>
            <!-- 手机号输入框 -->
            <el-form-item class="loginFormNumber" prop="number">
                <el-input placeholder="请输入手机号" v-model="user.number"></el-input>
            </el-form-item>

            <!-- 验证码区域 -->
            <el-form-item class="loginFormCode" prop="code">
                <el-input placeholder="请输入验证码" v-model="user.code"></el-input>
            </el-form-item>

            <!-- 单选按钮区域 -->
            <el-form-item>
                <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>

            <!-- 验证区域 -->
            <el-form-item >
                <el-button class="login_form_button" type="primary" >登录</el-button>
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
            margin-bottom: 10px;
            width: 300px;
            height: 57px;
            background: url(./logo_index.png) no-repeat;
        }
        .login_form_button{
            width: 100%;
        }
    }
}
</style>

<script>
export default {
  data () {
    return {
      user: {
        number: '',
        code: ''
      },
      checked: false,
      loginFormRules: {
        number: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输验证码', trigger: 'blur' },
          { min: 4, max: 6, message: '长度在 9 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
