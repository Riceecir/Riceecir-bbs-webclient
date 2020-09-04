const validate = {}
// 用户名
validate.user_name = [
  v => !!v || '用户名不能为空',
  // v => (v.length >= 4 && v.length <= 16) || '用户应该在4~16个字符之间',
  // 不能纯数字
  v => /^[a-zA-Z]{1}([a-zA-Z0-9]|[._-]){3,15}$/.test(v) || '用户名必须字母开头、特殊符号只能包含下划线'
]
// 昵称
validate.nick_name = [
  v => !!v || '昵称不能为空'
]
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
validate.captcha = [
  v => !!v || '验证码不能为空'
]

export default validate
