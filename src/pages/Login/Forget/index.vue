<template>
  <v-row justify="center" v-loading="loadingStatus.sending">
    <v-col cols="10">
      <!-- 资料填写表单 -->
      <v-form ref="forgetForm" autocomplete="off">
        <v-text-field
          label="邮箱"
          v-model="formData.email"
          placeholder="请输入注册时填写的邮箱"
          :rules="validations.email"
        />
        <div class="mt-2">
          <v-btn block color="blue white--text" @click="sendEmail">发送验证码</v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import API from '@/api/index'
import { getRuleValidate } from '@/tools/validate/index'
const { sendForgetMsg } = API

export default {
  name: 'Forget',

  data () {
    return {
      loadingStatus: {
        sending: false
      },
      formData: {
        email: ''
      },
      close: null
    }
  },

  computed: {
    /* 表单验证规则 */
    validations () {
      return getRuleValidate(['email'])
    }
  },

  methods: {
    /* 发送邮件 */
    async sendEmail () {
      if (this.loadingStatus.sending) return
      if (!this.$refs.forgetForm.validate()) {
        typeof this.close === 'function' && this.close()
        this.close = this.$snackbar.error({
          absolute: true,
          timeout: 3000,
          msg: '表单验证失败, 请检查'
        })
      } else {
        this.loadingStatus.sending = true
        const { code, msg } = await sendForgetMsg({
          type: 'email',
          ...this.formData
        })
        if (code === 200) {
          this.$snackbar.success({
            timeout: 3000,
            msg: msg
          })
        }

        this.loadingStatus.sending = false
      }
    }
  }
}
</script>
