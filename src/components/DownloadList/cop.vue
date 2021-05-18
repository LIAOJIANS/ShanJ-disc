<template>
  <div>
    <div v-for="(file, index) in list" :key="index" class="list dispaly-center pr-2 pl-2 pt-1 pb-1">
      <img :src="fType(file)" alt="">
      <p class="file-detal ml-3">
        <span>{{ file.fileName || file.f_name }}</span>
        <span v-if="file.sloaded" class="size"> {{ file.sloaded }} / {{ file.fileSize }} </span>
        <span v-else class="size">{{ fileSize(file) }}</span>
      </p>
      <p v-if="file.uploadSpeed" class="dow-spe">
        {{ file.uploadSpeed }}
      </p>
      <p v-else class="el-icon-delete-solid" @click="addhisStory(file.f_id, file.f_name)" />
      <div class="fun-btn f1">
        <span v-show="!file.f_name" :class="dowClass(file.fileId)" @click="funDow(file)" />
        <span v-show="!file.f_name" class="el-icon-circle-close" @click="delFile" />
      </div>
    </div>
  </div>

</template>

<script>
import { fileType } from '../../utils/publicTool'
import { uploadHistory, delFile } from '@/api/file'
import { MessageBox } from 'element-ui'
export default {
  name: 'DownloadList',
  props: {
    list: {
      type: Array
    }
  },

  data() {
    return {
      currunIndexArr: []
    }
  },

  computed: {
    fileSize() {
      return (file) => {
        return file.f_size / (1024 * 1024 * 1024) > 1
          ? `${(file.f_size / (1024 * 1024 * 1024)).toFixed(2)} GB`
          : `${(file.f_size / (1024 * 1024)).toFixed(2)} MB`
      }
    }
  },

  methods: {
    fType(file) {
      const fileName = file.f_name || file.fileName
      return fileType(fileName)
    },

    dowClass(fileId) {
      return (this.currunIndexArr.includes(fileId)) ? 'el-icon-video-pause' : 'el-icon-video-play'
    },

    funDow(file) {
      const { currunIndexArr } = this
      currunIndexArr.includes(file.fileId)
        ? this.currunIndexArr.splice(currunIndexArr.indexOf(file.fileId), 1)
        : this.currunIndexArr = [...currunIndexArr, file.fileId]
    },

    delFile() {
      console.log('暂停')
    },

    addhisStory(fId, name) {
      const path = this.$route.path
      const msg = path === '/recycle' ? '此操作将永久删除该文件, 是否继续?' : '此操作将文件放进回收站，是否继续？'
      MessageBox.confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        path === '/recycle' ? this.realDelFile(fId, name) : this.historyDel(fId)
      }).catch(() => {
        console.log('取消')
      })
    },
    historyDel(fId) {
      uploadHistory(fId).then(res => {
        this.$message({ type: 'success', message: res.msg })
        this.$store.dispatch('getFileList', this.$store.getters.userInfo.u_id)
      })
    },
    realDelFile(fId, name) {
      const url = this.$store.getters.fileCurrentPath + '/' + name
      delFile(url, fId).then(res => {
        this.$message({ type: 'success', message: res.msg })
        this.$emit('getHistory')
      })
    }
  }
}
</script>

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
