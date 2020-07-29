<template>
  <div class="content">
    <function-column :mode="mode" @patternChange="patternChange" />
    <div class="document-content">
      <div class="content-box" :class="[ mode && 'pl-2 pr-2 pt-1' ]">
        <ul class="dispaly warp ul-radio" v-if="mode">

          <li
            class="wenjian-item pr-2 pl-2 ml-1 pt-2 pb-1 text-center mt-1"
            v-for="item in fileList"
            :key="item.id"
            @click.ctrl="keyToSelect(item.id)"
            @click.exact="selectSingle(item.id)"
            :class="[( selectMultiple.find(index => item.id === index) || selectSingleOne === item.id ) && 'action-change']"
          >
            <i class="iconfont icon-wenjianjiaguanbi"></i>
            <p class="content-box-title mt-2">{{ item.filename }}</p>
          </li>

          <li class="add-upload d-c-c mt-2">
            <p class="pr-2 pl-2 pt-2 pb-2">
              <i class="iconfont el-icon-plus"></i>
            </p>
          </li>

        </ul>
        <ul class="file-list" v-else>

          <li class="dispaly-flex border p1" style="width: 100%;">
            <el-row style="width: 100%;">
              <el-col :span="10">
                <div class="file-name dispaly-center">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange"></el-checkbox>
                  <p class="ml-2">文件名</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="file-name dispaly-center">
                  <p class="modification-time">修改时间</p>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="file-name dispaly-center">
                  <p class="file-size">大小</p>
                </div>
              </el-col>
            </el-row>
          </li>

          <li
             class="p1 file-list-item"
             v-for="(file, index) in fileList"
             :key="index"
             @mouseenter="fileItemHover(file.id)"
             @mouseleave="currentlyMoving = ''"
             :class='[(currentlyMoving === file.id || checkedFile.some(item => file.id === item.fileId)) && "hover-bg"]'
          >
            <el-row style="width: 100%;">
              <el-col :span="10" >
                <div class="dispaly-flex">
                  <el-checkbox @change="selectCurrent(file.id, $event)" :value="checkedFile.some(item => file.id === item.fileId)" >
                    <div class="dispaly-center">
                      <i class="iconfont icon-wenjianjiaguanbi" style="font-size: 14px;"></i>
                      <p class="pl-2">{{ file.filename }}</p>
                    </div>
                  </el-checkbox>
                  <div class="list-item-hover pr-3" v-show="currentlyMoving === file.id">
                    <i class="el-icon-share pr-1"></i>
                    <i class="el-icon-download pr-1"></i>
                    <i class="el-icon-delete"></i>
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <p style="line-height: 19px;">{{ file.fileUploadTime }}</p>
              </el-col>
              <el-col :span="6">
                <p style="line-height: 19px;">{{ file.fileSize }}</p>
              </el-col>
            </el-row>
          </li>

        </ul>
      </div>
      <file-button />
    </div>
  </div>
</template>

<script>
import FileButton from './components/FileButton'
import FunctionColumn from "./components/FunctionColumn";
  export default {
    name: "Home",
    components: {
      FileButton,
      FunctionColumn
    },
    data() {
      return {
        selectSingleOne: '',
        selectMultiple: [],
        mode: false, // true 为圆格模式，false 列表模式
        checkAll: false,
        checkedFile: [],
        fileList: [
          {
            id: 1,
            filename: '张三',
            fileUploadTime: '2020-07-27 19:20:10',
            fileSize: 99999,

          },
          {
            id: 2,
            filename: '张三',
            fileUploadTime: '2020-07-27 19:20:10',
            fileSize: 99999
          },
          {
            id: 3,
            filename: '张三',
            fileUploadTime: '2020-07-27 19:20:10',
            fileSize: 99999
          }
        ],
        isIndeterminate: false,
        currentlyMoving: 0
      }
    },

    watch: {
      checkedFile() {
        this.checkAll = this.fileList.length === this.checkedFile.length
      }
    },

    methods: {
      patternChange() {
        this.mode = !this.mode
      },

      handleCheckAllChange(val) {
        if(val) {
          this.checkAll = true
          this.fileList.forEach(item => {
            this.hanldSelect(item.id)
          })
        } else {
          this.checkedFile = []
        }
      },

      selectCurrent(fileId, e) {
        if(e) {
          this.hanldSelect(fileId, e)
        } else {
          this.checkedFile.forEach((item, index) => item.fileId === fileId && (this.checkedFile.splice(index, 1)))
        }
      },

      hanldSelect(fileId, e = true) {
        const obj = {
          fileId,
          isSelect: e
        }
        !(this.checkedFile.some(item => item.fileId === fileId)) && (this.checkedFile = [ ...this.checkedFile, obj ])
      },

      fileItemHover(fileId) {
        (this.currentlyMoving !== fileId) && (this.currentlyMoving = fileId)
      },

      keyToSelect(item) {
        const isItem = this.selectMultiple.indexOf(item)
        if (isItem !== -1) {
          return this.selectMultiple.splice(isItem, 1)
        }
        this.selectMultiple = [ ...this.selectMultiple, item ]
      },

      selectSingle(item) {
        this.selectMultiple = []
        this.selectSingleOne = item
      }
    },
  }
</script>

<style lang="scss" scoped>

  .content {
    height: 100%;
  }



  .border {
    border-bottom: 1px solid #f0f0f0;
  }

  .hover-bg {
    background: #E6F6FF;
  }

  .file-list {
    width: 100%;

    p {
      font-size: 14px;
      color: #666;
    }

    .file-list-item {
      cursor: pointer;
      p {
        color: #666;
      }
    }

  }

  .document-content {
    height: 89%;
    position: relative;
    overflow-y: auto;
  }

  .content-box {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;

    .ul-radio {
      li {
        width: 10%;
        cursor: pointer;
      }
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

  @media screen and (max-width: 1200px) {

    .content-box {
      .ul-radio {
        justify-content: center;
      }

      .ul-radio {
        li {
          width: 20% !important;
          cursor: pointer !important;
        }
      }
    }
  }
</style>
