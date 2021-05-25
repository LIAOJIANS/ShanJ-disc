<template>
  <div>
    <el-progress
      :show-text="text"
      :text-inside="inside"
      :stroke-width="width"
      :percentage="percentage"
    />
  </div>
</template>

<script>
export default {
  name: 'ProgressList',

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
