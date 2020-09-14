<template>
  <div>
    <download-list :list="list" />
  </div>
</template>

<script>
  import { getHistory } from '@/api/file'
  import DownloadList from '@/components/DownloadList/DownloadList'
export default {
  name: "RecycleBin",
  
  data() {
    return {
      list: []
    }
  },
  
  components: {
    DownloadList
  },
  
  mounted() {
    this.loadData()
  },
  
  methods: {
    loadData() {
      getHistory().then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
