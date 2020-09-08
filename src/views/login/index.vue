<template>
    <!-- 表单区域 -->
    <div class="form">
            <!-- login区域 -->
        <div class="form_login">
            <img src="./logo_index.png" alt="">
        </div>
            <!-- 输入手机号区域 -->
        <el-form class="form_number">
            <el-form-item prop="number">
                <el-input placeholder="请输入手机号"></el-input>
            </el-form-item>

        <!-- 验证码区域 -->
            <el-form-item  prop="code">
                <el-input placeholder="请输入验证码"></el-input>
            </el-form-item>

            <!-- 验证区域 -->
            <el-form-item class="form_button">
                <el-button type="primary" >立即创建</el-button>
                <el-button >重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style lang="less">
body{
    width: 100%;
    height: 100%;
    background:url(../../images/login_bg.jpg);
    background-size: cover;
}
.form{
    width: 450px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    .form_login{
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        height: 50px;
        text-align: center;
        img{
            height: 100%;
        }
    }
    .form_number{
        position: absolute;
        bottom:0;
        width: 100%;
        padding: 0  20px;
        box-sizing: border-box;
    }
    .form_botton{
        display: flex;
        justify-content: flex-end;
    }
}
</style>

<script>
export default {
  data () {
    return {
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
