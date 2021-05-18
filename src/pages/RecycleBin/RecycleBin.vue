<template>
  <div>
    <download-list :list="list" @getHistory="loadData" />
  </div>
</template>

<script>
import { getHistory } from '@/api/file'
import DownloadList from '@/components/DownloadList/DownloadList'
export default {
  name: 'RecycleBin',

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
      getHistory().then(res => {
        this.list = res.data
      })
    }
  }
}
</script>

<style scoped>

</style>
