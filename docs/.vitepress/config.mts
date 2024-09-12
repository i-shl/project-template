import { defineConfig } from "vitepress";
import { nav, sidebar } from "./configs";

export default defineConfig({
  title: "title",
  description: "description",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    siteTitle: "siteTitle",
    logo: "/logo.png",
    nav,
    sidebar,
    socialLinks: [{ icon: "github", link: "https://github.com/i-shl" }],
    search: {
      provider: "local",
    },
    outline: {
      level: "deep",
      label: "本页目录",
    },
    darkModeSwitchLabel: "外观",
    returnToTopLabel: "返回顶部",
    lastUpdatedText: "上次更新",
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
});
