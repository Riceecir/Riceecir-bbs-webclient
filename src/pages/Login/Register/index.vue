<template>
  <v-row justify="center" v-loading="loadingStatus.register">
    <v-col cols="10">
      <v-form ref="registerForm" autocomplete="off">
        <v-text-field v-model="formData.user_name" label="用户名" :rules="validations.user_name" />
        <v-text-field v-model="formData.email" label="邮箱" :rules="validations.email" />
        <v-text-field
          v-model="formData.password"
          label="密码"
          :append-icon="isShowPsw.psw ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowPsw.psw ? 'text' : 'password'"
          counter="16"
          :rules="validations.password"
          @click:append="isShowPsw.psw = !isShowPsw.psw" />
        <v-text-field
          v-model="formData.repeatPassword"
          label="确认密码"
          counter="16"
          :append-icon="isShowPsw.repeat ? 'mdi-eye' : 'mdi-eye-off'"
          :type="isShowPsw.repeat ? 'text' : 'password'"
          :rules="validations.repeatPassword"
          @click:append="isShowPsw.repeat = !isShowPsw.repeat" />
        <v-input>
          <v-text-field v-model="formData.code" label="验证码" :rules="validations.captch" />
          <span v-loading="loadingStatus.code" slot="append" class="captch" v-html="captcha.data" @click="initCaptcha" />
        </v-input>
        <div>
          <v-btn block color="blue white--text" @click="handRegister">注册</v-btn>
          <router-link to="/login" tag="div" class="mt-5" replace>
            <v-btn block text color="grey darken-3">登入</v-btn>
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
const { register } = API

export default {
  mixins: [captchaMixin],
  data () {
    return {
      loadingStatus: {
        register: false
      },
      formData: {
        user_name: '',
        password: '',
        repeatPassword: '',
        email: '',
        code: ''
      },
      isShowPsw: {
        psw: false,
        repeat: false
      },
      validations: {
        ...getRuleValidate(['user_name', 'password', 'email']),
        repeatPassword: [
          ...getRuleValidate(['password']).password,
          v => v + '' === this.formData.password + '' || '密码不一致, 请检查'
        ]
      },
      timeout: {

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
    // 处理注册
    async handRegister () {
      typeof this.close === 'function' && this.close()
      if (this.loadingStatus.register) return
      if (!this.$refs.registerForm.validate()) {
        this.close = this.$snackbar.error({
          absolute: true,
          timeout: 3000,
          msg: '表单验证失败, 请检查'
        })
        return
      }
      this.loadingStatus.register = true
      const res = await register()
      if (res.code === 'success') {
        this.$snackbar.success({
          msg: res.msg + ' 即将跳转登录'
        })
        this.timeout.toLogin = setTimeout(() => {
          this.$router.replace('/login')
        }, 2000)
      } else if (res.code === 'fail') {
        this.initCaptcha()
      }
      this.loadingStatus.register = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../scss/index.scss');
</style>
