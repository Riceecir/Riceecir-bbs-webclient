<template>
  <v-snackbar v-bind="options" v-model="show">
    <span class="flex-d align-center">
      <v-icon :class="color" class="icon">{{icon}}</v-icon>
      {{ msg || 'message' }}
    </span>
    <template v-slot:action="{ attrs }">
      <!-- 本文 -->
      <template v-if="typeof closeBtn === 'string'">
        <v-btn v-bind="attrs" :class="color" text @click="close">{{closeBtn}}</v-btn>
      </template>
      <!-- render函数 -->
      <template v-if="typeof closeBtn === 'function'">
        <extend-render class="close" v-bind="attrs" :render="closeBtn" @click.native="close" />
      </template>
    </template>
  </v-snackbar>
</template>

<script>
import ExtendRender from '@/components/ExtendRender/index'

export default {
  components: { ExtendRender },
  data () {
    return {
      show: false,
      type: 'info',
      msg: '',
      closeBtn: '关闭',
      // 设置关闭组件的定时器
      closeTimeout: null,
      // vuetify snackbar 参数
      options: {
        light: true,
        // transition: 'fade-transition',
        transition: 'scale-transition',
        timeout: 3000
      }
    }
  },

  watch: {
    '$route.path' () {
      this.close()
    }
  },

  computed: {
    icon () {
      const icons = {
        info: 'mdi-information-variant',
        success: 'mdi-checkbox-marked-circle',
        warn: 'mdi-alert-circle',
        error: 'mdi-alert-circle'
      }
      return icons[this.type]
    },
    color () {
      const colors = {
        info: 'blue--text',
        success: 'green--text',
        warn: 'orange--text',
        error: 'red--text'
      }

      return colors[this.type]
    }
  },

  methods: {
    info (options) {
      this.show = true
      this.type = 'info'
      this.setOption(options)
      return this.close
    },

    warn (options) {
      this.show = true
      this.type = 'warn'
      this.setOption(options)
      return this.close
    },

    success (options) {
      this.show = true
      this.type = 'success'
      this.setOption(options)
      return this.close
    },

    error (options) {
      this.show = true
      this.type = 'error'
      this.setOption(options)
      return this.close
    },

    // 设置 option
    setOption (options) {
      this.msg = options.msg || ''
      this.closeBtn = options.closeBtn || '关闭'
      delete options.msg
      delete options.closeBtn
      this.options = Object.assign(this.options, options)
      this.setClose()
    },

    // 设置关闭时间
    setClose () {
      clearTimeout(this.closeTimeout)
      if (+this.options.timeout > 0) {
        this.closeTimeout = setTimeout(() => {
          this.close()
        }, +this.options.timeout)
      }
    },

    // 关闭当前元素并销毁Dom
    close () {
      clearTimeout(this.closeTimeout)
      this.show = false
      // 考虑到过渡动画，1秒后再销毁
      this.closeTimeout = setTimeout(() => {
        this.$el.remove()
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin-top: -2px;
}
.close {
  cursor: pointer;
}
</style>
