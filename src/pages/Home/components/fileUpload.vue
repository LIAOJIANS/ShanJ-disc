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
      console.log(param)
    },
  }
}
</script>

<style>
</style>
