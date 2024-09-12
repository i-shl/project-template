import { createApp } from "vue";
import './styles/index.scss'
import App from "./App.vue";

const app = createApp(App);

// 路由
import router from "./router";
app.use(router);

// 状态
import { createPinia } from "pinia";
import createPersistedState from "pinia-plugin-persistedstate";
const pinia = createPinia();
pinia.use(createPersistedState);
app.use(pinia);

// 组件库
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import 'element-plus/theme-chalk/dark/css-vars.css'
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
app.use(ElementPlus, { locale: zhCn, size: "small", zIndex: 3000 });
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 暗黑模式
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)

app.mount("#app");
