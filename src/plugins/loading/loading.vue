<template>
  <div class="mask" v-if="isShow">
    <!-- <div class="loading"></div> -->
    <img src="../../assets/img/loading.svg" alt="">
  </div>
</template>
<script>
export default {
  data() {
    return {
      // loading默认不显示
      isShow: false,
    };
  },
  methods: {
    // 显示 loading 页面
    ShowloadingFun() {
      this.isShow = true;
    },
    // 隐藏 loading 页面
    HideloadingFun() {
      this.isShow = false;
    },
  },
};
</script>
<style lang="less">
// 定义动画 控制 loading旋转
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: center;
  .loading {
    width: 30px;
    height: 30px;
    border: 5px solid #25d6d6;
    border-radius: 50%;
    border-left-color: transparent;
    animation: rotate 1500ms infinite;
  }
}
</style>
