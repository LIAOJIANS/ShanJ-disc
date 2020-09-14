<template>
  <div>
    <div class="list dispaly-center pr-2 pl-2 pt-1 pb-1" v-for="(file, index) in list" :key="index">
      <img :src="fType(file)" alt="">
      <p class="file-detal ml-3">
        <span>{{ file.fileName || file.f_name }}</span>
        <span class="size" v-if="file.sloaded"> {{ file.sloaded }} / {{ file.fileSize }} </span>
        <span class="size" v-else>{{ fileSize(file) }}</span>
      </p>
      <p class="dow-spe" v-if="file.uploadSpeed">
        {{ file.uploadSpeed }}
      </p>
      <p class="el-icon-delete-solid" v-else @click="addhisStory(file.f_id)"></p>
      <div class="fun-btn f1">
        <span :class="dowClass(file.fileId)" @click="funDow(file)" v-show="!file.f_name"></span>
        <span class="el-icon-circle-close" @click="delFile" v-show="!file.f_name"></span>
      </div>
    </div>
  </div>

</template>

<script>
import { fileType } from '../../utils/publicTool'
import { uploadHistory } from '@/api/file'
import { MessageBox } from 'element-ui'
export default {
  name: "DownloadList",
  props: {
    list: {
      type: Array
    }
  },
  
  computed: {
    fileSize() {
      return (file) => {
        return file.f_size / (1024 * 1024 * 1024) > 1
          ? `${(file.f_size / (1024 * 1024 * 1024)).toFixed(2) } GB` :
          `${ (file.f_size / (1024 * 1024)).toFixed(2) } MB`
      }
    }
  },
  
  data() {
    return {
      currunIndexArr: []
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
      currunIndexArr.includes(file.fileId) ?
        this.currunIndexArr.splice(currunIndexArr.indexOf(file.fileId), 1)
        : this.currunIndexArr = [...currunIndexArr, file.fileId]
    },

    delFile() {
      console.log('暂停')
    },

    addhisStory(fId) {
      MessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        uploadHistory(fId).then(res => {
          this.$message({ type: 'success', message: res.msg })
          this.$store.dispatch('getFileList', this.$store.getters.userInfo.u_id)
        })
      }).catch(() => {
        console.log('取消')
      });
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
