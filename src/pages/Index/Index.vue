<template>
  <div class="index-page">
    首页
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  import HelloWorld from '../../components/HelloWorld'
  export default {
    name: "Index",
    components: {
      HelloWorld
    }
  }
</script>

<style scoped>
</style>
