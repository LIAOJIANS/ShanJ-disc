<template>
  <div class="index-left">
    <el-menu
      :default-active="activeIndex"
      :default-openeds="['2']"
      class="el-menu-vertical-demo"
      background-color="#F9FAFB"
      @open="handleOpen"
      @close="handleClose">
      <el-menu-item index="1">
        <i class="el-icon-time"></i>
        <span slot="title">最近文件</span>
      </el-menu-item>
      <el-submenu index="2" >
        <template slot="title">
          <i class="el-icon-tickets"></i>
          <span>全部文件</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">图片</el-menu-item>
          <el-menu-item index="1-2">视频</el-menu-item>
          <el-menu-item index="1-3">文档</el-menu-item>
          <el-menu-item index="1-4">音乐</el-menu-item>
          <el-menu-item index="1-5">种子</el-menu-item>
          <el-menu-item index="1-6">其他</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-lock"></i>
        <span slot="title">隐藏空间</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-share"></i>
        <span slot="title">我的分享</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-delete"></i>
        <span slot="title">回收站</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "IndexLeft",
    data() {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
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
