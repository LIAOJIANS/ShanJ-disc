<template>
  <div class="mark" v-show="isShow">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Mark",
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    
    
    methods: {
    }
  }
</script>

<style lang="scss" scoped>
.mark {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 99;
}
  
  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 100;
    transform: translate(-50%, -50%);
    background: #fff;
    border-radius: 5px;
  }
</style>
