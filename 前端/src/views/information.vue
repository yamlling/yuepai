<template>
  <div class="information">
    <div class="tag">
      <span :class="{'tag-active':active==0}" @click="active=0">我收到的邀约</span>
      <div class="tag-block"></div>
      <span :class="{'tag-active':active==1}" @click="active=1">我发起的邀约</span>
    </div>

    <div v-show="active==0" style="padding-bottom:50px">
      <div class="row" v-for="item in list" :key="item.id">
        <div v-if="item.state != 0" style="color:red">{{item.state == 1?'接受':"拒绝"}}</div>
        <div class="row1">
          <div style="display: flex;align-items: center;">
            <img style="width:50px;height:50px;margin-right:15px;border-radius: 50%;" :src="item.img?item.img:require('@/assets/u66.png')">
            <span>{{item.nick}}</span>
          </div>
          <div class="row1-2" v-if="item.state == 0">
            <span @click="change(1,item.id)">同意</span>
            <span @click="change(2,item.id)">拒绝</span>
          </div>
        </div>
        <span style="margin:5px 0;color:#b9b9b9;font-size:12px;">
          你好，我今天也在这边游玩，可以一起
        </span>
      </div>
    </div>

    <div v-show="active==1" style="padding-bottom:50px">
      <div class="row" v-for="item in list" :key="item.id">
        <div class="row3">
          <div style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
            <img style="width:80px;height:25px;" :src="item.tag=='我会拍照'?require('@/assets/我会.png'):require('@/assets/我想.png')">
            <span>面向{{item.city}}</span>
            <span style="color:#fff;background-color: #333333;padding: 5px 15px;border-radius: 6px;" @click="del(item)">删除</span>
          </div>
        </div>
        <div style="margin:10px 0;color:#b9b9b9;font-size:12px;align-self:flex-start">
          这里风景很漂亮，有附近的可以一起拍照学习
        </div>
        <div style="color:#b9b9b9;font-size:12px;align-self:flex-end">
          {{item.create_time}}
        </div>
      </div>
    </div>
    <Tabber />
  </div>
</template>

<script>
import Tabber from "@/components/Tabber";
import { formMe, toMe, changeState, delState } from "@/api/api";
export default {
  components: { Tabber },
  data() {
    return {
      active: 0,
      list: []
    };
  },
  created() {
    this.getdata1();
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  watch: {
    active(val) {
      if (val == 0) {
        this.getdata1();
      } else {
        this.getdata2();
      }
    }
  },
  methods: {
    //我收到的邀约
    getdata1() {
      toMe({
        userid: localStorage.getItem("id")
      }).then(res => {
        this.list = res.data;
      });
    },

    //我发出的邀约
    getdata2() {
      formMe({
        userid: localStorage.getItem("id")
      }).then(res => {
        this.list = res.data;
      });
    },

    //修改邀约状态
    change(state, id) {
      changeState({
        state: state,
        id: id
      }).then(res => {
        this.getdata1();
      });
    },

    //删除
    del(item) {
      delState({
        id: item.id
      }).then(res => {
        this.getdata2();
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.information {
  background-color: #fff;
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

.row {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 10px 20px;
  padding: 10px 0;
  font-size: 15px;
  border-bottom: 1px solid #e1e1e1;
  .row1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .row1-2 {
      color: #fff;
      font-size: 10px;
      & span:first-child {
        background-color: #ffd30c;
        padding: 5px 15px;
        border-radius: 6px;
        margin-right: 10px;
      }
      & span:last-child {
        background-color: #333333;
        padding: 5px 15px;
        border-radius: 6px;
      }
    }
  }
  .row3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    font-size: 13px;
  }
}
</style>