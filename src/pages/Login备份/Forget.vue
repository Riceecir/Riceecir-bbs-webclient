<template>
  <div>
    <el-tabs v-model="currentTab" @tab-click="handleTabClick">
      <el-tab-pane v-for="item in tabConfig" :key="item.type" :label="item.label" :name="item.type" />
    </el-tabs>

    <el-row type="flex">
      <el-col v-bind="col.formCol">
        <!-- 发送验证信息表单 -->
        <el-form label-width="6em" :model="formData" :rules="rules" ref="userForm">
          <el-form-item v-if="currentTab === 'email'" label="邮箱" prop="email">
            <el-input v-model="formData.email" placeholder="请输入邮箱" />
          </el-form-item>

          <el-form-item v-if="currentTab === 'phone'" label="手机号" prop="phone">
            <el-input maxlength="11" v-model="formData.phone" placeholder="请输入手机号" />
          </el-form-item>

          <el-row>
            <el-col v-bind="col.codeColInForm.input">
              <el-form-item label="验证码" prop="code">
                <el-input v-model="formData.code" placeholder="请输入验证码,区分大小写" @blur="handleBlur" @focus="handleFocus" />
              </el-form-item>
            </el-col>
            <el-col v-bind="col.codeColInForm.img">
              <template v-if="captcha.data !== null">
                <span class="captch" v-html="captcha.data" @click="initCaptcha" />
              </template>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button round size="medium" type="primary" :disabled="loadingStatus.send" @click="sendInformation">下一步</el-button>
          </el-form-item>
        </el-form>

      </el-col>
    </el-row>
  </div>
</template>

<script>
import API from '@/api/index'
import setting from './setting'
import captchaMixin from './mixins/captcha'
import { getRuleValidate } from '@/tools/validate/index'
const { sendForgetMsg } = API

export default {
  mixins: [captchaMixin],
  data () {
    return {
      col: setting.col,
      currentTab: 'email',
      loadingStatus: {
        send: false
      },
      formData: {
        email: '',
        phone: '',
        code: ''
      },
      tabConfig: [
        {
          label: '通过邮箱找回',
          type: 'email'
        },
        {
          label: '通过手机号找回',
          type: 'phone'
        }
      ],
      rules: {
        ...getRuleValidate(['email', 'phone']),
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

  watch: {
    currentTab (_new) {
      /* 根据选择tab来修改必填项 */
      if (_new === 'email') {
        this.rules.email.required = true
        this.rules.phone.required = false
      } else if (_new === 'phone') {
        this.rules.email.required = false
        this.rules.phone.required = true
      }
    }
  },

  methods: {
    handleFocus () {
      console.log('聚焦了')
    },
    handleBlur () {
      console.log('失焦了')
    },
    /* 切换 tab */
    handleTabClick (el) {
      this.currentTab = el.name
    },

    /* 发送验证 邮件/短信 */
    sendInformation () {
      this.loadingStatus.send = true
      const loading = this.$message({
        message: 'loading...',
        iconClass: 'el-icon-loading',
        duration: 0,
        center: true
      })
      this.$refs.userForm.validate(res => {
        sendForgetMsg({
          type: this.currentTab,
          ...this.formData
        })
          .then(res => {
            console.log(res)
          })
          .finally(() => {
            loading.close()
            this.loadingStatus.send = false
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('./scss/index.scss');
</style>
