<template>
  <div class="content">
    <van-nav-bar title="邀约详情" left-text="" left-arrow @click-left="$router.go(-1)" style="position: fixed;width: 100%;top: 0;">
      <template #right>
      </template>
    </van-nav-bar>

    <div class="row1">
      <div style="display: flex;align-items: center;">
        <img style="width:50px;height:50px;margin-right:15px;border-radius: 50%;" :src="info.img?info.img:require('@/assets/u66.png')">
        <span>{{info.nick}}</span>
      </div>
      <div style="font-size: 10px;color: #b1b1b1;">
        {{info.create_time}}
      </div>
    </div>

    <div class="row2">
      <img :src="info.tag=='我会拍照'?require('@/assets/我会.png'):require('@/assets/我想.png')" style="margin-right:30px">
      <span>面向{{info.city}}</span>
    </div>
    <div class="row3">
      <div>{{info.content}}</div>
      <div>地点:{{info.addr}}</div>
      <div>风格:{{info.theme}}</div>
      <img :src="info.img1" v-if="info.img1 != ''" style="margin-bottom:20px">
      <img :src="info.img2" v-if="info.img2 != ''" style="margin-bottom:20px">
      <img :src="info.img3" v-if="info.img3 != ''" style="margin-bottom:20px">
    </div>
    <div class="row4" @click="show=true">
      <span>喜欢他的作品可以给他打赏</span>
      <van-icon name="arrow" />
    </div>

    <div class="row5">
      <div class="row5-1" @click="zan">
        <img :src="require('@/assets/u233.png')" style="margin-bottom:5px">
        <span>{{info.zan}}</span>
      </div>
      <div class="row5-2" @click="yue">
        立即邀约他
      </div>
    </div>

    <van-dialog v-model="show" title="为你喜欢的作品打赏吧" show-cancel-button class="dalog" @confirm="shang">
      <div style="display: flex;align-items: center;">
        <van-field v-model="value" label="" placeholder="请输入打赏金额" style="width:200px;" type="number" />
        <span>元</span>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { zanYuepai, dashang, nowYuepai } from "@/api/api";
import { getDateTime } from "@/utils/index";

export default {
  components: {},
  data() {
    return {
      show: false,
      info: {},
      value: 0
    };
  },
  created() {
    if (Object.keys(this.$route.params).length == 0) {
      this.$toast("没有查询到数据");
      this.$router.push("/");
    } else {
      this.info = this.$route.params;
    }
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //打赏
    shang() {
      dashang({
        price: this.value,
        id: this.info.id
      }).then(res => {
        if (res.code == 200) {
          this.$toast("打赏成功!");
        }
      });
    },

    //赞
    zan() {
      zanYuepai({
        id: this.info.id
      }).then(res => {
        if (res.code == 200) {
          this.info.zan++;
        }
      });
    },

    //立即邀约
    yue() {
      nowYuepai({
        userid: localStorage.getItem("id"),
        yaoyueid: this.info.id,
        time: getDateTime()
      }).then(res => {
        if (res.code == 200) {
          this.$toast("邀约成功!");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.content {
  height: 100vh;
  width: 100%;
  padding-top: 60px;
  background-color: #fff;
  .row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    margin-bottom: 10px;
    border-bottom: 3px solid #f0f0f0;
  }
  .row2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin: 8px 0;
    padding: 10px 40px;
  }
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
  .row4 {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #c2c2c2;
  }
  .row5 {
    border-top: 3px solid #f0f0f0;
    margin-top: 20px;
    padding: 10px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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