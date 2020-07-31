<template>
  <v-row justify="center" v-loading="loadingStatus.login">
    <v-col cols="10">
      <v-form ref="loginForm" v-model="valid">
        <v-text-field v-model="formData.user_name" label="用户名" :rules="validations.user_name" />
        <v-text-field v-model="formData.password" label="密码" type="password" :rules="validations.password" />
        <span class="d-flex justify-end text-caption">
          <router-link to="/forget" v-ripple>忘记密码?</router-link>
        </span>
        <v-input>
          <v-text-field v-model="formData.code" label="验证码" :rules="validations.captch" />
          <span slot="append" class="captch" v-html="captcha.data" @click="initCaptcha" />
        </v-input>
        <div>
          <v-btn block color="blue white--text" @click="handleLogin">登入</v-btn>
        </div>
        <div class="mt-5">
          <router-link to="/register" >
            <v-btn block text color="grey darken-3">注册</v-btn>
          </router-link>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import captchaMixin from './mixins/captcha'
import { getRuleValidate } from '@/tools/validate/index'

export default {
  mixins: [captchaMixin],
  data () {
    return {
      snackbar: true,
      loadingStatus: {
        login: false
      },
      valid: true,
      formData: {
        user_name: '',
        password: '',
        code: ''
      },
      validations: {
        ...getRuleValidate(['user_name', 'password'])
      }
    }
  },

  methods: {
    // 处理登录
    handleLogin () {
      const valid = this.$refs.loginForm.validate()
      if (!valid) {
        this.$snackbar.info({
          absolute: true,
          timeout: 0,
          msg: '表单验证失败, 请检查'
        })
        this.$snackbar.success({
          absolute: true,
          timeout: 0,
          msg: '表单验证失败, 请检查'
        })
        this.$snackbar.warn({
          absolute: true,
          timeout: 0,
          msg: '表单验证失败, 请检查'
        })
        this.$snackbar.error({
          absolute: true,
          timeout: 0,
          msg: '表单验证失败, 请检查'
        })
      } else {
        this.loadingStatus.login = true
        setTimeout(() => {
          this.loadingStatus.login = false
        }, 3000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./scss/index.scss');
</style>
