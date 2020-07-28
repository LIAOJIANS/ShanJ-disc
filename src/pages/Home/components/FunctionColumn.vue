<template>
  <div class="function-bar dispaly-center">
    <ul class="dispaly-center pt-1 pb-1 f1">
      <li class="ml-1"><p><i class="el-icon-upload2"></i>上传</p></li>
      <li class="ml-1"><p><i class="el-icon-download"></i>下载</p></li>
      <li class="ml-1"><p><i class="el-icon-share"></i>分享</p></li>
      <li class="ml-1"><p><i class="el-icon-delete"></i>删除</p></li>
      <li class="ml-1"><p><i class="el-icon-folder-add"></i>新建文件夹</p></li>
    </ul>
    <div class="switch-mode mr-3">
      <i class="el-icon-s-fold" v-if="mode" @click="patternChange"></i>
      <i class="el-icon-menu" v-else @click="patternChange"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "FunctionColumn",
  props: {
    mode: Boolean
  },

  methods: {
    patternChange() {
      this.$emit('patternChange')
    }
  }
}
</script>

<style lang="scss" scoped>
  .function-bar {
    background: #f9fafb;
    border-bottom: 1px solid #f0f0f0;

    li {
      cursor: pointer;
      padding: 8px 10px;
      max-height: 52px;

    }

    li:hover {
      border: 1px solid #1ed0ff;

      i, p {
        color: #1ed0ff;

      }
    }

    p {
      color: #333;
      font-size: 14px;

    }

    i {
      color: #333;
      font-size: 16px;
      margin-right: 5px;

    }

  }

  .switch-mode {
    i {
      cursor: pointer;
      font-size: 22px;
    }
  }
</style>
