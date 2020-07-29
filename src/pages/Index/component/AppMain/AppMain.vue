<template>
  <div class="app-main">
    <historical-records />
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key">

        </router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import HistoricalRecords from "./component/HistoricalRecords";
export default {
  name: "AppMain",

  components: {
    HistoricalRecords
  },

  computed: {
    cachedViews() {
      return this.$store.getters.cachedViews
    },

    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*min-height: calc(100vh);*/
  height: 100%;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: 80px;
  padding-left: 200px;
}
</style>
