<template>
  <div class="down-page">
    <!--  <template v-if="$root.downFiles.length>0"> -->
    <div v-if="$route.name !== 'CompleteTransfer'" class="down-card">
      <template v-if="$root.downFiles.length > 0">
        <div v-for="(file,index) in $root.downFiles" :key="index" class="file-item dispaly-center pr-2 pl-1 pt-1 pb-1">
          <img :src="fType(file)" alt="">
          <div class="down-content ml-2">
            <span class="dow_title">{{ file.f_name }}</span>
            <div class="dispaly-center">
              <div class="file-info dispaly-center pt-1 pb-1">
                <div class="file-size">文件大小：{{ file.f_size | byte }}</div>
                <div v-if="file.state === 'downing'" class="pl-3">下载速度：{{ file.speedBytes | byte }}/s</div>
                <div v-if="file.state === 'wait'" class="pl-3">等待中</div>
                <div v-else class="pl-3">已下载：{{ file.offset | byte }}</div>
              </div>
              <div class="opt" style="padding-left: 150px; font-size: 16px">
                <div class="el-icon-close" @click="handleClose(file)" />
                <div
                  v-if="['paused', 'interrupted'].includes(file.state)"
                  class="el-icon-video-play pl-2"
                  @click="handleResume(file)"
                />
                <div
                  v-if="file.state === 'downing'"
                  class="el-icon-video-pause pl-2"
                  @click="handlePaused(file)"
                />
              </div>
            </div>
            <el-progress :status="file.state | state" :percentage="file.progress" />
          </div>
        </div>
      </template>
      <template v-else>
        <div class="empty">任务队列已经空空如也~</div>
      </template>
    </div>

    <div v-else>
      <div
        v-for="(file, index) in downDoneFiles"
        :key="index"
        class="list dispaly-center pr-2 pl-1 pt-1 pb-1"
        l@click="handleOpen(file.path)"
      >
        <img :src="fType(file)" alt="">
        <div class=" ml-2">
          <span>{{ file.fileName || file.f_name }}</span>
          <div class="dispaly-center">
            <span class="size">{{ file.f_size | byte }}</span>
            <span class="size pl-1">地址：{{ file.path }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* const dataJs = {
        id: '唯一值',
        url: '下载路径',
        size: '',
        progress: '下载进度',
        speedBytes: '速度（b)',
        state: '下载实时状态',
        done: '下载状态',
        //恢复下载数据
        urlChain: ['下载地址数组'],
        offset: '已下载偏移量',
        length: '总长度',
        lastModified: '文件服务端最后修改时间',
        eTag: '标示',
        startTime: 'UNIX 下载时间'
    } */
import { pause, resume, nextresume, cancel } from '@/utils/FileTool'
// eslint-disable-next-line no-undef
const { ipcRenderer } = __non_webpack_require__('electron')
import { fileType } from '../../utils/publicTool'

export default {
  name: 'DownloadPage',
  filters: {
    state(val) {
      if (['cancelle', 'interrupted-err'].includes(val)) {
        return 'exception'
      // eslint-disable-next-line brace-style
      }
      // 暂停 - 或者可恢复
      else if (['paused', 'interrupted'].includes(val)) {
        return 'warning'
      } else if (['completed'].includes(val)) {
        return 'success'
      }
    }
  },

  data() {
    return {
      downDoneFiles: []
    }
  },

  computed: {
    fType() {
      return (file) => {
        const fileName = file.f_name || file.fileName
        return fileType(fileName)
      }
    }
  },

  created() {
    console.log(this.$store.getters)
    this.downDoneFiles = this.$store.getters.fileList.filter(c => c.f_transfer_state).map(c => (
      {
        ...c,
        path: this.$root.downDoneFiles.find(z => z.f_id === c.f_id).path
      }
    ))
  },

  methods: {
    // 暂停
    handlePaused(file) {
      pause(file.f_dow_url)
    },

    // 恢复下载  恢复断点下载
    handleResume(file) {
      if (file.state === 'paused') {
        resume(file.f_dow_url)
      } else {
        nextresume(file)
      }
    },

    // 取消下载
    handleClose(item, type = true) {
      // 取消下载任务
      if (item.state !== 'completed') {
        cancel(item.f_dow_url)
      }
      // 删除列表
      this.$root.removeDownFile(item.f_id, type)
    },

    handleOpen(path) { // 打开图片路径
      if (path !== undefined) {
        ipcRenderer.send('check_path', { path })
        ipcRenderer.once(`check_path${path}`, (e, err) => {
          err && this.$message({ message: '文件不存在', type: 'error', duration: 2000 })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .down-card {
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
  }
  .empty {
    color: #a5a5a5;
    text-align: center;
  }

</style>
<style lang="scss" scoped>

  .list {
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    &:hover {
      background: #F1F3F7;
    }
    img {
      width: 22px;
    }
  }

  .dow-spe {
    width: 30%;
    font-size: 14px;
    color: #999;
  }

  .file-detal {
    width: 50%;
    font-size: 16px;
    color: #666;
  }

  .size {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    color: #999;
  }

  .el-icon-delete-solid {
    font-size: 18px;
    color: #999;
  }

  .fun-btn {
    span {
      font-size: 22px;
      color: #666;
      cursor: pointer;
    }
    .el-icon-circle-close {
      padding-left: 50px;
    }
  }
</style>
