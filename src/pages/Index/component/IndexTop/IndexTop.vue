<template>
  <div>
    <div class="index-right">
      <func-tool />
      <div class="dispaly-center">
        <div class="logo">
          <span>logo</span>
        </div>
        <div class="muen f1 ml-3">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#EEF0F6"
            active-text-color="#409eff"
            @select="handleSelect"
          >
            <el-menu-item index="1">我的网盘</el-menu-item>
            <el-menu-item index="2">传输列表</el-menu-item>
            <el-menu-item index="3">分享空间</el-menu-item>
            <el-menu-item index="4">找资源</el-menu-item>
          </el-menu>
        </div>
        <div class="user-info dispaly-center">
          <el-avatar :src="userInfo.u_pic" />
          <p class="ml-1 mr-1">{{ userInfo.u_name }}</p>
          <el-button type="text" style="color: red" @click="logout">注销</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { goRouter } from '../../../../utils/publicTool'
import FuncTool from '@/components/funcTool/funcTool'
const routerBox = ['/', '/transfer']
export default {
  name: 'IndexRight',

  components: { FuncTool },

  data() {
    return {
      activeIndex: '1'
    }
  },

  computed: {
    userInfo() {
      return this.$store.getters.userInfo
    }
  },

  watch: {
    $route(to) {
      this.routingLocation(to)
    }
  },

  mounted() {
    this.routingLocation(this.$route)
  },

  methods: {
    routingLocation(router) {
      this.activeIndex = router.path === '/complete-transfer' ? '2' : (routerBox.indexOf(router.path) + 1).toString()
    },

    logout() {
      this.$store.dispatch('resetToken').then(() => {
        location.reload()
      })
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
          goRouter(this, '/share')
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
  height: 50px;
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
