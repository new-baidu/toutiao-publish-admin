<template>
    <el-container class="layout-container">
        <el-aside class="aside" width="auto">
            <app-aside
            class="aside-munu"
            :is-collapse="isCollapse"/>
        </el-aside>
        <el-container>
            <el-header class="header">
                <div>
                    <!--
                      class样式处理
                      {
                        属性名：布尔值
                      }
                      true:作用类名
                      fales：不做用类名
                    -->
                    <i :class="{
                      'el-icon-s-unfold' : isCollapse,
                      'el-icon-s-fold' : !isCollapse
                    }"
                    @click="isCollapse = !isCollapse"></i>
                    <span>你好</span>
                </div>
                <el-dropdown>
                    <div class="avate-warp">
                        <img  class="avate" :src='user.photo' alt="">
                        <span>{{user.name}}</span>
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </div>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item class="el-icon-setting">个人设置</el-dropdown-item>
                      <!-- 组件默认不识别原生事件，除非内部做了处理（例如<el-button/>按钮做过处理） -->
                      <el-dropdown-item
                      @click.native="onLogout"
                      >用户退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-main class="main">
              <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 引入aside侧边栏组件
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'LayoutIndex',
  components: {
    AppAside
  },
  props: {},
  data () {
    return {
      /* 当前登录用户信息 */
      user: {},
      isCollapse: false
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出登录
        window.localStorage.removeItem('user')
        this.$router.push('./login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less">
.layout-container{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.aside{
    background-color: #d3dce6;
    .nav-menu{
        height: 100%;
    }
}
.header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #b3c0d1;
    border-bottom: 1px solid #cccccc;
}
.main{
    background-color: #e9eef3;
}
.avate-warp{
    display: flex;
    align-items: center;
    .avate{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
}
</style>
