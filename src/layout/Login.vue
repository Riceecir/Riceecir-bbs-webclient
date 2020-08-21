<template>
  <div class="login-container d-flex flex-column">
    <!-- 纵向排列，两边对齐，footer始终位于底部 -->
    <div class="d-flex flex-grow-1 flex-column justify-space-between scroll-container" >
      <v-container>
        <v-row justify="center">
          <v-col sm="7" md="6" lg="5" xl="3">
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
import Footer from '@/components/Footer/index.vue'
const configs = {
  forget: [{
    label: '找回密码',
    path: '/forget'
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
    Footer
  },

  computed: {
    /* 路由地址对应当前选择 */
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
