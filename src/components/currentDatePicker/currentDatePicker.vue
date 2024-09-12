<template>
  <div class="currentDatePicker">
    <el-date-picker
      style="width: calc(50% - 10px)"
      v-model="startDateValue"
      type="date"
      :size="size"
      :value-format="valueFormat"
      :format="format"
      :placeholder="startPlaceholder"
      :disabled-date="startPickerOptions">
    </el-date-picker>
    <span>{{ rangeSeparator }}</span>
    <el-date-picker
      style="width: calc(50% - 10px)"
      v-model="endDateValue"
      type="date"
      :size="size"
      :value-format="valueFormat"
      :placeholder="endPlaceholder"
      :disabled-date="endPickerOptions">
    </el-date-picker>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, toRefs, watch } from 'vue'

const props = defineProps({
  // 尺寸
  size: {
    type: String,
    default: 'default'
  },
  // 开始日期
  startDate: {
    type: String,
    default: ''
  },
  // 结束日期
  endDate: {
    type: String,
    default: ''
  },
  // 开始日期非范围选择时的占位内容
  startPlaceholder: {
    type: String,
    default: '开始日期'
  },
  // 结束日期非范围选择时的占位内容
  endPlaceholder: {
    type: String,
    default: '结束日期'
  },
  // 数据格式
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  // 文本格式
  format: {
    type: String,
    default: 'YYYY-MM-DD'
  },
  // 选择范围时的分隔符
  rangeSeparator: {
    type: String,
    default: '~'
  }
})

const {
  size,
  startDate,
  endDate,
  startPlaceholder,
  endPlaceholder,
  valueFormat,
  format,
  rangeSeparator
} = toRefs(props)

const emits = defineEmits(['update:startDate', 'update:endDate'])

// 开始日期
const startDateValue = ref('')
// 结束日期
const endDateValue = ref('')

// 开始时间不能大于结束时间
const startPickerOptions = (time) => {
  if (startDateValue.value) {
    emits('update:startDate', startDateValue.value)
  } else {
    emits('update:startDate', '')
  }
  if (endDateValue.value) {
    return time.getTime() >= new Date(endDateValue.value).getTime()
  }
}
// 结束时间不能小于开始时间
const endPickerOptions = (time) => {
  if (endDateValue.value) {
    emits('update:endDate', endDateValue.value)
  } else {
    emits('update:endDate', '')
  }
  if (startDateValue.value) {
    return time.getTime() <= new Date((new Date(startDateValue.value) - 60 * 60 * 1000 * 24)).getTime()
  }
}

// 监听开始时间
watch(startDate, (newVal) => {
  startDateValue.value = newVal
}, {
  deep: true,
  immediate: true
})

// 监听结束时间
watch(endDate, (newVal) => {
  endDateValue.value = newVal
}, {
  deep: true,
  immediate: true
})
</script>

<style scoped lang="scss">
.currentDatePicker {
  width: 100%;

  span {
    display: inline-block;
    width: 20px;
    text-align: center;
  }
}
</style>
