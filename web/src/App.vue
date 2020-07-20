<template>
  <div id="app">
    <el-row class="mt-10" v-if="isShowTop">
      <el-col :span="20">
        <router-link to="/">
          <img src="./assets/logo.png" width="250" class="logo" />
        </router-link>
      </el-col>
      <el-col :span="4" class="mt36" v-if="updateInfo">
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
    <el-row class="mt-10" v-if="isLogin==='adminroot'">
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
      title="添加积分请联系客服qq"
      width="200"
      trigger="hover"
      content="2020568267"
    >
      <el-button slot="reference" type="primary" icon="el-icon-chat-line-round" circle></el-button>
    </el-popover>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { login, getUserDetail } from "@/api/user.js";
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      updateInfo: true,
      isLogin: localStorage.getItem("userName"),
      jifen: localStorage.getItem("jifen"),
      userId: localStorage.getItem("userId")
    };
  },
  created() {},
  computed: {
    isShowTop() {
      return ["/login", "/register", "/add"].includes(this.$route.path)
        ? false
        : true;
    }
  },
  methods: {
    ...mapMutations(["baseInfo"]),
    reload() {
      this.isLogin = localStorage.getItem("userName");
      this.jifen = localStorage.getItem("jifen");
      this.userId = localStorage.getItem("userId");
      this.updateInfo = false;
      this.$nextTick(() => {
        this.updateInfo = true;
      });
    },
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    logOut(v) {
      if (v === "logOut") {
        localStorage.setItem("userName", "");
        localStorage.setItem("userId", "");
        localStorage.setItem("jifen", 0);
        this.baseInfo({
          userId: "",
          userName: "",
          jifen: 0
        });
        this.$router.push({ path: "/login" });
        this.reload();
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
        getUserDetail({ userId: this.userId })
          .then(res => {
            if (res.code === 0) {
              if (res.data.jifen < 1) {
                this.$message({
                  message: "没有可用积分，联系客服添加积分",
                  type: "warning"
                });
                return;
              } else {
                this.$router.push({ path: "/add" });
              }
            }
          })
          .catch(function(err) {
            console.log(err);
          });
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
