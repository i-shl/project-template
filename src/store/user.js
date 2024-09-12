import { defineStore } from "pinia";

// defineStore 第一个参数是id，必需且值唯一
const useUserStore = defineStore("user", {
  //state返回一个函数，防止作用域污染
  state: () => {
    return {
      userInfo: {
        name: "zhangsan",
        age: 23,
      },
      token: "S1",
    };
  },
  getters: {
    newName(state) {
      return state.userInfo.name + "vip";
    },
  },
  actions: {
    //更新整个对象
    updateUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    //更新对象中某个属性
    updateAge(age) {
      this.userInfo.age = age;
    },
    //更新基础数据类型
    updateToken(token) {
      this.token = token;
    },
  },
  // 开始数据持久化
  persist: true,
});

export default useUserStore;
