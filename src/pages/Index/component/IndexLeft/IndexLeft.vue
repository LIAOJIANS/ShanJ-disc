<template>
  <div class="index-left">
    <el-menu
      :default-active="activeIndex"
      :default-openeds="['2']"
      class="el-menu-vertical-demo"
      background-color="#F9FAFB"
      @select="handleSelect"
      @open="handleOpen"
      @close="handleClose">
      <template v-for="item in navList">
        <component
            :is="(item.children && item.children.length > 0)
            ? 'el-submenu' : 'el-menu-item'"
            :index="item.key"
            :key="item.key"
        >
          <template slot="title">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <template v-if="item.children&&item.children.length>0">
            <el-menu-item-group >
              <el-menu-item
                  v-for="itemChild in item.children"
                  :index="itemChild.key"
                  :key="itemChild.key"
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
  const { transfer, home } = config
  export default {
    name: "IndexLeft",

    data() {
      return {
        activeIndex: '1',
        navList: []
      }
    },

    created() {
      this.navChange(this.$route.name)
    },

    watch: {
      $route(to) {
        this.navChange(to.name)
      }
    },

    methods: {
      navChange(name) {
        switch (name) {
          case 'Index':
            this.navList = home
            break
          case 'TransferList':
            this.navList = transfer
            break
          default:
            this.navList = []
            break
        }
      },

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },

      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      handleSelect(key) {
        console.log(key)
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
