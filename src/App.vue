<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<style lang="scss">
/* router-view内组件设置 flex-grow: 1; 即可铺满当前高度 */
html, body {
  width: 100%;
  height: 100%;

  overflow:inherit !important;
}
/* 更改一下 vuetify 的组件样式.... */
.v-application {
  height: 100%;
}
// 可有可无
.v-main {
  flex-direction: column;

  height: 100%;

  .v-main__wrap {
    display: flex;
    flex-direction: column;

    height: 100%;
  }
}
</style>
