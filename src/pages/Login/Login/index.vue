<template>
  <v-row justify="center" v-loading="loadingStatus.login">
    <v-col cols="10">
      <v-form ref="loginForm" autocomplete="off">
        <v-text-field v-model="formData.user_name" label="用户名" :rules="validations.user_name" />
        <v-text-field v-model="formData.password" label="密码" type="password" counter="16" :rules="validations.password" />
        <span class="d-flex justify-end text-caption">
          <router-link to="/forget" v-ripple>忘记密码?</router-link>
        </span>
        <v-input>
          <v-text-field v-model="formData.code" label="验证码" :rules="validations.captcha" />
          <Captcha v-model="formData.code" ref="captcha" />
        </v-input>
        <div>
          <v-btn block color="blue white--text" @click="handleLogin">登入</v-btn>
          <router-link to="/register" tag="div" class="mt-5">
            <v-btn block text color="grey darken-3">注册</v-btn>
          </router-link>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import API from '@/api/index'
import Captcha from '@/components/Captcha/index'
import { getRuleValidate } from '@/tools/validate/index'
const { login } = API

export default {
  name: 'Login',
  components: { Captcha },
  data () {
    return {
      loadingStatus: {
        login: false
      },
      formData: {
        user_name: '',
        password: '',
        code: ''
      },
      // 关闭弹窗的回调
      close: null
    }
  },

  computed: {
    /* 校验规则 */
    validations () {
      const v = getRuleValidate(['user_name', 'password', 'captcha'])
      v.captcha.push(() => (this.$refs.captcha && this.$refs.captcha.validate()) || '请输入正确的验证码')
      return v
    },

    sid () {
      return this.$store.getters['publics/sid']
    }
  },

  watch: {
    // 验证码数据发生变动时，清空验证码内容
    captcha (_new, _old) {
      this.formData.code = ''
    }
  },

  methods: {
    // 处理登录
    async handleLogin () {
      if (!this.$refs.loginForm.validate()) {
        typeof this.close === 'function' && this.close()
        this.close = this.$snackbar.error({
          absolute: true,
          timeout: 3000,
          msg: '表单验证失败, 请检查'
        })
      } else {
        this.loadingStatus.login = true
        const res = await login({
          ...this.formData,
          sid: this.sid
        })

        if (res.code === 200) {
          this.$router.replace({ path: '/' })
        } else if ([401, 404].includes(res.code)) {
          this.$refs.captcha.resetCaptcha()
        }
        this.loadingStatus.login = false
      }
    }
  }
}
</script>
