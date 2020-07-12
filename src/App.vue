<template>
  <div id="app">
    <index-right />
    <router-view />
    <index-left/>
  </div>
</template>

<script>
  import IndexLeft from '@/components/IndexLeft/IndexLeft'
  import IndexRight from '@/components/IndexRight/IndexRight'
  export default {
    name: 'App',
    components: {
      IndexLeft,
      IndexRight
    }
  }
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
