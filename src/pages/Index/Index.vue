<template>
  <div class="index-page">
    <index-right />
    <index-left />
    <div class="content p2">
      <div>
        <input type="file" @change="fileSelect($event)" />
        <button @click="fileSubmit">上传</button>
      </div>
      <div class="progress-wrap">
        <p>上传进度</p>
        <p class="progress"><span :style="style"></span></p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
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
      async fileSubmit(){
        const formData = new FormData()
        formData.append('file',this.file)
        await axios.post('http://localhost:3000/file/upload',formData,{
          onUploadProgress: (progressEvent)=>{
            console.log(progressEvent)
            var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
            this.progressBar = percentCompleted
          }}).then(res=>{
          console.log(res.data)
        })
      }
    },
    components: {
      IndexLeft,
      IndexRight
    }
  }
</script>

<style scoped>
  .index-page {
    /*margin-left: 200px;*/
  }
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
  .content {
    margin-left: 200px;
    height: 100%;
  }
</style>
