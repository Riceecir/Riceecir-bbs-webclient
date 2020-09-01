<template>
  <div class="captcha" v-loading="loadingStatus.code">
    <span slot="append" v-html="captcha.data" @click="initCaptcha" />
  </div>
</template>

<script>
import API from '@/api/index'
import { v4 as uuidv4 } from 'uuid'
const { getCaptcha } = API

/** 对外暴露的API
  * @returns { Function } validate : boolean 验证输入
  * @returns { Function } resetCaptcha: void 重置验证码
  */
export default {
  name: 'Captcha',

  props: {
    value: {
      type: [String],
      default: ''
    }
  },
  data () {
    return {
      loadingStatus: {
        code: false
      },
      captcha: {
        text: '',
        data: null
      }
    }
  },

  computed: {
    sid () {
      return this.$store.getters['publics/sid']
    }
  },

  methods: {
    /* 初始化 Sid */
    initSid () {
      if (!this.sid) {
        let sid = ''
        if (localStorage.getItem('sid')) {
          sid = localStorage.getItem('sid')
        } else {
          sid = uuidv4()
        }
        localStorage.setItem('sid', sid)
        this.$store.commit('publics/setSid', sid)
      }
    },
    /* 初始化验证码 */
    async initCaptcha () {
      if (!this.loadingStatus.code) {
        this.loadingStatus.code = true
        const res = await getCaptcha({
          sid: this.sid
        })
        if (res) {
          this.captcha = res.data
        }
        this.loadingStatus.code = false
      }
    },
    /* 对外暴露的API */
    resetCaptcha () {
      this.initCaptcha()
    },
    /* 验证输入是否正确 */
    validate () {
      return (this.value + '').toLocaleLowerCase() === (this.captcha.text + '').toLocaleLowerCase()
    }
  },

  created () {
    this.initSid()
    this.initCaptcha()
  }
}
</script>

<style lang="scss" scoped>
.captcha {
  position: relative;

  min-width: 150px;
  min-height: 50px;

  cursor: pointer;
}
</style>
