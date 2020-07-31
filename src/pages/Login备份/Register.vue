<template>
  <div class="container">
    <el-row type="flex">
      <el-col v-bind="col.formCol">

        <!-- 用户信息表单 -->
        <el-form label-width="6em" :model="formData" :rules="rules" ref="loginForm">
          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="formData.user_name" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item label="昵称">
            <el-input v-model="formData.nick_name" placeholder="请输入昵称" />
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
          </el-form-item>

          <el-form-item label="手机号" prop="phone">
            <el-input maxlength="11" v-model="formData.phone" placeholder="请输入手机号" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="请输入密码" show-password />
          </el-form-item>

          <el-form-item label="确认密码" prop="re_password">
            <el-input v-model="formData.re_password" type="password" placeholder="请再次输入密码" show-password />
          </el-form-item>

          <el-row>
            <el-col v-bind="col.codeColInForm.input">
              <el-form-item label="验证码" prop="code">
                <el-input v-model="formData.code" placeholder="请输入验证码,区分大小写" />
              </el-form-item>
            </el-col>
            <el-col v-bind="col.codeColInForm.img">
              <template v-if="captcha.data !== null">
                <span class="captch" v-html="captcha.data" @click="initCaptcha" />
              </template>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button round size="medium" type="primary">立即注册</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import setting from './setting'
import captchaMixin from './mixins/captcha'
import { getRuleValidate } from '@/tools/validate/index'

export default {
  mixins: [captchaMixin],
  data () {
    return {
      col: setting.col,
      formData: {
        email: '',
        phone: '',
        user_name: '',
        nick_name: '',
        password: '',
        re_password: '',
        code: ''
      },
      /* 表单验证规则 */
      rules: {
        ...getRuleValidate([
          'email',
          'phone',
          'user_name',
          'password'
        ]),
        code: {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('验证码不能为空'))
            } else if (value.toString() !== this.captcha.text.toString()) {
              callback(new Error('请输入正确的验证码'))
            } else {
              callback()
            }
          }
        },
        re_password: {
          required: true,
          trigger: 'blur',
          validator: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('确认密码不能为空'))
            } else if (value !== this.formData.password) {
              callback(new Error('两次密码不一致'))
            } else {
              callback()
            }
          }
        }
      }
    }
  },

  methods: {
    /* 点击登录 */
    handleLogin () {
      this.$refs.loginForm.validate(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./scss/index.scss');
</style>
