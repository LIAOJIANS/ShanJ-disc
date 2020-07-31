<template>
  <div>
    <el-progress
        :show-text="text"
        :text-inside="inside"
        :stroke-width="width"
        :percentage="percentage"
    ></el-progress>
  </div>
</template>

<script>
export default {
  name: "progress-list",

  props: {
    text: {
      type: Boolean,
      default: false
    },
    inside: {
      type: Boolean,
      default: true
    },
    width: {
      type: Number,
      default: 16
    },
    percentage: Number
  }
}
</script>

<style scoped>

</style>
