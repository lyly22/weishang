<template>
  <div id="app">
    <el-row class="mt-10" v-if="isShowTop">
      <el-col :span="20">
        <img src="./assets/logo.png" width="250" class="logo" />
      </el-col>
      <el-col :span="4" class="mt36">
        <el-button type="primary" round @click="goAdd">发布货源</el-button>
        <el-button round @click="toLogin" v-if="!userName">登录</el-button>
        <el-dropdown @command="logOut" placement="bottom" v-else>
          <div class="avatar">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
            <span>{{userName}}</span>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
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
  computed: {
    isShowTop() {
      return ["/login", "/register", "/add"].includes(this.$route.path)
        ? false
        : true;
    },
    userName(){
      return localStorage.getItem('userName')
    }
    // ...mapState(["userName", "userId", "jifen"])
  },
  methods: {
    // ...mapMutations(["baseInfo"]),
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    logOut(v) {
      if (v === "logOut") {
        // this.baseInfo({
        //   userId: null,
        //   userName: null
        // });
        localStorage.setItem("userName", "");
        localStorage.setItem("userId", "");
        this.$router.push({ path: "/login" });
      }
    },
    goAdd() {
      if (!this.userName) {
        this.$message({
          message: "请先登录",
          type: "warning"
        });
        return;
      }
      this.$router.push({ path: "/add" });
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
}
</style>
