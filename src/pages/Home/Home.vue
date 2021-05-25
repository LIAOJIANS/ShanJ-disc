<template>
  <div class="content">
    <function-column
      :mode="mode"
      @patternChange="patternChange"
      @newFileJia="newFileJia"
      @delFile="delFile"
      @dowFile="dowFile"
      @groudList="groudList"
    />

    <div class="document-content">
      <div v-if="(fileList.length > 0 || mode) && grouping.length > 0" class="content-box" :class="[ mode && 'pl-2 pr-2 pt-1' ]">
        <ul v-if="mode" class="dispaly warp ul-radio">

          <li
            v-for="(grouped, index) in grouping"
            :key="index"
            class="wenjian-item pr-2 pl-2 ml-1 pt-2 pb-1 text-center mt-1"
            @click="getChild(grouped)"
          >
            <i class="iconfont icon-wenjianjiaguanbi" />
            <p class="content-box-title mt-2">{{ grouped }}</p>
          </li>

          <li
            v-for="item in fileList"
            :key="item.id"
            class="wenjian-item pr-2 pl-2 ml-1 pt-2 pb-1 text-center mt-1"
            :class="[( selectMultiple.find(index => item.f_id === index) || selectSingleOne === item.f_id ) && 'action-change']"
            @click.ctrl="keyToSelect(item.f_id)"
            @click.exact="selectSingle(item.f_id)"
          >
            <img :src="fType(item.f_name)" alt="">
            <p class="content-box-title mt-2">{{ item.f_name }}</p>
          </li>

          <!-- <li class="add-upload d-c-c mt-2" @click="newFileJia">
            <p class="pr-2 pl-2 pt-2 pb-2">
              <i class="iconfont el-icon-plus" />
            </p>
          </li> -->

        </ul>
        <ul v-else class="file-list">

          <li class="dispaly-flex border p1" style="width: 100%;">
            <el-row style="width: 100%;">
              <el-col :span="10">
                <div class="file-name dispaly-center">
                  <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange" />
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
            v-for="(file, index) in fileList"
            :key="index"
            class="p1 file-list-item"
            :class="[(currentlyMoving === file.f_id || isCurrentFile(file)) && &quot;hover-bg&quot;]"
            @mouseenter="fileItemHover(file.f_id)"
            @mouseleave="currentlyMoving = ''"
          >
            <el-row style="width: 100%;">
              <el-col :span="10">
                <div class="dispaly-flex">
                  <el-checkbox :value="isCurrentFile(file)" @change="selectCurrent(file, $event)">
                    <div class="dispaly-center">
                      <img :src="fType(file.f_name)" alt="" style="width: 16px;">
                      <p class="pl-2">{{ file.f_name }}</p>
                    </div>
                  </el-checkbox>
                  <div v-show="currentlyMoving === file.f_id" class="list-item-hover pr-3">
                    <i class="el-icon-share pr-1" />
                    <i class="el-icon-download pr-1" />
                    <i class="el-icon-delete" />
                  </div>
                </div>
              </el-col>
              <el-col :span="6">
                <p style="line-height: 19px;">{{ fTime(file) }}</p>
              </el-col>
              <el-col :span="6">
                <p style="line-height: 19px;">{{ fileSize(file) }}</p>
              </el-col>
            </el-row>
          </li>

        </ul>
      </div>

      <NoData v-else />

      <file-button />
      <Mark :is-show="isShowAlert">
        <div class="alert p2">
          <p class="header-title text-center">新建文件夹</p>
          <div class="alert-body dispaly-center mt-2">
            <span style="white-space: nowrap; font-size: 14px;">文件夹名：</span>
            <el-input v-model="floaderName" size="mini" />
          </div>
          <div class="fun-btn mt-3 dispaly" style="justify-content: space-around">
            <el-button type="primary" @click="createFloader">确定</el-button>
            <el-button class="ml-3" @click="isShowAlert = false">取消</el-button>
          </div>
        </div>
      </Mark>
    </div>
  </div>
</template>

<script>
import FileButton from './components/FileButton'
import FunctionColumn from './components/FunctionColumn'
import Mark from '../../components/Mark/Mark'
import { fileTraversal, dowUrl } from '../../utils/FileTool'
import { fileType, goRouter } from '../../utils/publicTool'
import { time } from 'js-hodgepodge'
import NoData from '@/components/NoData/NoData'
import { createFloader, uploadHistory } from '../../api/file'

export default {
  name: 'Home',
  components: {
    FileButton,
    FunctionColumn,
    Mark,
    NoData
  },

  data() {
    return {
      selectSingleOne: '',
      selectMultiple: [],
      mode: false, // true 为圆格模式，false 列表模式
      checkAll: false,
      checkedFile: [],
      fileList: this.$store.getters.fileList,
      isIndeterminate: false,
      currentlyMoving: 0,
      isShowAlert: false,
      grouping: [],
      floaderName: '' // 文件夹名
    }
  },

  computed: {
    fTime() {
      return (file) => {
        return time.getTime(new Date(file.updatedAt), true)
      }
    },

    fType() {
      return (file) => {
        return fileType(file)
      }
    },

    fileSize() {
      return (file) => {
        return file.f_size / (1024 * 1024 * 1024) > 1
          ? `${(file.f_size / (1024 * 1024 * 1024)).toFixed(2)} GB`
          : `${(file.f_size / (1024 * 1024)).toFixed(2)} MB`
      }
    }
  },

  watch: {
    checkedFile() {
      this.checkAll = this.fileList.length === this.checkedFile.length
    },

    '$store.getters.fileList': function(val) {
      this.fileList = val
    }
  },

  mounted() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.$store.dispatch('getGroupList').then(list => {
        this.grouping = list
      })
    },

    groudList(data) {
      this.grouping = data
    },

    getChild(gName) {
      this.$store.dispatch('setCurrentPath', {
        path: gName,
        u_id: this.$store.getters.userInfo.u_id
      })

      this.$store.dispatch('getGroupList').then(list => {
        this.grouping = list
      })
    },

    isCurrentFile(file) {
      return this.checkedFile.some(item => file.f_id === item.fileId)
    },

    patternChange() {
      this.mode = !this.mode
    },

    newFileJia() {
      this.isShowAlert = true
    },

    delFile() {
      const { mode, selectMultiple, checkedFile } = this
      this.subCheck()
      mode ? this.delSelectMultiple(selectMultiple) : this.delCheckedFile(checkedFile)
    },

    delSelectMultiple(selectMultiple) {
      !selectMultiple.includes(this.selectSingleOne) && (selectMultiple = [...selectMultiple, this.selectSingleOne])
      fileTraversal(selectMultiple, item => {
        this.handleDelFile(item)
      })
    },

    delCheckedFile(checkedFile) {
      fileTraversal(checkedFile, item => {
        this.handleDelFile(item.fileId)
      })
    },

    handleDelFile(file_id) {
      uploadHistory(file_id).then(res => {
        this.$message({ type: 'success', message: res.msg })
        this.$store.dispatch('getFileList', this.$store.getters.userInfo.u_id)
      })
    },

    dowFile() {
      const { mode, selectMultiple, checkedFile } = this
      this.subCheck()
      mode ? this.dowSelectMultiple(selectMultiple) : this.dowCheckedFile(checkedFile)
    },

    subCheck() {
      const { selectMultiple, checkedFile, selectSingleOne } = this
      if (
        selectMultiple.length === 0 &&
        checkedFile.length === 0 &&
        !selectSingleOne
      ) {
        return this.$message({ type: 'error', message: '还没选择文件哟！' })
      }
    },

    dowSelectMultiple(selectMultiple) {
      if (selectMultiple.length === 0) {
        this.dowServer(this.selectSingleOne)
      } else {
        fileTraversal(selectMultiple, item => {
          this.dowServer(item)
        })
      }
    },

    dowCheckedFile(checkedFile) {
      fileTraversal(checkedFile, item => {
        this.dowServer(item.fileId)
      })
    },

    dowServer(file_id) {
      const file = JSON.parse(JSON.stringify(this.fileList.find(file => file.f_id === file_id)))
      file.f_dow_url = dowUrl(file.f_dow_url)

      this.$root.addDownFile(file)

      goRouter(this, '/transfer/1')
    },

    handleCheckAllChange(val) {
      if (val) {
        this.checkAll = true
        this.fileList.forEach(item => {
          this.hanldSelect(item)
        })
      } else {
        this.checkedFile = []
      }
    },

    createFloader() {
      createFloader(this.$store.getters.fileCurrentPath, this.floaderName).then(res => {
        this.fetchData()
        this.$message({ message: '创建成功', type: 'success' })
        this.isShowAlert = false
      })
    },

    selectCurrent(file, e) {
      e ? this.hanldSelect(file, e) : this.checkedFile.forEach((item, index) => item.fileId === file.f_id && (this.checkedFile.splice(index, 1)))
    },

    hanldSelect(file, e = true) {
      const obj = {
        fileId: file.f_id,
        dowFileUrl: file.f_dow_url,
        isSelect: e
      }
      !(this.checkedFile.some(item => item.fileId === file.f_id)) && (this.checkedFile = [...this.checkedFile, obj])
    },

    fileItemHover(fileId) {
      (this.currentlyMoving !== fileId) && (this.currentlyMoving = fileId)
    },

    keyToSelect(item) {
      const isItem = this.selectMultiple.indexOf(item)
      if (isItem !== -1) { return this.selectMultiple.splice(isItem, 1) }
      this.selectMultiple = [...this.selectMultiple, item]
    },

    selectSingle(item) {
      this.selectMultiple = []
      this.selectSingleOne = item
    }
  }
}
</script>

<style lang="scss" scoped>

  .content {
    height: calc(100vh - 137px);
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
    height: 86%;
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
      font-size: 12px;
      color: #666;
      word-break: break-word;
    }

    .action-change {
      border: 1px solid #1ED0FF;
      background: #DAF5FF;
    }
  }

  .alert {
    width: 400px;
    .header-title {
      font-size: 16px;
      color: #666;
      font-weight: bold;
    }
  }

  // @media screen and (max-width: 1200px) {

  //   .content-box {
  //     .ul-radio {
  //       justify-content: center;
  //     }

  //     .ul-radio {
  //       li {
  //         width: 20% !important;
  //         cursor: pointer !important;
  //       }
  //     }
  //   }
  // }
</style>
