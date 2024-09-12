---
layout: home
layoutClass: "m-home-layout"

hero:
  name: "name"
  text: "text"
  tagline: text
  image:
    src: /logo.png
    alt: 头像
  actions:
    - theme: brand
      text: 前端物语
      link: /fe/feone
    - theme: alt
      text: 代码模块
      link: /codes/codesone
    - theme: brand
      text: 资源导航
      link: /nav/
    - theme: alt
      text: 个人主页
      link: https://www.baidu.com/

features:
  - icon: 📘
    title: 前端物语
    details: 拳打 Vue，脚踢 React
    link: /fe/feone
    linkText: 前端常用知识
  - icon: 📝
    title: 代码模块
    details: 记录日常零散代码片段
    link: /codes/codesone
    linkText: 各种零散代码片段
  - icon: 🛠
    title: 资源导航
    details: 一些日常使用的的网站和小工具
    link: /nav/
    linkText: 常用资源链接
  - icon: 🌈
    title: 吾志所向，一往无前。
    details: '<small class="bottom-small">山高路远，看世界、也找自己</small>'
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
