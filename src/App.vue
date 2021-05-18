<template>
  <div id="app">
    <func-tool />
    <router-view />
  </div>
</template>

<script>
import FuncTool from '@/components/funcTool/funcTool'
export default {
  name: 'App',
  components: { FuncTool }
}
</script>

<style>
  #app {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
  }
</style>
