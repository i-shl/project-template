import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/login.vue"),
    meta: { title: "登录" },
  },
  {
    path: "/index",
    name: "Index",
    component: () => import("@/views/index/index.vue"),
    meta: { title: "首页" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
