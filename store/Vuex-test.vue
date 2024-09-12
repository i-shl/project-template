<template>
  <div id="app">
    <h2>------app内容:modules中的内容------</h2>
    <h2>{{ $store.state.a.name }}</h2>
    <button @click="updateName">修改名字</button>
    <h2>{{ $store.getters.fullname }}</h2>
    <h2>{{ $store.getters.fullname2 }}</h2>
    <h2>{{ $store.getters.fullname3 }}</h2>
    <button @click="asyncUpdateName">异步修改名字</button>

    <h2>------app内容:info对象的内容是否是响应式------</h2>
    <h2>{{ $store.state.info }}</h2>
    <button @click="updateInfo">修改信息</button>

    <h2>------app内容------</h2>
    <h2>{{ $store.state.counter }}</h2>
    <button @click="addition">+</button>
    <button @click="$store.commit('decrement')">-</button>
    <button @click="addCount(5)">+5</button>
    <button @click="addCount(10)">+10</button>
    <button
      @click="$store.commit('addStudent', { id: 114, name: 'hello', age: 666 })"
    >
      添加学生
    </button>

    <h2>------app内容:getters相关信息------</h2>
    <h2>{{ $store.getters.powerCounter }}</h2>
    <h2>{{ $store.getters.more20stu }}</h2>
    <h2>{{ $store.getters.more20stuLength }}</h2>
    <h2>{{ $store.getters.moreAgeStu(8) }}</h2>

    <h2>------Hello Vuex内容------</h2>
    <hello-vuex />
  </div>
</template>

<script>
import HelloVuex from "./views/HelloVuex.vue";
// import * as types from ''
import { INCREMENT } from "./store/mutation-types";
export default {
  components: { HelloVuex },
  name: "App",
  data() {
    return {};
  },
  computed: {
    // more20Stu() {
    //   return this.$store.state.students.filter(s => s.age > 20)
    // },
  },
  methods: {
    addition() {
      this.$store.commit(INCREMENT);
    },
    addCount(count) {
      // this.$store.commit('incrementCount',count)
      this.$store.commit({
        type: "incrementCount",
        count,
      });
    },
    updateInfo() {
      // this.$store.commit("updateInfo");
      // this.$store.dispatch('aUpdateInfo',{
      //   message:'我是携带的信息',
      //   success:()=> {
      //     console.log('里面已经完成了');
      //   }
      // })
      this.$store.dispatch('aUpdateInfo','我是携带的信息').then(res => {
        console.log('里面完成了提交');
        console.log(res);
      })
    },
    updateName(){
      this.$store.commit('updateName','lissssi')
    },
    asyncUpdateName(){
      this.$store.dispatch('aUpdateName')
    }
  },
};
</script>

<style></style>
