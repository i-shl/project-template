import axios from "axios";
import { ElMessage } from 'element-plus'
// 引入状态管理等操作

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 5000,
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 根据接口请求数据格式更改 
    // let token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = token;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // 根据接口返回数据格式更改
    // const { data, code, message, other } = res.data
    // if (code === 200) {
    //   return {
    //     code,
    //     data,
    //     message,
    //     other
    //   }
    // } else {
    //   ElMessage.error(message)
    //   return Promise.reject(new Error(message))
    // }
    return res;
  },
  (error) => {
    ElMessage.error(error)
    return Promise.reject(error);
  }
);

export default instance;
