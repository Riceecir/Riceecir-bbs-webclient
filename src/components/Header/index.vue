<template>
  <header class="darken-3">
    <a href="/">
      <img class="logo" src="@/assets/image/logo.png" />
    </a>

    <div class="d-flex flex-grow-1 nav">
      <ul class="d-flex flex-grow-1 justify-end">
        <router-link class="rounded" to="/login" tag="li" v-ripple="{}">登入</router-link>
        <router-link class="rounded" to="/register" tag="li" v-ripple="{}">注册</router-link>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
$ctx-height: 64px;
header {
  display: flex;
  align-items: center;

  width: 100%;
  height: $ctx-height;
  padding: 0 1rem;

  border-bottom: 1px solid #E0E0E0;

  .logo {
    width: $ctx-height;
    height: $ctx-height;

    margin: 0 $ctx-height / 2;
  }

  .nav {
    ul {
      li {
        padding: .5rem 2rem;
        opacity: .8;
        user-select: none;

        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
