import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/login.vue"),
    meta: { title: "login" },
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("../views/index/index.vue"),
    meta: { title: "index" },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title; //动态改变浏览器标题
  next();
});

export default router;
