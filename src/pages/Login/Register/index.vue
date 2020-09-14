<template>
  <v-row justify="center" v-loading="loadingStatus.register">
    <v-col cols="10">
      <!-- 表单 -->
      <v-form ref="registerForm" autocomplete="off">
        <UserNameTextField
          v-model="formData.user_name"
          ref="user_name"
          :error="usable.user_name === false"
          :error-messages="errorMessages.user_name"
        />
        <v-text-field
          label="邮箱"
          v-model="formData.email"
          :rules="validations.email"
          :error="usable.email === false"
          :error-messages="errorMessages.email"
        />
        <v-text-field
          v-model="formData.nick_name"
          label="昵称"
          :rules="validations.nick_name"
        />
        <v-text-field
          v-model="formData.password"
          label="密码"
          placeholder="8 ~ 16位之间"
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
          <v-text-field v-model="formData.code" label="验证码" :rules="validations.captcha" />
          <Captcha v-model="formData.code" ref="captcha" />
        </v-input>
        <!-- 操作按钮 -->
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
import Captcha from '@/components/Captcha/index'
import UserNameTextField from './component/UserNameTextField/index'
import { getRuleValidate } from '@/tools/validate/index'
const { register } = API

export default {
  name: 'Register',
  components: { Captcha, UserNameTextField },
  data () {
    return {
      loadingStatus: {
        register: false
      },
      formData: {
        user_name: '',
        nick_name: '',
        password: '',
        repeatPassword: '',
        email: '',
        code: ''
      },
      isShowPsw: {
        psw: false,
        repeat: false
      },
      // 选项是否可以可用
      usable: {
        user_name: true,
        email: true
      },
      // 错误消息
      errorMessages: {
        user_name: '',
        email: ''
      },
      timeout: {
        toLogin: null
      },
      // 关闭弹窗的回调
      close: null
    }
  },

  computed: {
    /* 校验规则 */
    validations () {
      const v = getRuleValidate(['password', 'captcha', 'email', 'nick_name'])
      v.user_name = [
        v => this.$refs.user_name.validate()
      ]
      v.repeatPassword = [
        ...v.password,
        v => v + '' === this.formData.password + '' || '密码不一致, 请检查'
      ]
      v.captcha.push(v => (this.$refs.captcha && this.$refs.captcha.validate()) || '请输入正确的验证码')
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
    // 处理注册
    async handRegister () {
      if (this.loadingStatus.register) return
      if (!this.$refs.registerForm.validate()) {
        typeof this.close === 'function' && this.close()
        this.close = this.$snackbar.error({
          absolute: true,
          timeout: 3000,
          msg: '表单验证失败, 请检查'
        })
        return
      }

      this.loadingStatus.register = true
      const res = await register({
        user_name: this.formData.user_name,
        nick_name: this.formData.nick_name,
        email: this.formData.email,
        password: this.formData.password,
        code: this.formData.code,
        sid: this.sid
      })
      if (res.code === 200) {
        this.$snackbar.success({
          msg: res.msg + ' 即将跳转登录',
          closeBtn: '我知道了'
        })
        clearTimeout(this.timeout.toLogin)
        this.timeout.toLogin = setTimeout(() => {
          this.$router.replace({ path: '/login' })
        }, 1000)
      } else {
        /* 注册失败后根据失败项显示失败项的提示 */
        const { failItem, errorTips } = res.data
        for (const i of failItem) {
          this.usable[i] = false
          this.errorMessages[i] = errorTips[i]

          // 做个侦听器，用户输入清楚错误提示
          const unWatch = this.$watch(`formData.${i}`, (_new) => {
            this.usable[i] = true
            this.errorMessages[i] = ''
            // 只侦听一次
            unWatch()
          })
        }
        this.$refs.captcha.resetCaptcha()
      }
      this.loadingStatus.register = false
    }
  },

  beforeDestroy () {
    clearTimeout(this.timeout.toLogin)
  }
}
</script>

<style lang="scss" scoped>
@import url('../scss/index.scss');
</style>
