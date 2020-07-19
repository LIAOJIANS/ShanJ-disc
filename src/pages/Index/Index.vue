<template>
  <div class="index-page">
    <index-right/>
    <index-left/>
    <router-view />
  </div>
</template>

<script>
  import IndexLeft from '@/components/IndexLeft/IndexLeft'
  import IndexRight from '@/components/IndexRight/IndexRight'

  export default {
    name: "Index",

    components: {
      IndexLeft,
      IndexRight
    }
  }
</script>

<style lang="scss" scoped>
  .index-page {
    height: 91%;
  }

</style>
