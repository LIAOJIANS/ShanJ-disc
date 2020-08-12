<template>
  <div>
    <div>
      <input type="file" @change="fileSelect($event)" />
      <button @click="fileSubmit">上传</button>
    </div>
    <div class="progress-wrap">
      <p>上传进度</p>
      <p class="progress"><span :style="style"></span></p>
    </div>

    <div @click="dow">
      下载
    </div>
  </div>
</template>

<script>
import axios from 'axios'
  export default {
    name: "Upload",
    data() {
      return {
        file: {}, //上传的文件对象
        progressBar: 0 // 记录上传进度的变量
      }
    },
    computed:{
      style(){ // 进度条样式
        return {
          width: this.progressBar + "%"
        }
      }
    },
    methods:{
      fileSelect(e){
        this.file = e.target.files[0]
      },
      async dow() {
        await axios.post('http://localhost:3000/file/dow', {
          onDownloadProgress: dow => {
            console.log(dow)
          }
        }).then(res => {
          const content = res.data
          console.log(content)
          const blob = new Blob([content])
          const fileName = '测试表格123.txt'
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a')
            elink.download = fileName
            elink.style.display = 'none'
            elink.href = URL.createObjectURL(blob)
            document.body.appendChild(elink)
            elink.click()
            URL.revokeObjectURL(elink.href) // 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, fileName)
          }
        })
      },

      async fileSubmit(){
        let stime = new Date().getTime();
        let sloaded = 0
        const formData = new FormData()
        formData.append('file',this.file)
        await axios.post('http://localhost:3000/file/upload',formData, {
          onUploadProgress: (progressEvent)=>{
            this.$route.fullPath !== '/' && this.$router.push('/')
            console.log(progressEvent)
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.progressBar = percentCompleted
            let endTime = new Date().getTime();
            let dTime = (endTime - stime) / 1000; //毫秒换算成秒
            let dloaded = progressEvent.loaded - sloaded;
            console.log(dTime)
            let speed = dloaded / dTime;
            stime = new Date().getTime();
            sloaded = progressEvent.loaded;
            let unit = "b/s"; //不足1kb，以b/s来计算速度
            // kb/s
            if (speed / 1024 > 1) { //当大小超过1024b(即1kb时)，以kb/s来计算速度
              unit = "kb/s";
              speed = speed / 1024 / 10;
            }
            // mb/s
            if (speed / 1024 > 1) { //当大小超过1024Kb(即1mb时)，以mb/s来计算速度
              unit = "mb/s";
              speed = speed / 1024 / 10;
            }
            console.log(speed.toFixed(2) + unit)
          }}).then(res=>{
          console.log(res.data)
        })
      }
    },
  }
</script>

<style scoped>
  .progress-wrap {
    width: 300px;
  }
  .progress-wrap p {
    width: 100%;
  }
  .progress {
    background-color: #c5c8ce;
    height: 20px;
  }
  .progress span {
    display: block;
    background-color: #19be6b;
    height: 100%;
    width: 0;
  }
</style>
