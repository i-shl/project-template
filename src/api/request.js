import Vue from "vue";
import axios from "axios";
import { baseURL } from "../config";

const instance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
});

// 处理同时多个加载时在请求完成再进行取消loading的状态
let reqNum = 0;
function showLoading() {
  Vue.prototype.$showLoading();
  reqNum++;
}
function hideLoading() {
  reqNum--;
  if (reqNum <= 0) {
    Vue.prototype.$hideLoading();
  } else {
    Vue.prototype.$showLoading();
  }
}

instance.interceptors.request.use(
  (config) => {
    // let token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = token;
    // }
    showLoading();
    return config;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    hideLoading();
    return res;
  },
  (error) => {
    hideLoading();
    return Promise.reject(error);
  }
);

export default instance;
