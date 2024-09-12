<template>
  <button @click="handleClick">点击调用 API</button>
  <div>{{ txt }}</div>
</template>

<script setup>
import { ref } from "vue";
import { test } from "@/api/index";

const txt = ref("改变前的内容");

const handleClick = async () => {
  const res = await test();
  txt.value = res;
};
</script>