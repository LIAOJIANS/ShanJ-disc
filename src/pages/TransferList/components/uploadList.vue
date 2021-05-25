<template>
  <div>
    <template v-if="$store.getters.uploadInfo.length > 0">
      <div v-for="(file,index) in $store.getters.uploadInfo" :key="index" class="file-item dispaly-center pr-2 pl-1 pt-1 pb-1">
        <img :src="fType(file)" alt="">
        <div class="down-content ml-2">
          <span class="dow_title">{{ file.fileName }}</span>
          <div class="dispaly-center">
            <div class="file-info dispaly-center pt-1 pb-1">
              <div class="file-size">文件大小：{{ fileSize(file.fileSize) }}</div>
              <div class="pl-3">下载速度：{{ file.uploadSpeed }}/s</div>
            </div>

          </div>
          <el-progress :percentage="file.progressBar" />
        </div>
      </div>
    </template>

    <no-data v-else />
  </div>
</template>

<script>
import NoData from '@/components/NoData/NoData'
import { fileType } from '@/utils/publicTool'
export default {
  name: 'UploadList',

  components: {
    NoData
  },

  computed: {
    fType() {
      return (file) => {
        const fileName = file.f_name || file.fileName
        return fileType(fileName)
      }
    },
    fileSize() {
      return (fileSize) => {
        return fileSize / (1024 * 1024 * 1024) > 1
          ? `${(fileSize / (1024 * 1024 * 1024)).toFixed(2)} GB`
          : `${(fileSize / (1024 * 1024)).toFixed(2)} MB`
      }
    }
  },

  created() {
    console.log(this.$store.getters.uploadInfo)
  }

}
</script>
<style lang="scss" scoped>

  .file-item {
      font-size: 12px;
      color: #666;
      cursor: pointer;

      border-bottom: 1px solid #f0f0f0;

      &:hover {
        background: #F1F3F7;
      }

      img {
        width: 22px;
      }

      .down-content {
        flex: 1;

        .dow_title {
          font-size: 16px;
          font-weight: 400;
          color: #000;
        }

        /deep/ .el-progress {

          .el-progress-bar {
            padding-right: 0;
            margin-right: 0;
          }

          .el-progress__text {
            display: none;
          }
        }
      }

    }
</style>
