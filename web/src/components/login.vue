<template>
  <div class="login">
    <img src="../assets/logo.png" width="300" />
    <el-row>
      <el-col :span="12" :offset="6">
        <el-form ref="ruleForm" label-width="80px" :model="ruleForm" :rules="rules">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <el-button type="primary" round @click="submit">登录</el-button>
          <br />
          <router-link to="/register">
            <el-button type="text">注册</el-button>
          </router-link>
          <br />
          <router-link to="/">
            <el-button type="text">首页</el-button>
          </router-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { login } from "@/api/user.js";

export default {
  name: "login",
  data() {
    return {
      ruleForm: {},
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    ...mapMutations(["baseInfo"]),
    submit() {
      let that = this;
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          login(this.ruleForm)
            .then(res => {
              if (res.code === 0) {
                that.baseInfo(res.data);
                sessionStorage.setItem("userId", res.data.id);
                sessionStorage.setItem("userName", res.data.userName);
                sessionStorage.setItem("jifen", res.data.jifen);
                that.$router.push({ path: "/" });
                // that.$forceUpdate()
                 window.location.reload()
              }
            })
            .catch(function(err) {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='less'>
.login {
  img {
    margin-bottom: 10px;
  }
  text-align: center;
}
</style>
