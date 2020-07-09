<template>
  <div class='add-photo'>
    <van-nav-bar title="发布邀约信息" left-text="" left-arrow @click-left="$router.go(-1)" style="position: fixed;width: 100%;top: 0;">
      <template #right>
      </template>
    </van-nav-bar>

    <div class="row">
      <div class="row1">
        <span>邀约具体要求</span>
      </div>
      <van-field v-model="form.content" :autosize=" { maxHeight: 100, minHeight: 100 }" type="textarea" placeholder="请描述你的邀约要求 可添加配套服务 如修图美妆服务" show-word-limit class="row1-content" />
    </div>

    <div class="row">
      <div class="row1">
        <span>上传图片</span>
        <span style="font-size:12px;margin-left:10px;color:rgb(191 191 191);">本人作品/本人照片/期待的风格</span>
      </div>
      <van-uploader v-model="fileList" multiple :max-count="3" :after-read="afterRead" :before-delete="before_delete" />
    </div>

    <div class="row">
      <van-field v-model="form.city" label="面向地区" placeholder="请输入面向地区 (如广州市)" />
      <van-field label="贴上标签">
        <template #input>
          <div class="input-radio">
            <div class="radio-row" :class="{'radio-row-active':active==0}" @click="active=0">
              <img :src="require('@/assets/我会ico.png')" alt="">
              我会拍照
            </div>
            <div class="radio-row" :class="{'radio-row-active':active==1}" @click="active=1">
              <img :src="require('@/assets/我想ico.png')" alt="">
              我想拍照
            </div>
          </div>
        </template>
      </van-field>
      <van-field v-model="form.addr" label="地点" placeholder="您期望拍摄的地点" />
      <van-field v-model="form.theme" label="主题风格" placeholder="您期望的照片风格 (如复古/清新/胶片)" />
      <van-field v-model="form.time" label="预约时间" placeholder="您期望拍摄的时间" />
    </div>

    <van-button color="#FFD30C" @click="onSubmit" class="btn">发送</van-button>
  </div>
</template>

<script>
import axios from "axios";
import { addYuepai } from "@/api/api";
import { getDateTime } from "@/utils/index";

export default {
  components: {},
  data() {
    return {
      active: 0,
      fileList: [],
      form: {
        content: "",
        city: "",
        addr: "",
        theme: "",
        time: "",
        img: [],
        img1: "",
        img2: "",
        img3: "",
        create_time: "",
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
      this.form.create_time = getDateTime();
      this.form.tag = this.active == 0 ? "我会拍照" : "我想拍照";
      if (this.form.img.length > 0) {
        this.form.img.forEach((item, index) => {
          let key = "img" + (index + 1);
          this.form[key] = item;
        });
      }
      addYuepai(this.form).then(res => {
        if (res.code == 200) {
          this.$toast("发布成功!");
          this.$router.push("/");
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
  border-radius: 20px;
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