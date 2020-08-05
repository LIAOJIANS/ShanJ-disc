<template>
  <div>
    <div class="list dispaly-center pr-2 pl-2 pt-1 pb-1" v-for="(file, index) in list" :key="index">
      <img src="../../assets/images/zip.png" alt="">
      <p class="file-detal ml-3">
        <span>1321</span>
        <span class="size"> 0B / 1.93GB </span>
      </p>
      <p class="dow-spe">
        138.6kb/s
      </p>
      <div class="fun-btn f1">
        <span :class="dowClass(file.fileId)" @click="funDow(file)"></span>
        <span class="el-icon-circle-close" @click="delFile"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DownloadList",
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
  
  methods: {
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
