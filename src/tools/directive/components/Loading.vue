<template>
  <div class="loading-container">
    <div class="mask" />
    <v-progress-circular indeterminate />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.loading-container {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  // 白色的蒙层
  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    background-color: rgba($color: #fff, $alpha: 0.7)
  }
}
</style>
