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
          <v-text-field v-model="formData.code" label="验证码" :rules="validations.captch" />
          <span v-loading="loadingStatus.code" slot="append" class="captch" v-html="captcha.data" @click="initCaptcha" />
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
import captchaMixin from '../mixins/captcha'
import { getRuleValidate } from '@/tools/validate/index'
const { login } = API

export default {
  mixins: [captchaMixin],
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
      validations: {
        ...getRuleValidate(['user_name', 'password'])
      },
      // 关闭弹窗的回调
      close: null
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
        return
      } else { this.loadingStatus.login = true }
      const res = await login()
      if (res.code === 200) {
        this.$snackbar.success({
          msg: res.msg
        })
      } else if ([1101, 1102].includes(res.error_code)) {
        this.initCaptcha()
      }
      this.loadingStatus.login = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../scss/index.scss');
</style>
