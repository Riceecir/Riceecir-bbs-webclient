<template>
  <footer>
    <p>
      <a href="/" target="_blank">Riceecir社区</a>
      <span>{{year}} &copy;</span>
      <a href="/" target="_blank">个人出品</a>
    </p>
    <p>
      <a href="/" target="_blank">凑数</a>
      <a href="/" target="_blank">联系方式</a>
      <a href="/" target="_blank">这也是凑数</a>
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data () {
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style lang="scss" scoped>
footer {
  text-align: center;
  font-size: 14px;

  a {
    margin: 0 .5em;
  }
}
</style>
