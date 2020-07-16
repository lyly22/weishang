<template>
  <div id="app">
    <el-row class="mt-10" v-if="isShowTop">
      <el-col :span="20">
        <router-link to="/">
          <img src="./assets/logo.png" width="250" class="logo" />
        </router-link>
      </el-col>
      <el-col :span="4" class="mt36">
        <el-button type="primary" round @click="goAdd">发布货源</el-button>
        <el-button round @click="toLogin" v-if="!isLogin">登录</el-button>
        <el-dropdown @command="logOut" placement="bottom" v-else>
          <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>{{isLogin}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>积分：{{jifen}}</el-dropdown-item>
            <el-dropdown-item command="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
    <el-row class="mt-10" v-if="isLogin==='admin'">
      <el-col :span="4" :offset="20">
        <router-link to="/userList">
          <el-button type="primary" round>用户管理</el-button>
        </router-link>
        <router-link to="/articleList">
          <el-button type="primary" round>文章管理</el-button>
        </router-link>
      </el-col>
    </el-row>
    <el-popover
      placement="top-start"
      title="删除举报充值请添加客服微信"
      width="200"
      trigger="hover"
      content="12345678"
    >
      <el-button slot="reference" type="primary" icon="el-icon-chat-line-round" circle></el-button>
    </el-popover>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {},
  // watch: {
  //   isLogin(v) {
  //     if (v) {
  //       console.log(999);
  //       this.$forceUpdate();
  //     }
  //   }
  // },
  computed: {
    isLogin() {
      return sessionStorage.getItem("userName");
    },
    jifen() {
      return sessionStorage.getItem("jifen");
    },
    isShowTop() {
      return ["/login", "/register", "/add"].includes(this.$route.path)
        ? false
        : true;
    }
    // ...mapState(["userName", "userId", "jifen"])
  },
  methods: {
    ...mapMutations(["baseInfo"]),
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    logOut(v) {
      if (v === "logOut") {
        sessionStorage.setItem("userName", "");
        sessionStorage.setItem("userId", "");
        this.baseInfo({
          userId: null,
          userName: null
        });
        this.$router.push({ path: "/login" });
      }
    },
    goAdd() {
      if (!this.isLogin) {
        this.$message({
          message: "请先登录",
          type: "warning"
        });
        return;
      } else {
        this.$router.push({ path: "/add" });
      }
    }
  }
};
</script>

<style scoped lang='less'>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .logo {
    display: inline-block;
    margin: -20px 0 -40px 30px;
  }
  .avatar {
    position: relative;
    top: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
  /deep/.el-popover__reference {
    position: fixed;
    right: 20px;
    bottom: 20px;
  }
}
</style>
