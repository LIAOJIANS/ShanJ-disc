<template>
  <div>
    <!-- <div class="down-title pt-1 pb-1 pr-2">
      <div />

    </div> -->
    <div class="progress-bar dispaly-flex pl-2 pr-2 pb-1 pt-1">
      <!-- <span class="pr-1">下载总进度</span>
      <div class="f1">
        <progress-list :percentage="0" :text="true" />
      </div> -->
      <p class="down-title">
        <span class="path" v-text="path" />
        <span class="btn" @click="handleSetDownPath">修改下载目录</span>
      </p>
      <div class="fun-btn" style="margin-left: 150px;">
        <el-button size="mini">全部开始</el-button>
        <el-button size="mini">全部取消</el-button>
      </div>
    </div>
    <download-list v-if="$route.params.key === '1'" />
    <upload-list v-else />
  </div>
</template>

<script>
// import ProgressList from '../../components/progress/progress'
import DownloadList from '../../components/DownloadList/DownloadList'
import UploadList from './components/uploadList'
// eslint-disable-next-line no-undef
const { ipcRenderer } = __non_webpack_require__('electron')
export default {
  name: 'TransferList',

  components: {
    DownloadList,
    UploadList
  },

  data() {
    return {
      list: [],
      path: localStorage.getItem('downloads')
    }
  },
  methods: {

    handleSetDownPath() {
      ipcRenderer.send('set_path')
      ipcRenderer.once(`set_path`, (e, data) => {
        if (!data.canceled) {
          localStorage.setItem('downloads', data.filePaths[0])
          this.path = data.filePaths[0]
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>

.down-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .path {
    color: #a5a5a5;
    margin-right: 10px;
    text-decoration-line: underline;
  }
  .btn {
    color: #0081ff;
    cursor: pointer;
  }
}
.progress-bar {
  border-bottom: 1px solid #EBEBEB;
  border-top: 1px solid #EBEBEB;
  span {
    font-size: 14px;
    color: #3C6889;
  }
}
</style>
