<template>
  <div class='add-photo'>
    <van-nav-bar title="发布作品" left-text="" left-arrow @click-left="$router.go(-1)" style="position: fixed;width: 100%;top: 0;">
      <template #right>
      </template>
    </van-nav-bar>

    <div class="row">
      <div class="row1">
        <van-field v-model="form.name" placeholder="给作品起个名字吧" show-word-limit class="row1-content" />
      </div>
      <van-field v-model="form.content" :autosize=" { maxHeight: 100, minHeight: 100 }" type="textarea" placeholder="和大家分享照片背后的故事 (限500字)" show-word-limit class="row1-content" />
    </div>

    <div class="row">
      <div class="row1">
        <span>上传图片</span>
      </div>
      <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" :before-delete="before_delete" />
    </div>

    <van-button color="#FFD30C" @click="onSubmit" class="btn">发送</van-button>
  </div>
</template>

<script>
import axios from "axios";
import { addWorks } from "@/api/api";
import { getDateTime } from "@/utils/index";

export default {
  components: {},
  data() {
    return {
      active: 0,
      fileList: [],
      form: {
        name: "",
        time: "",
        content: "",
        img: [],
        img1: "",
        img2: "",
        img3: "",
        userid: localStorage.getItem("id")
      }
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //上传
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      await this.upload(file.file).then(res => {
        this.form.img.push(res);
      });
    },

    //删除图片回调方法
    before_delete(file, keys) {
      let key = keys.index;
      this.form.img.splice(key, 1);
      this.fileList.splice(key, 1);
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

    //提交
    onSubmit() {
      this.form.time = getDateTime();
      if (this.form.img.length > 0) {
        this.form.img.forEach((item, index) => {
          let key = "img" + (index + 1);
          this.form[key] = item;
        });
      }
      addWorks(this.form).then(res => {
        if (res.code == 200) {
          this.$toast("发布成功!");
          this.$router.push("/explore");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.add-photo {
  height: 100%;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 20px;
}

.row {
  margin: 10px;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  text-align: left;
  .row1 {
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e9e9e9;
  }
  .row1-content {
    padding: 0;
  }
}
/deep/ .van-nav-bar__left {
  /deep/ .van-icon-arrow-left {
    color: #c2c2c2;
  }
}

.input-radio {
  display: flex;
  align-items: center;
  .radio-row {
    img {
      width: 25px;
      height: 25px;
    }
    margin-right: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    border: 1px solid black;
    padding: 0px 5px;
  }
  .radio-row-active {
    background: #f1cd4e;
    // img {
    //   opacity: 0.4;
    // }
  }
}
.btn {
  width: 150px;
  color: black !important;
}
</style>