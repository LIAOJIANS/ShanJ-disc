<template>
  <form action="">
    <el-upload
        class="upload-demo"
        :drag="true"
        action=""
        :file-list="fileList"
        :http-request="uploadSectionFile"
        accept="*"
        :on-remove="onRemove"
        show-file-list>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">文件上传<em>点击上传</em></div>
    </el-upload>
  </form>
</template>

<script>
import { uploadFile } from '@/api/file'
export default {
  name: "fileUpload",

  data() {
    return {
      fileList: [], // 文件数组
      imgUidList: {}
    }
  },

  methods: {
    onRemove(file) {
      console.log(file)
    },

    onChange(file) {
     console.log(file)
    },

    uploadSectionFile(param) { // 提交表单
      uploadFile(param.file, this.$store.getters.fileCurrentPath).then(res => {
        this.$store.dispatch('resetProgress')
        this.$message({ type: 'success', message: res.msg })
      })
    },
  }
}
</script>

<style>
</style>
