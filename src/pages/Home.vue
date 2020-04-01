<template>
  <div class="home">
    <!-- 布局容器 -->
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <!-- 
          导航菜单
          el-menu 导航菜单组件
          el-submenu 子菜单 可以折叠
          el-menu-item-group 子菜单的分组
          el-menu-item 一个一个子菜单

         router属性 开启导航菜单的路由 功能 开启导航菜单的路由 
         功能 那么点击菜单的时候，就会跳转路由。会吧菜单的index属性作为路径进行跳转

         default-active: 用于设置默认高亮，，，default-active="/"  会让index为"/"默认高亮
        -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :default-active="$route.path"
        >
          <el-menu-item index="/">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>

          <el-menu-item index="/post-publish">
            <i class="el-icon-message-solid"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>

        <!-- el-aside -->
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + user.head_img" alt />
          <span class="nickname">{{ user.nickname }}</span>
          <a href="javascript:;" @click="logout">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {}
    };
  },
  created() {
    const user = JSON.parse(localStorage.getItem("user"));
    this.user = user;
  },
  methods: {
    async logout() {
      //弹出确认框
      try {
        await this.$confirm("你确定要退出吗?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        localStorage.removeItem("token");
        this.$router.push("/login");
        this.$message.success("退出成功");
      } catch (e) {
        this.$message("取消退出");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .nickname {
    margin: 0 10px;
  }
}
.el-main {
  background-color: #e9eef3;
}
.el-aside {
  background-color: #545c64;
  .logo {
    height: 60px;
    line-height: 60px;
    width: 200px;
    text-align: center;
    font-size: 18px;
    background-color: #333333;
    color: #fff;
  }
}
</style>
