<template>
  <div class="main">首页</div>
</template>

<script>
import { HomeApi, GoodshApi, LoginApi } from "../../api";
export default {
  props: {},
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    test() {
      HomeApi().then((res) => {
        console.log("HomeApi", res);
      });

      GoodshApi({
        username: "雨下林",
        pwd: "123456",
      }).then((res) => {
        console.log("GoodshApi", res);
      });

      LoginApi({
        username: "雨下林",
        pwd: "123456",
      }).then((res) => {
        console.log("LoginApi", res);
      });
    },
  },
  created() {
    this.test();
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.main {
  width: 100vw;
  min-height: 100vh;
}
</style>
