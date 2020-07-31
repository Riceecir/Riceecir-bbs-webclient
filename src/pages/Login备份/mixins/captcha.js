import API from '@/api/index'
const { getCaptcha } = API

export default {
  /* 表单校验规则 */
  rules: {
    code: {
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        console.log(this)
        if (value === '') {
          callback(new Error('验证码不能为空'))
        } else if (value.toString() !== this.captcha.text.toString()) {
          callback(new Error('请输入正确的验证码'))
        } else {
          callback()
        }
      }
    }
  },

  data () {
    return {
      captcha: {
        text: '',
        data: null
      }
    }
  },

  methods: {
    /* 初始化验证码 */
    initCaptcha () {
      getCaptcha()
        .then(res => {
          this.captcha = res.data
        })
    }
  },

  created () {
    this.initCaptcha()
  }
}
