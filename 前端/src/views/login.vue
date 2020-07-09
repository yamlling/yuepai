<template>
  <div class="login">
    <div class="title">快速登陆/注册</div>
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
    <van-button type="default" class="btn" @click="submit">登陆</van-button>
    <div class="register" @click="$router.push('/register')">
      <span>没有账号?注册一个</span>
      <van-icon name="arrow" />
    </div>
  </div>
</template>

<script>
import { login } from "@/api/api";
export default {
  components: {},
  data() {
    return {
      form: {
        user: "",
        pwd: ""
      }
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    submit() {
      login(this.form).then(res => {
        if (res.code == 200) {
          this.$toast("登陆成功");
          Object.keys(res.data).map((item, index) => {
            localStorage.setItem(item, res.data[item]);
          });
          this.$router.push("/");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  background-color: #fff;
  min-height: 100vh;
  padding: 20px;
  .title {
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    margin-bottom: 20px;
  }
  .login-img {
    width: 130px;
    height: 130px;
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
    margin-bottom: 20px;
    font-size: 14px;
    .row-title {
      text-align: left;
      width: 50px;
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
</style>