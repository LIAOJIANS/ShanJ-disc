<template>
  <div class="index-right dispaly-center">
    <div class="logo">
      <span>logo</span>
    </div>
    <div class="muen f1 ml-3">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#EEF0F6"
        active-text-color="#409eff">
        <el-menu-item index="1">我的网盘</el-menu-item>
        <el-menu-item index="2">传输列表</el-menu-item>
        <el-menu-item index="3">分享空间</el-menu-item>
        <el-menu-item index="4">功能宝箱</el-menu-item>
        <el-menu-item index="5">找资源</el-menu-item>
      </el-menu>
    </div>
    <div class="user-info dispaly-center">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      <p class="ml-1 mr-1">彭海杰</p>
      <el-button type="text" style="color: red">注销</el-button>
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

<style lang="scss">
.index-right {
  width: 100%;
  height: 80px;
  background: #EEF0F6;
  border-bottom: 1px solid #ccc;
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

.muen {
  width: 500px;
  overflow-x: auto;
  ul {
    white-space: nowrap;
  }
}

.user-info {
  width: 30%;
}
.el-menu.el-menu--horizontal {
  border: none!important;
}
.muen .el-menu-item:focus, .el-menu-item:hover {
  background: transparent!important;
}
</style>
