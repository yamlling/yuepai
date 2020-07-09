<template>
  <div class="card" :class="{'radius':isradius}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    isradius: {
      default: true,
      type: Boolean
    }
  },
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {},
  beforeDestroy() {},
  computed: {},
  methods: {}
};
</script>

<style lang='scss' scoped>
.card {
  min-height: 100px;
  width: 100%;
  background-color: #fff;
}
.radius {
  border-radius: 20px;
}
</style>