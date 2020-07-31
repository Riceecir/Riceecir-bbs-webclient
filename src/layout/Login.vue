<template>
  <div class="login-container d-flex flex-column">
    <!-- <Header /> -->

    <!-- 纵向排列，两边对齐，footer始终位于底部 -->
    <div class="d-flex flex-grow-1 flex-column justify-space-between scroll-container" >
      <v-container>
        <v-row justify="center">
          <v-col cols="3">
            <div class="content rounded-lg">
              <v-tabs :value="currentTab" height="56" grow>
                <template v-if="currentTab === '/forget'">
                  <v-tab v-for="item in tabConfig" :key="item.path">{{ item.label }}</v-tab>
                </template>
                <template v-else>
                  <v-tab v-for="item in tabConfig" :key="item.path" :to="item.path" replace>{{ item.label }}</v-tab>
                </template>
              </v-tabs>
              <!-- 业务功能组件 -->
              <v-container>
                <router-view />
              </v-container>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <Footer />
    </div>

  </div>
</template>

<script>
// import Header from '@/components/Header/index.vue'
import Footer from '@/components/Footer/index.vue'
const configs = {
  forget: [{
    label: '通过邮箱找回',
    path: '/forget?type=email'
  },
  {
    label: '通过手机号找回',
    path: '/forget?type=phone'
  }],
  login: [{
    label: '登入',
    path: '/login'
  }],
  register: [{
    label: '注册',
    path: '/register'
  }]
}

export default {
  components: {
    // Header,
    Footer
  },

  computed: {
    currentTab () {
      return this.$route.path
    },

    tabConfig () {
      return configs[this.currentTab.replace('/', '')]
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  height: 100%;

  .scroll-container {
    overflow: auto;

    .content {
      border: 1px solid #E0E0E0;
      overflow: auto;
    }
  }
}
</style>
