import request from "./request";

export const HomeApi = () => request.get("/index/index");
export const GoodshApi = (params) => request.get("/goods/list", params);
export const LoginApi = (params) => request.post("/auth/loginByWeb", params);

/* 
import { HomeApi, GoodshApi, LoginApi } from "../../api";

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
*/
