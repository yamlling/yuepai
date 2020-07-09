<template>
  <div>

    <van-tabbar route active-color="rgb(255 194 29);">
      <van-tabbar-item :name="0" replace to="/">
        <template #icon="props" class="row">
          <div class="row">
            <img :src="props.active ? icon[0].active : icon[0].inactive" />
            <span style="font-size:10px;" :style="{color:props.active ?'#FAD162':'black'}">首页</span>
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item :name="1" replace to="/explore">
        <template #icon="props" class="row">
          <div class="row">
            <img :src="props.active ? icon[1].active : icon[1].inactive" />
            <span style="font-size:10px;" :style="{color:props.active ?'#FAD162':'black'}">发现</span>
          </div>
        </template>
      </van-tabbar-item>

      <!-- 发布 -->
      <van-tabbar-item>
        <template #icon="props" class="row">
          <div class="row" @click="show=true">
            <img :src="require('@/assets/u134.png')" style="height:30px" />
          </div>
        </template>
      </van-tabbar-item>

      <van-tabbar-item :name="2" replace to="/information">
        <template #icon="props" class="row">
          <div class="row">
            <img :src="props.active ? icon[2].active : icon[2].inactive" />
            <span style="font-size:10px;" :style="{color:props.active ?'#FAD162':'black'}">信息</span>
          </div>
        </template>
      </van-tabbar-item>
      <van-tabbar-item :name="3" replace to="/my">
        <template #icon="props" class="row">
          <div class="row">
            <img :src="props.active ? icon[3].active : icon[3].inactive" />
            <span style="font-size:10px;" :style="{color:props.active ?'#FAD162':'black'}">我的</span>
          </div>
        </template>
      </van-tabbar-item>
    </van-tabbar>

    <van-popup v-model="show" class="add" @click.stop="show=false">
      <div class="btn" @click="$router.push('/add-photo')">
        预约拍照
      </div>
      <div class="btn" @click="$router.push('/add-works')">
        发布作品
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      active: 0,
      show: false,
      icon: [
        {
          active: require("@/assets/u85.png"),
          inactive: require("@/assets/u97.png")
        },
        {
          active: require("@/assets/u106.png"),
          inactive: require("@/assets/u94.png")
        },
        {
          active: require("@/assets/u112.png"),
          inactive: require("@/assets/u88.png")
        },
        {
          active: require("@/assets/u127.png"),
          inactive: require("@/assets/u91.png")
        }
      ]
    };
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.row {
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    margin-bottom: 5px;
  }
}
.add {
  height: 100%;
  width: 100%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btn {
    padding: 20px 50px;
    background-color: #fad162;
    border-radius: 10px;
    margin-bottom: 80px;
  }
}
</style>