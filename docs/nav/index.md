---
layoutClass: m-nav-layout
outline: [2, 3, 4]
---

<script setup>
import MNavLinks from './components/MNavLinks.vue'

import { NAV_DATA } from './data'
</script>
<style src="./index.scss"></style>

# 前端导航

<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>

<br />

::: tip
该页面内容参考自 [maomao](https://github.com/maomao1996) 的导航页面，感谢其开发和分享。原页面链接：[https://github.com/maomao1996/vitepress-nav-template](https://github.com/maomao1996/vitepress-nav-template)
:::
