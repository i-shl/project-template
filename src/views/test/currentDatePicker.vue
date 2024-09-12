<template>
  <CurrentDatePicker
    v-model:startDate="search.createTimek"
    v-model:endDate="search.createTimeend"
  ></CurrentDatePicker>
</template>

<script setup>
import CurrentDatePicker from "@/components/currentDatePicker/currentDatePicker.vue";
</script>

<style lang="scss" scoped></style>
