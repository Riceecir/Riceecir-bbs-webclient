<template>
  <div class="container">
    <el-row type="flex">
      <el-col v-bind="col.formCol">

        <!-- 用户信息表单 -->
        <el-form label-width="6em" :model="formData" :rules="rules" ref="loginForm">

          <el-form-item label="用户名" prop="user_name">
            <el-input v-model="formData.user_name" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input v-model="formData.password" type="password" placeholder="请输入密码" />
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
            <el-button round size="medium" type="primary" @click="handleLogin">登录</el-button>
            <el-button round size="medium">注册</el-button>
            <span class="reset-psw">
              <router-link to="/forget">忘记密码?</router-link>
            </span>
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
        user_name: '',
        password: '',
        code: ''
      },
      /* 表单验证规则 */
      rules: {
        ...getRuleValidate([
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

.reset-psw {
  margin-left: 2em;
  &:hover {
    color: #409EFF;
    cursor: pointer;
  }
}
</style>
