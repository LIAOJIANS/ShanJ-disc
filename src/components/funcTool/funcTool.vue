<template>
  <div class="dispaly-flex" style="height: 20px;">
    <div />
    <div class="exe-top">
      <span class="el-icon-minus" style="margin-right: 15px;" @click="TitleClick('min')" />
      <span class="el-icon-close" style="margin-right: 10px;" @click="TitleClick('close')" />
    </div>
  </div>
</template>

<script>

// eslint-disable-next-line no-undef
const { ipcRenderer } = __non_webpack_require__('electron')
export default {
  methods: {

    TitleClick(type) {
      ipcRenderer.send(type)
    }
  }
}
</script>

<style lang="scss">
  .exe-top {
    > span {
      cursor: pointer;

      font-size: 16px;
    }
  }
</style>
