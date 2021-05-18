<template>
  <div>
    <download-list :list="list" v-if="list.length > 0" />
    <no-data v-else />
  </div>
</template>

<script>
import DownloadList from '@/components/DownloadList/DownloadList'
import NoData from '@/components/NoData/NoData'
export default {
  name: "CompleteTransfer",

  components: {
    DownloadList,
    NoData
  },

  data() {
    return {
     list: this.$store.getters.fileList
    }
  }
}
</script>

<style scoped>

</style>
