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
        <el-menu-item index="4">找资源</el-menu-item>
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
  import { goRouter } from '../../../../utils/publicTool'
  const routerBox = ['/', '/transfer']
  export default {
    name: "IndexRight",
    data() {
      return {
        activeIndex: '1'
      }
    },

    mounted() {
      this.routingLocation(this.$route)
    },

    watch: {
      $route(to) {
       this.routingLocation(to)
      }
    },

    methods: {

      routingLocation(router) {
        this.activeIndex = (routerBox.indexOf(router.path) + 1).toString()
      },

      handleSelect(key) {
        switch (key) {
          case '1':
            goRouter(this, '/')
            break
          case '2':
            goRouter(this, '/transfer')
            break
          case '3':
            goRouter(this, '/text')
            break
          case '4':
            goRouter(this, '/search')
            break
        }
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
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
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
