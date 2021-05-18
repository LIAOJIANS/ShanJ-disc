<template>
  <div class="down-page">
    <!--  <template v-if="$root.downFiles.length>0"> -->
    <div class="down-card">
      <template v-if="$root.downFiles.length>0">
        <div v-for="(file,index) in $root.downFiles" :key="index" class="file-item">
          <div class="down-content">
            <div class="file-info">
              <div>文件名：{{ file.f_name }}</div>
              <div class="file-size">文件大小：{{ file.f_size | byte }}</div>
              <div v-if="file.state === 'downing'" class="file-speed">下载速度：{{ file.speedBytes | byte }}/s</div>
              <div v-if="file.state === 'wait'" class="file-offset">等待中</div>
              <div v-else class="file-offset">已下载：{{ file.offset | byte }}</div>
              <div class="clost-btn iconfont icon-guanbi" @click="handleClose(file)" />
              <div class="opt">
                <div v-if="['paused', 'interrupted'].includes(file.state)" class="iconfont icon-bofang" @click="handleResume(file)" />
                <div v-if="file.state === 'downing'" class="iconfont icon-zanting" @click="handlePaused(file)" />
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

    <div>
      <div v-for="(file, index) in $root.downFiles" :key="index" class="list dispaly-center pr-2 pl-2 pt-1 pb-1">
        <img :src="fType(file)" alt="">
        <p class="file-detal ml-3">
          <span>{{ file.fileName || file.f_name }}</span>
          <span v-if="file.sloaded" class="size"> {{ file.sloaded }} / {{ file.fileSize }} </span>
          <span v-else class="size">{{ file.f_size | byte }}</span>
        </p>
        <div v-if="file.state === 'downing'" class="file-speed">下载速度：{{ file.speedBytes | byte }}/s</div>
        <div v-if="file.state === 'wait'" class="file-offset">等待中</div>
        <!-- <p v-if="file.uploadSpeed" class="dow-spe">
          {{ file.uploadSpeed }}
        </p>
        <p v-else class="el-icon-delete-solid" @click="addhisStory(file.f_id, file.f_name)" /> -->
        <div class="fun-btn f1">
          <!-- <span v-show="!file.f_name" :class="dowClass(file.fileId)" @click="funDow(file)" />
          <span v-show="!file.f_name" class="el-icon-circle-close" @click="handlePaused(file)" /> -->
          <span v-if="file.state === 'downing'" class="el-icon-video-pause" @click="handlePaused(file)" />
          <span v-else class="el-icon-video-play" @click="handleResume" />
          <span v-show="!file.f_name" class="el-icon-circle-close" @click="handleClose(file)" />
        </div>
      </div>
    </div>
    <!-- <div v-if="$root.downDoneFiles.length>0" class="down-card" @click="handleOpen">
      <h2 class="title">已完成</h2>
      <div v-for="(file,index) in $root.downDoneFiles" :key="index" class="file-item">
        <div class="end-content">
          <div class="file-time">{{ file.downloadtime }}</div>
          <div class="file-resolution">尺寸：{{ file.resolution }}</div>
          <div class="file-size">大小：{{ file.size | byte }}</div>
          <div class="file-path">地址：{{ file.path }}</div>
          <div class="clost-btn iconfont icon-guanbi" @click="handleClose(file,false)" />
        </div>
      </div>
    </div> -->
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
  methods: {
    fType(file) {
      const fileName = file.f_name || file.fileName
      return fileType(fileName)
    },
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
        cancel(item.url)
      }
      // 删除列表
      this.$root.removeDownFile(item.id, type)
    },
    // 打开图片路径
    handleOpen(event) {
      const path = event.target.dataset.path
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
    .down-page {
        padding: 20px 100px;
        height: 100%;
        overflow-y: auto;
        box-sizing: border-box;
        .down-card {
            .title {
                color: #a7a7a7;
                margin: 10px;
            }

            .file-item {
                border-radius: 3px;
                position: relative;
                display: flex;
                background-color: #7eb0da30;
                color: #fff;

                + .file-item {
                    margin-top: 30px;
                }

                .file {
                    file {
                        width: 120px;
                        height: 80px;
                        display: block;
                    }
                }

                //
                .down-content {
                    flex: 1;
                    padding: 0 20px;

                    .file-info {
                        height: 60px;
                        position: relative;

                        > div {
                            font-size: 14px;
                            color: rgb(173, 173, 173);
                            position: absolute;
                        }

                        .file-resolution {
                            top: 10px;
                            left: 0;
                        }

                        .file-size {
                            bottom: 5px;
                            left: 0px;
                        }
                        .file-speed {
                            bottom: 5px;
                            right: 160px;
                        }
                        .file-offset {
                            bottom: 5px;
                            right: 35px;
                        }
                        .opt {
                            position: absolute;
                            display: flex;
                            top: 0px;
                            right: 30px;
                            padding: 5px;

                            div {
                                font-size: 20px !important;
                            }
                        }

                        .clost-btn {
                            position: absolute;
                            top: 5px;
                            padding: 5px;
                            right: 0;
                        }
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

                //
                .end-content {
                    color: #aaaaaa;
                    padding: 0 20px;
                    div {
                        position: absolute;
                        font-size: 14px;
                    }

                    .file-time {
                        top: 20px;
                    }
                    .file-size {
                        top: 50px;
                        left: 280px;
                    }
                    .file-path {
                        top: 50px;
                        left: 410px;
                        width: 600px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                    }
                    .file-resolution {
                        top: 50px;
                    }
                    .clost-btn {
                        top: 25px;
                        right: 20px;
                        padding: 5px;
                    }
                }
            }

            .empty {
                color: #a5a5a5;
                text-align: center;
            }

            + .down-card {
                margin-top: 30px;
            }
        }
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
