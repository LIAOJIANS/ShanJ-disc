<template>
  <div class="index-page">
    <index-right />
    <index-left />
    <div class="content">
      <div class="function-bar">
        <ul class="dispaly-center pt-1 pb-1">
          <li class="ml-1"><p><i class="el-icon-upload2"></i>上传</p></li>
          <li class="ml-1"><p><i class="el-icon-download"></i>下载</p></li>
          <li class="ml-1"><p><i class="el-icon-share"></i>分享</p></li>
          <li class="ml-1"><p><i class="el-icon-delete"></i>删除</p></li>
          <li class="ml-1"><p><i class="el-icon-folder-add"></i>新建文件夹</p></li>
        </ul>
      </div>
      <div class="my-disc dispaly-center p1">
        <ul class="dispaly-center mr-2 pr-2">
          <li class="pl-1"><span class="el-icon-arrow-left"></span></li>
          <li class="pl-1"><span class="el-icon-arrow-right"></span></li>
          <li class="pl-1"><span class="el-icon-refresh-right"></span></li>
        </ul>
        <ul>
          <li class="dispaly-center">我的网盘<span class="el-icon-arrow-right" style="font-size: 14px; padding-left: 5px;"></span></li>
        </ul>
      </div>
      <div class="document-content">
        <div class="content-box">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import IndexLeft from '@/components/IndexLeft/IndexLeft'
  import IndexRight from '@/components/IndexRight/IndexRight'
  export default {
    name: "Index",
    data(){
      return {
        file: {}, //上传的文件对象
        progressBar: 0 // 记录上传进度的变量
      }
    },

    components: {
      IndexLeft,
      IndexRight
    }
  }
</script>

<style lang="scss" scoped>
  .index-page {
    /*margin-left: 200px;*/
  }
  .content {
    margin-left: 200px;
    height: 100%;
  }
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
      i,p {
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
  .my-disc {
    border-bottom: 1px solid #f0f0f0;
    li {
      font-size: 14px;
    }
    span {
      font-size: 16px;
    }
    ul:nth-of-type(1) {
      border-right: 1px solid #e4e4e4;
    }
  }
</style>
