<template>
  <div class="index-page">
    <index-top />
    <index-left />
    <AppMain />
  </div>
</template>

<script>
import IndexLeft from './component/IndexLeft/IndexLeft'
import IndexTop from './component/IndexTop/IndexTop'
import AppMain from './component/AppMain/AppMain'
export default {
  name: 'Index',
  components: {
    IndexLeft,
    IndexTop,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.index-page {
  width: 100%;
  min-height: calc(100vh - 20px);

  position: relative;
}

</style>
