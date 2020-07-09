<template>
  <div class="my">
    <div class="top">
      <div class="row1">
        <div style="display: flex;align-items: center;justify-content:center;width:100%">
          <img style="width:60px;height:60px;margin-right:30px;border-radius: 50%;" :src="img?img:require('@/assets/u66.png')">
          <span style="color: #333333;font-size: 20px;">{{nick}}</span>
        </div>
      </div>

      <div class="row2">
        <div class="row2-1">
          <span>关注</span>
          <span>{{guan}}</span>
        </div>
        <div class="row2-tag"></div>
        <div class="row2-1">
          <span>点赞</span>
          <span>{{zan}}</span>
        </div>
        <div class="row2-tag"></div>
        <div class="row2-1">
          <span>打赏</span>
          <span>{{shang}}</span>
        </div>
      </div>
    </div>

    <div class="menu">
      <div class="menu1">
        <div class="flex">
          <img :src="require('@/assets/u573.png')" alt="">
          <span>我的主页</span>
        </div>
        <van-icon name="arrow" color="rgb(179 179 179)" />
      </div>
      <div class="menu1">
        <div class="flex">
          <img :src="require('@/assets/u642.png')" alt="">
          <span>我的课程</span>
        </div>
        <van-icon name="arrow" color="rgb(179 179 179)" />
      </div>
      <div class="menu1" @click="$router.push('/config')">
        <div class="flex">
          <img :src="require('@/assets/u646.png')" alt="">
          <span>个人设置</span>
        </div>
        <van-icon name="arrow" color="rgb(179 179 179)" />
      </div>
    </div>
    <Tabber />
  </div>
</template>

<script>
import Tabber from "@/components/Tabber";
import { userPrice, userGuanzhu, userZan } from "@/api/api";
export default {
  components: { Tabber },
  data() {
    return {
      nick: localStorage.getItem("nick"),
      img: localStorage.getItem("img"),
      zan: 0,
      shang: 0,
      guan: 0
    };
  },
  created() {
    this.getzan();
    this.getshang();
    this.getguan();
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //点赞量
    getzan() {
      userZan({
        userid: localStorage.getItem("id")
      }).then(res => {
        this.zan = res.data[0];
      });
    },

    //打赏量
    getshang() {
      userPrice({
        userid: localStorage.getItem("id")
      }).then(res => {
        this.shang = res.data.sum;
      });
    },

    //关注量
    getguan() {
      userGuanzhu({
        beuserid: localStorage.getItem("id")
      }).then(res => {
        this.guan = res.data.sum;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.top {
  height: 320px;
  background: url("../assets/u47.jpg") no-repeat;
  background-size: 100% 70%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  //   padding: 0 20px;
  .row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  .row2 {
    margin-top: 20px;
    padding: 0 20px 10px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    border-bottom: 8px solid #f5f5f5;
    .row2-tag {
      height: 30px;
      width: 2px;
      background-color: #e4e4e4;
    }
    .row2-1 {
      display: flex;
      flex-direction: column;
      align-items: center;
      & span:first-child {
        margin-bottom: 10px;
      }
    }
  }
}

.menu {
  padding: 10px 20px;
  box-sizing: border-box;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  .menu1 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  & .menu1:not(:last-child) {
    margin-bottom: 20px;
  }
  .flex {
    display: flex;
    align-items: center;
    font-size: 14px;
    img {
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
  }
}
</style>