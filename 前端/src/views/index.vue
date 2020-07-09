<template>
  <div class="index">
    <img src="localhost:3000/1592110099221.png" alt="">
    <van-search v-model="value" show-action placeholder="请输入搜索关键词">
      <template #left>
        <img :src="require('@/assets/u137.png')" style="height: 40px;margin-right: 10px;">
      </template>
      <template #action>
        <div @click="getData">搜索</div>
      </template>
    </van-search>
    <div style="height:700px">
      <zEditor url="www.baidu.com"/>
    </div>
    <div style="padding:10px 10px 50px;">
      <Card v-for="item in list" :key="item.id" class="car" @click.native="jump(item)">
        <div slot class="row">
          <div class="row1">
            <div style="display: flex;align-items: center;">
              <img style="width:50px;height:50px;margin-right:15px;border-radius: 50%;" :src="item.img?item.img:require('@/assets/u66.png')">
              <span>{{item.nick}}</span>
            </div>
            <div style="font-size: 10px;color: #b1b1b1;">
              {{item.create_time}}
            </div>
          </div>

          <div class="row2">
            <img :src="item.tag=='我会拍照'?require('@/assets/我会.png'):require('@/assets/我想.png')" style="margin-right:30px">
            <span>{{item.city}}</span>
          </div>

          <div class="row3">
            {{item.content}}
          </div>

          <div class="row4">
            <img :src="item.img1" v-if="item.img1 != ''">
            <img :src="item.img2" v-if="item.img2 != ''">
            <img :src="item.img3" v-if="item.img3 != ''">
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
import { listYuepai } from "@/api/api";
import zEditor from "zjz-vue-editor";

export default {
  components: { Tabber, Card, zEditor },
  data() {
    return {
      list: [],
      value: ""
    };
  },
  created() {
    this.getData();
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {
    //获取列表数据
    getData() {
      listYuepai({
        search: this.value
      }).then(res => {
        if (res.code == 200) {
          this.list = res.data;
        }
      });
    },

    //跳转
    jump(item) {
      this.$router.push({
        name: "Content",
        params: item
      });
    }
  }
};
</script>

<style lang='scss' scoped>
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
    .row2 {
      display: flex;
      align-items: center;
      margin: 8px 0;
    }
    .row3 {
      font-size: 14px;
      color: #b1b1b1;
      margin-bottom: 8px;
    }
    .row4 {
      width: 100%;
      display: flex;
      align-items: center;
      margin-left: -10px;
      img {
        width: 100px;
        height: 100px;
        margin-right: 10px;
      }
    }
  }
}

/deep/ .van-search {
  background-color: #fff0;
  /deep/ .van-search__content {
    background-color: #fff;
  }
  /deep/ .van-icon-search {
    display: none;
  }
}
</style>