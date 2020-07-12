<template>
  <div class="error-page">
    <img src="../../assets/images/404.png" alt="">
    <br>
    <div class="btn mt-3">
      <el-button type="warning" @click="$router.go(-1)">返回上一页</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "404"
}
</script>

<style lang="scss" scoped>
  .error-page {
    padding-top: 80px;
    background: #EFEFF1;
    width: 100%;
    height: 100%;
    text-align: center;
    img {
      max-height: 80%;
    }
  }
</style>
