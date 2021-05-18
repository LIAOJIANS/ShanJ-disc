<template>
  <div class="function-bar dispaly-center">
    <ul class="dispaly-center pt-1 pb-1 f1">
      <li v-show="currentPath" class="ml-1" @click="goBackFolder">返回上个文件夹</li>
      <li class="ml-1" @click="uploadFile"><p><i class="el-icon-upload2" />上传</p></li>
      <li class="ml-1" @click="dowFile"><p><i class="el-icon-download" />下载</p></li>
      <li class="ml-1" @click="shareFile"><p><i class="el-icon-share" />分享</p></li>
      <li class="ml-1" @click="delFile"><p><i class="el-icon-delete" />删除</p></li>
      <li class="ml-1" @click="newFileJia"><p><i class="el-icon-folder-add" />新建文件夹</p></li>
    </ul>
    <div class="switch-mode mr-3">
      <i v-if="mode" class="el-icon-s-fold" @click="patternChange" />
      <i v-else class="el-icon-menu" @click="patternChange" />
    </div>

    <Mark :is-show="isShow">
      <div class="upload p2">
        <p class="header-title mb-2">
          <span class="f1">文件上传</span>
          <span class="el-icon-close" @click="isShow = false" />
        </p>
        <file-upload />
      </div>
    </Mark>
  </div>
</template>

<script>
import Mark from '../../../components/Mark/Mark'
import FileUpload from './fileUpload'
import { fomartPath } from '@/utils/FileTool'
export default {
  name: 'FunctionColumn',

  components: {
    Mark,
    FileUpload
  },

  props: {
    mode: Boolean
  },

  data() {
    return {
      isShow: false
    }
  },

  computed: {
    currentPath() {
      return this.$store.getters.fileCurrentPath.split('/').length > 1
    }
  },

  methods: {
    goBackFolder() {
      const storeState = this.$store.getters
      const folderPath = storeState.fileCurrentPath.split('/')
      this.currentPath && (folderPath.length = folderPath.length - 1)
      const path = fomartPath(folderPath)
      this.$store.dispatch('setBackPath', {
        path,
        u_id: storeState.userInfo.u_id
      }).then(list => {
        this.$emit('groudList', list)
      })
    },

    patternChange() {
      this.$emit('patternChange')
    },

    newFileJia() {
      this.$emit('newFileJia')
    },

    delFile() {
      this.$emit('delFile')
    },

    shareFile() {
      this.$emit('shareFile')
    },

    dowFile() {
      this.$emit('dowFile')
    },

    uploadFile() {
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/scss/index";

  .function-bar {
    background: #f9fafb;
    @include border-bottom(#f0f0f0);

    li {
      cursor: pointer;
      padding: 8px 10px;
      max-height: 52px;

    }

    li:hover {

      i, p {
        color: #1ed0ff;

      }
    }

   li {
      p {
        color: #333;
        font-size: 14px;
      }
    }

    i {
      color: #333;
      font-size: 16px;
      margin-right: 5px;

    }

  }

  .header-title {
    @include dispaly-flex();
    span:nth-child(1) {
      @include text-center(16px, #666);
    }
    span:nth-child(2) {
      cursor: pointer;
    }
  }

  .switch-mode {
    i {
      cursor: pointer;
      font-size: 22px;
    }
  }
</style>
