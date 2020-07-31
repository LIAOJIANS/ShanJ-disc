<template>
  <div class="home-button dispaly-center">
    <div class="home-button-left pl-1 pr-1" style="width: 198px;">
      <progress-list :show-text="false" :percentage="50" :width="6" />
      <div class="mt-1 dispaly-flex">
        <p><span>10G</span> / <span>20G</span></p>
        <p style="color: #00B7FF; cursor: pointer">扩容</p>
      </div>
    </div>
    <div class="home-button-right f1 ">
      <p class="pl-1">54项</p>
    </div>
  </div>
</template>

<script>
import ProgressList from "../../../components/progress/progress";
export default {
  name: "FileButton",

  components: {
    ProgressList
  }
}
</script>

<style lang="scss" scoped>
  .home-button {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 40px;
    z-index: 2;

    .home-button-left {
      height: 40px;
      font-size: 12px;
    }

    .home-button-right {
      line-height: 40px;
      font-size: 12px;
      color: #999;
      border: 1px solid #f0f0f0;
    }
  }
</style>
