<template>
  <div class="content">
    <van-nav-bar title="作品详情" left-text="" left-arrow @click-left="$router.go(-1)" style="position: fixed;width: 100%;top: 0;">
      <template #right>
      </template>
    </van-nav-bar>

    <div class="row3">
      <div>{{info.content}}</div>
      <img :src="info.img1" v-if="info.img1 != ''" style="margin-bottom:20px">
      <img :src="info.img2" v-if="info.img2 != ''" style="margin-bottom:20px">
      <img :src="info.img3" v-if="info.img3 != ''" style="margin-bottom:20px">
    </div>

    <div class="row5">
      <div class="row5-1" @click="zan">
        <img :src="require('@/assets/u233.png')" style="margin-bottom:5px">
        <span>{{info.zan}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { zanWorks } from "@/api/api";

export default {
  components: {},
  data() {
    return {
      info: {}
    };
  },
  created() {
    if (Object.keys(this.$route.params).length == 0) {
      this.$toast("没有查询到数据");
      this.$router.push("/explore");
    } else {
      this.info = this.$route.params;
    }
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //赞
    zan() {
      zanWorks({
        id: this.info.id
      }).then(res => {
        if (res.code == 200) {
          this.info.zan++;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  height: 100%;
  width: 100%;
  padding-top: 60px;
  background-color: #fff;

  .row3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-size: 14px;
    padding: 10px 40px;
    div {
      width: 100%;
      text-align: left;
      margin-bottom: 15px;
    }
    img {
      width: 100%;
      object-fit: fill;
    }
  }
  .row5 {
    margin-top: 20px;
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .row5-1 {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .row5-2 {
      padding: 10px 20px;
      background-color: #ffd30c;
      color: black;
      border-radius: 4px;
      font-size: 14px;
    }
  }
}
/deep/ .van-nav-bar__left {
  /deep/ .van-icon-arrow-left {
    color: #c2c2c2;
  }
}
.dalog {
  /deep/ .van-hairline--left {
    color: #ffd30c;
  }
}
</style>