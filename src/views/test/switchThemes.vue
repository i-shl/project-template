<template>
  <el-row class="mb-4">
    <el-button type="primary" @click="handleChangeDark">切换</el-button>
  </el-row>
  <div>
    这是一个切换主题的demo
  </div>
</template>

<script setup>
import { useDark, useToggle } from "@vueuse/core";
const isDark = useDark();
const toggleDark = useToggle(isDark);
const handleChangeDark = () => {
  toggleDark();
};
</script>
