<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image" class="swipe-img" />
      </van-swipe-item>
    </van-swipe>

    <div class="tag">
      <span :class="{'tag-active':active==0}" @click="active=0">作品学习</span>
      <div class="tag-block"></div>
      <span :class="{'tag-active':active==1}" @click="active=1">教程学习</span>
    </div>

    <div style="padding:10px 10px 50px;" v-show="active==0">
      <Card v-for="item in list" :key="item.id" class="car" @click.native="jump(item)">
        <div slot class="row">
          <div class="row1">
            <div style="display: flex;align-items: center;">
              <img style="width:50px;height:50px;margin-right:15px;border-radius: 50%;" :src="item.img?item.img:require('@/assets/u66.png')">
              <span>{{item.nick}}</span>
            </div>
            <div style="font-size: 10px;color: black;background-color: #ffd30c;padding: 5px 15px;border-radius: 6px;" @click.stop="guan(item)">
              关注
            </div>
          </div>

          <div class="row3">
            {{item.name}}
          </div>

          <div class="row4">
            <img :src="item.img1" v-if="item.img1 != ''">
            <img :src="item.img2" v-if="item.img2 != ''">
            <img :src="item.img3" v-if="item.img3 != ''">
          </div>
        </div>
      </Card>
    </div>

    <div style="padding:10px 10px 50px;" v-show="active==1">
      <Card class="car" :isradius="false">
        <div slot class="row">
          <div class="row6">
            <img :src="require('@/assets/摄影截图/截图2.jpg')">
            <span style="margin:5px 0;">照片法则，什么样的照片才脱颖</span>
          </div>
          <div class="row7">
            1小时前
          </div>
        </div>
      </Card>

      <Card class="car" :isradius="false">
        <div slot class="row">
          <div class="row6">
            <img :src="require('@/assets/摄影截图/截图3.jpg')">
            <span style="margin:5px 0;">让你爱不释手的相机富士xpro3</span>
          </div>
          <div class="row7">
            2小时前
          </div>
        </div>
      </Card>

      <Card class="car" :isradius="false">
        <div slot class="row">
          <div class="row6">
            <img :src="require('@/assets/摄影截图/截图4.jpg')">
            <span style="margin:5px 0;">摄影教程｜复刻调色，这一个工具就够了！</span>
          </div>
          <div class="row7">
            3小时前
          </div>
        </div>
      </Card>
    </div>
    <Tabber />
  </div>
</template>

<script>
import Tabber from "@/components/Tabber";
import Card from "@/components/Card";
import { listWorks, guanzhu } from "@/api/api";
import { getDateTime } from "@/utils/index";

export default {
  components: { Tabber, Card },
  data() {
    return {
      active: 0,
      list: [],
      images: [
        require("@/assets/海报1.jpg"),
        require("@/assets/海报2.jpg"),
        require("@/assets/海报3.jpg"),
        require("@/assets/海报4.jpg")
      ],
      value: ""
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {
    active(val) {
      if (val == 0) {
        this.getData();
      }
    }
  },
  methods: {
    //获取列表数据
    getData() {
      listWorks().then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },

    //跳转
    jump(item) {
      this.$router.push({
        name: "Works",
        params: item
      });
    },

    //关注
    guan(item) {
      guanzhu({
        beuserid: item.userid,
        userid: localStorage.getItem("id"),
        time: getDateTime()
      }).then(res => {
        if (res.code == 200) {
          this.$toast("关注成功!");
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.swipe-img {
  height: 200px;
  width: 100%;
  // object-fit:cover;
}

.car {
  margin-bottom: 10px;
  .row {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px 20px;
    font-size: 15px;
    .row1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .row3 {
      font-size: 15px;
      margin: 8px;
    }
    .row4 {
      width: 100%;
      display: flex;
      align-items: center;
      margin-left: -20px;
      img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
    }
    .row6 {
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      img {
        width: 100%;
        height: 150px;
      }
    }
    .row7 {
      align-self: flex-end;
      color: #aaaaaa;
      font-size: 10px;
    }
  }
}

.tag {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  padding: 20px 0;
  .tag-block {
    height: 20px;
    width: 2px;
    background-color: #d5d5d5;
    margin: 0 20px;
  }
  .tag-active {
    font-weight: 600;
    border-bottom: 3px solid #ffd30c;
  }
}
</style>