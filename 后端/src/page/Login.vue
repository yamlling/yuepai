<template>
  <div class="scs-screen login">
    <el-row class="content">
      <div class="logo"></div>
      <el-row>
        <el-form label-width="0px" :model="data" :rules="rule_data" ref="loginForm">
          <el-form-item prop='user_name'>
            <el-input type="text" placeholder="账号" v-model="data.user" :disabled="loading" autofocus @keyup.native.enter="login()"></el-input>
          </el-form-item>
          <el-form-item prop='pass_word'>
            <el-input type="password" placeholder="密码" v-model="data.pwd" :disabled="loading" @keyup.native.enter="login()"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="login" :disabled="loading">登录</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        user: "",
        pwd: ""
      }
    };
  },
  mounted() {},
  methods: {
    login() {
      if (this.data.user == "admin" && this.data.pwd == "admin") {
        this.$message.success("登陆成功!");
        this.$router.push("/user/list");
      } else {
        this.$message.error("账号密码错误!");
      }
    }
  },
  watch: {}
};
</script>

<style lang="less">
.login {
  background: #373a42 url("../assets/bg.jpg") no-repeat center;
  background-size: cover;
  .el-dialog__body {
    padding-bottom: 0;
  }
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
    background: #fff;
    background-clip: padding-box;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
    border: 5px solid rgba(0, 100, 200, 0.3);
    padding: 16px;
    width: 30%;
    min-width: 300px;
    max-width: 400px;
    border-radius: 10px;
    .logo {
      background: url("../assets/logo.png") no-repeat center 0;
      height: 64px;
      margin-bottom: 15px;
    }
    .el-button {
      margin-left: 20px;
      float: right;
    }
  }
}
</style>
