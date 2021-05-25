<template>
  <div class="index-left">
    <el-menu
      :default-active="activeIndex"
      :default-openeds="['2']"
      class="el-menu-vertical-demo"
      background-color="#F9FAFB"
      @select="handleSelect"
      @open="handleOpen"
    >
      <template v-for="item in navList">
        <component
          :is="(item.children && item.children.length > 0)
            ? 'el-submenu' : 'el-menu-item'"
          :key="item.key"
          :index="item.key"
        >
          <template slot="title">
            <i :class="item.icon" />
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-if="item.children&&item.children.length>0">
            <el-menu-item-group>
              <el-menu-item
                v-for="itemChild in item.children"
                :key="itemChild.key"
                :index="itemChild.key"
              >{{ itemChild.title }}</el-menu-item>
            </el-menu-item-group>
          </template>
        </component>
      </template>
    </el-menu>
  </div>
</template>

<script>
import config from '@/utils/config'
import { goRouter } from '@/utils/publicTool'
import { fileTypeFilter } from '@/utils/FileTool'
const { transfer, home } = config
export default {
  name: 'IndexLeft',

  data() {
    return {
      activeIndex: '1',
      navList: []
    }
  },

  watch: {
    $route(to) {
      this.navChange(to.name)
    }
  },

  created() {
    this.navChange(this.$route.name)
  },

  methods: {
    navChange(name) {
      switch (name) {
        case 'Index':
          this.navList = home
          this.activeIndex = localStorage.getItem('activeIndex')
          this.handleSelect(this.activeIndex)
          break
        case 'TransferList':
          this.navList = transfer
          break
        case 'CompleteTransfer':
          this.navList = transfer
          break
        default:
          this.navList = home
          break
      }
    },

    handleOpen(key) {
      this.handleSelect(key)
    },

    handleSelect(key) {
      localStorage.setItem('activeIndex', key)
      switch (key) {
        case '1':
          this.isDow() ? goRouter(this, '/') : goRouter(this, '/transfer')
          this.$store.dispatch('getFileList', this.$store.getters.userInfo.u_id)
          break
        case '2':
          this.isDow() ? this.fileFiltering(key) : goRouter(this, '/transfer')
          break
        case '3':
          this.isDow() ? goRouter(this, '/hide') : goRouter(this, '/complete-transfer')
          break
        case '4':
          goRouter(this, '/share')
          break
        case '5':
          goRouter(this, '/recycle')
          break
        default:
          this.fileFiltering(key)
          break
      }
    },

    isDow() {
      const fullPath = this.$route.fullPath
      return fullPath !== '/transfer' && fullPath !== '/complete-transfer'
    },

    fileFiltering(key) {
      goRouter(this, '/')
      switch (key) {
        case '2-1':
          fileTypeFilter(['jpg', 'jpeg', 'png', 'gif'])
          break
        case '2-2':
          fileTypeFilter(['avi'])
          break
        case '2-3':
          fileTypeFilter(['word'])
          break
        case '2-4':
          fileTypeFilter(['excel'])
          break
        case '2-5':
          fileTypeFilter(['mp3', 'mp4'])
          break
        case '2-6':
          console.log(key)
          fileTypeFilter('qita')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.index-left {
  position: fixed;
  top: 80px;
  left: 0;
  bottom: 0;
  width: 200px;
  background: #F9FAFB;
  border-right: 1px solid #ccc;
  z-index: 1;
}
.el-submenu .el-menu-item {
  border-right: 1px solid #ccc;
}
</style>
