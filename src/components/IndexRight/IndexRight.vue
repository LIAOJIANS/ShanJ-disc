<template>
  <div class="index-right dispaly-center">
    <div class="logo">
      <span>logo</span>
    </div>
    <div class="muen">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#EEF0F6">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-menu-item index="2">处理中心</el-menu-item>
        <el-menu-item index="3">消息中心</el-menu-item>
        <el-menu-item index="4">订单管理</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "IndexRight",
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang="scss" scoped>
.index-right {
  width: 100%;
  height: 80px;
  background: #EEF0F6;
}
.logo {
  position: relative;
  height: 80px;
  width: 200px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
