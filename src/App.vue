<template>
  <v-app>
    <v-progress-linear
      fixed
      top
      indeterminate
      :height="2"
      :active="topLineear"
      :buffer-value="100"
    />
    <router-view />
  </v-app>
</template>

<script>
export default {
  computed: {
    topLineear () {
      return this.$store.getters['publics/topLineear']
    }
  }
}
</script>
