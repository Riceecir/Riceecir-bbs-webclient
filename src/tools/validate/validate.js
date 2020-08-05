/* Element ui */
/* const validate = {
  user_name: { required: true, message: '用户名不能为空', trigger: 'blur' },
  password: {
    required: true,
    trigger: 'blur',
    validator (rule, value, callback) {
      if (value === '') {
        callback(new Error('密码不能为空'))
      } else if (value.length < 8 || value.length > 16) {
        callback(new Error('密码长度应该是 8 - 16 位之间'))
      } else {
        callback()
      }
    }
  },
  email: { required: true, message: '邮箱不能为空', trigger: 'blur' },
  phone: { required: true, message: '请填写正确的手机号', trigger: 'blur' }
}
 */

const validate = {}
// 用户名
validate.user_name = [v => !!v || '用户名不能为空']
// 密码
validate.password = [
  v => {
    let result = true
    if (!v || v === '') result = '密码不能为空'
    else if (v.length < 8 || v.length > 16) result = '密码长度应该是 8 - 16 位之间'
    return result
  }
]
// 邮箱
validate.email = [
  v => !!v || '邮箱不能为空',
  v => /.+@.+\..+/.test(v) || '请填写正确的邮箱地址'
]
// 手机号
validate.phone = [v => !!v || '请填写正确的手机号']
// 验证码
validate.captch = [v => !!v || '验证码不能为空']

export default validate
