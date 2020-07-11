<template>
  <div id="app">
    <el-row class="mt-10">
      <el-col :span="22">
        <img src="./assets/logo.png" width="250" class='logo' />
      </el-col>
      <el-col :span="2" class="mt20">
        <el-button round size="medium" @click="toLogin" v-if="!userName">登录</el-button>
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
export default {
  name: "App",
  data() {
    return {
    };
  },
  computed: {
    userName() {
      return localStorage.getItem("userName");
    },
    userId() {
      return localStorage.getItem("userId");
    }
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    logOut(v) {
      if (v === "logOut") {
        localStorage.setItem("userName", "");
        localStorage.setItem("userId", "");
        this.$router.push({ path: "/login" });
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
  .logo{
    display: inline-block;
    margin:-20px 0 -40px 30px;
  }
  .avatar {
    margin-top: 30px;
    display: flex;
    align-items: center;
    cursor: pointer;
    span {
      margin-left: 10px;
    }
  }
}
</style>
