<template>
  <div class="default-container d-flex flex-column">
    <!-- 固定头部 -->
    <div class="header-container">
      <Header />
    </div>

    <div class="d-flex flex-grow-1 flex-column justify-space-between content">
      <v-container>
        <router-view />
      </v-container>
      <Footer />
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.default-container {
  height: 100%;

  .header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    background-color: white;
  }

  .content {
    padding-top: $header-height;
  }
}
</style>
