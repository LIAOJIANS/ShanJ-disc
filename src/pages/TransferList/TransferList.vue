<template>
  <div class="">
    <div class="progress-bar dispaly-flex pl-2 pr-2 pb-1 pt-1">
      <span class="pr-1">下载总进度</span>
      <div class="f1">
        <progress-list :percentage="30" :text="true" />
      </div>
      <div class="fun-btn" style="margin-left: 150px;">
        <el-button size="mini">全部开始</el-button>
        <el-button size="mini">全部取消</el-button>
      </div>
    </div>

    <div class="dow-list">
      <download-list :list="list" />
    </div>
  </div>
</template>

<script>
import ProgressList from "../../components/progress/progress";
import DownloadList from '../../components/DownloadList/DownloadList'
export default {
  name: "Transfer-List",

  components: {
    ProgressList,
    DownloadList
  },

  data() {
    return {
      list: [
        {
          fileId: 1,
          type: 'zip',
          fileName: '人妻',
          size: 1024 * 1000
        },
        {
          fileId: 2,
          type: 'mp3',
          fileName: '人妻',
          size: 1024 * 1000
        },
        {
          fileId: 3,
          type: 'word',
          fileName: '人妻',
          size: 1024 * 1000
        },
        {
          fileId: 4,
          type: 'avi',
          fileName: '人妻',
          size: 1024 * 1000
        },
        {
          fileId: 5,
          type: 'ptf',
          fileName: '人妻',
          size: 1024 * 1000
        }
      ]
    }
  },

  created() {
    console.log('列表')
  }
}
</script>

<style lang="scss" scoped>
.progress-bar {
  border-bottom: 1px solid #EBEBEB;
  span {
    font-size: 14px;
    color: #3C6889;
  }
}
</style>
