import API from '@/api/index'
import { getRuleValidate } from '@/tools/validate/index'
const { getCaptcha } = API

export default {
  data () {
    const that = this
    return {
      loadingStatus: {
        code: false
      },
      captcha: {
        text: '',
        data: null
      },
      /* 表单校验规则 */
      validations: {
        captch: [
          ...getRuleValidate(['captch']).captch,
          v => v.toString().toLocaleLowerCase() === that.captcha.text.toString().toLocaleLowerCase() || '请输入正确的验证码'
        ]
      }
    }
  },

  methods: {
    /* 初始化验证码 */
    async initCaptcha () {
      if (!this.loadingStatus.code) {
        this.loadingStatus.code = true
        const res = await getCaptcha()
        this.captcha = res.data
        this.loadingStatus.code = false
      }
    }
  },

  created () {
    this.initCaptcha()
  }
}
