<template>
  <div class="config">
    <van-nav-bar title="资料设置" left-text="" left-arrow @click-left="$router.go(-1)" style="position: fixed;width: 100%;top: 0;">
      <template #right>
      </template>
    </van-nav-bar>

    <div style="padding:10px;border-radius: 20px;background-color:#fff;margin:0px 10px 20px; ">
      <van-field name="uploader" label="头像上传">
        <template #input>
          <van-uploader v-model="form.uploader" max-count="1" :after-read="afterRead" :before-delete="before_delete" />
        </template>
      </van-field>
      <van-field v-model="form.user" name="用户名" label="用户名" placeholder="用户名" :disabled="true" />
      <van-field v-model="form.tel" name="手机号" label="手机号" placeholder="手机号" />
      <van-field v-model="form.bith" name="生日" label="生日" placeholder="生日" />
      <van-field v-model="form.addr" name="地区" label="地区" placeholder="地区" />
    </div>

    <div class="btn">
      <van-button color="#FFD30C" @click="onSubmit">保存信息</van-button>
      <van-button color="#FFD30C" @click="loginout">退出登录</van-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reInfo } from "@/api/api";
export default {
  components: {},
  data() {
    return {
      form: {
        uploader: [],
        id: localStorage.getItem("id"),
        user: localStorage.getItem("user"),
        tel: localStorage.getItem("tel"),
        img: localStorage.getItem("img"),
        bith: localStorage.getItem("bith"),
        addr: localStorage.getItem("addr")
      }
    };
  },
  created() {
    if (localStorage.getItem("img") != "") {
      this.form.uploader.push({ url: localStorage.getItem("img") });
    }
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //提交
    onSubmit() {
      reInfo({
        id: this.form.id,
        user: this.form.user,
        tel: this.form.tel,
        img: this.form.img,
        bith: this.form.bith,
        addr: this.form.addr
      }).then(res => {
        if (res.code == 200) {
          this.$toast("修改成功!");
          Object.keys(res.data).map((item, index) => {
            localStorage.setItem(item, res.data[item]);
          });
        }
      });
    },

    //上传
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      await this.upload(file.file).then(res => {
        this.form.img = res;
      });
    },

    //删除图片回调方法
    before_delete(file, keys) {
      let key = keys.index;
      this.form.img = "";
      this.form.uploader = [];
    },
    //上传方法
    async upload(file) {
      let formData = new FormData();
      formData.append("file", file);
      let info = await axios.post(
        "http://localhost:3000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      return info.data.filename;
    },

    //退出
    loginout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

<style lang='scss' scoped>
.config {
  background-color: #f2f2f2;
  height: 100%;
  padding-top: 55px;
}
/deep/ .van-nav-bar__left {
  /deep/ .van-icon-arrow-left {
    color: #c2c2c2;
  }
}
.btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    color: black !important;
    width: 150px;
    margin-bottom: 20px;
    font-size: 12px;
  }
}
</style>