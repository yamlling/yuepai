<template>
  <div id="app">
    <div class="app-img" v-show="show">
      <img :src="require('@/assets/u46.png')">
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true
    };
  },
  created() {
    window.setTimeout(() => {
      this.show = false;
    }, 1000);
  },
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {}
};
</script>
<style lang="scss">
/* 为对应的路由跳转时设置动画效果 */
.fade-enter-active,
.fade-leave-avtive {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
html,
body,
#app {
  min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f2f2f2;
  // min-height: 100vh;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.app-img {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50%;
  }
}
</style>
