<template>
  <div class="index-left" :style="`height: ${ height }`">

  </div>
</template>

<script>
  export default {
    name: "IndexLeft",
    data() {
      return {}
    },
    computed: {
      height() {
        return document.body.clientHeight - 80 + 'px'
      }
    }
  }
</script>

<style lang="scss" scoped>
.index-left {
  position: absolute;
  top: 80px;
  left: 0;
  bottom: 0;
  height: 100%;
  width: 200px;
  background: red;
}
</style>
