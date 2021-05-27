<template>
  <div>
    <download-list
      v-if="list.length > 0"
      :list="list"
      @getHistory="loadData"
    />
    <no-data v-else />
  </div>
</template>

<script>
import { getHistory } from '@/api/file'
import DownloadList from '@/components/DownloadList/cop'
import NoData from '@/components/NoData/NoData'
export default {
  name: 'RecycleBin',

  components: {
    DownloadList,
    NoData
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
