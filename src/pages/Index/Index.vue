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
        <div class="content-box pl-2 pr-2 pt-1">
          <ul class="dispaly warp">
            <li class="wenjian-item pr-2 pl-2 pt-2 pb-1 text-center mt-1" v-for="item in 30" @keydow.ctrl="keyToSelect" :key="item">
              <i class="iconfont icon-wenjianjiaguanbi"></i>
              <p class="content-box-title mt-2">我收藏的小可爱</p>
            </li>
            <li class="add-upload dispaly-content-center mt-2">
              <p class="pr-2 pl-2 pt-2 pb-2">
                <i class="iconfont el-icon-plus"></i>
              </p>
            </li>
          </ul>
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

    methods: {
      keyToSelect(e) {
        console.log(e)
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
    height: 91%;
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
  .document-content {
    height: 89%;
    position: relative;
    overflow-y: auto;
  }
  .content-box {
    position: absolute;
    top: 0;
    left: 0;
    li {
      width: 10%;
      cursor: pointer;
    }

    .wenjian-item {
      &:hover {
        background: #F2FAFF;
      }
    }

    .add-upload p {
      width: 90px;
      height: 90px;
      border: 1px dashed #BBBBBB;
    }

    .el-icon-plus {
      font-size: 48px;
      color: #BBBBBB;
    }

    .icon-wenjianjiaguanbi {
      font-size: 60px;
      color: #F8C92A;
    }
    .content-box-title {
      font-size: 14px;
      color: #666;
    }
    .action-change {
      border: 1px solid #1ED0FF;
      background: #DAF5FF;
    }
  }
</style>
