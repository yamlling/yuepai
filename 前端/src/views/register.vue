<template>
  <div class="login">
    <van-nav-bar title="注册新用户" left-text="" left-arrow @click-left="$router.go(-1)" style="position: fixed;width: 100%;top: 0;">
      <template #right>
      </template>
    </van-nav-bar>
    <img :src="require('@/assets/u66.png')" class="login-img">
    <div class="login-title">约立拍</div>
    <div class="row">
      <span class="row-title">用户名</span>
      <input type="text" placeholder="请输入用户名" v-model="form.user">
    </div>
    <div class="row">
      <span class="row-title">密码</span>
      <input type="password" placeholder="请输入密码" v-model="form.pwd">
    </div>
    <div class="row">
      <span class="row-title">昵称</span>
      <input type="text" placeholder="请输入昵称" v-model="form.nick">
    </div>
    <div class="row">
      <span class="row-title">身份证号</span>
      <input type="text" placeholder="请输入身份证号" v-model="form.idcard">
    </div>
    <div class="row">
      <span class="row-title">手机号</span>
      <input type="text" placeholder="请输入手机号" v-model="form.tel">
    </div>
    <div class="row">
      <span class="row-title">真实姓名</span>
      <input type="text" placeholder="请输入真实姓名" v-model="form.name">
    </div>
    <van-button type="default" class="btn" @click="submit">注册</van-button>
  </div>
</template>

<script>
import { register } from "@/api/api";
export default {
  components: {},
  data() {
    return {
      form: {
        user: "",
        pwd: "",
        nick: "",
        idcard: "",
        tel: "",
        name: "",
        addr: "",
        bith: "",
        img: ""
      }
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //提交
    submit() {
      register(this.form).then(res => {
        if (res.code == 200) {
          this.$toast("注册成功!");
          this.$router.push("/login");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  background-color: #fff;
  padding-top: 20px;
  min-height: 100vh;
  .login-img {
    width: 130px;
    height: 130px;
    margin-top: 50px;
  }
  .login-title {
    font-size: 17px;
    color: #f2ce5e;
    font-weight: 600;
    margin-bottom: 40px;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 30px;
    font-size: 14px;
    .row-title {
      text-align: left;
      width: 60px;
      margin-right: 20px;
    }
    input {
      border: none;
      border-bottom: 1px solid black;
    }
  }
  .btn {
    background-color: #f2ce5e;
    width: 150px;
    font-weight: 600;
    border-radius: 4px;
    margin: 20px 0;
  }
  .register {
    display: flex;
    align-items: center;
    font-size: 14px;
    justify-content: center;
  }
}
/deep/ .van-nav-bar__left {
  /deep/ .van-icon-arrow-left {
    color: #c2c2c2;
  }
}
</style>