<template>
  <div>
    <download-list v-if="list.length > 0" />
    <no-data v-else />
  </div>
</template>

<script>
import DownloadList from '@/components/DownloadList/DownloadList'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'CompleteTransfer',

  components: {
    DownloadList,
    NoData
  },

  data() {
    return {
      list: []
    }
  },

  created() {
    this.$store.dispatch('getFileList', this.$store.getters.userInfo.u_id).then(data => {
      this.list = data
    })
  }
}
</script>

<style scoped>

</style>
