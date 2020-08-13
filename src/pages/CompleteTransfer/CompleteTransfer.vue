<template>
  <div>
    <download-list :list="list" />
  </div>
</template>

<script>
import { uploadList } from '@/api/file'
import DownloadList from '@/components/DownloadList/DownloadList'
export default {
  name: "CompleteTransfer",

  components: {
    DownloadList
  },

  data() {
    return {
     list: []
    }
  },
  mounted() {
    this.loadData()
  },

  methods: {
    loadData() {
      uploadList(this.$store.getters.userInfo.u_id).then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
