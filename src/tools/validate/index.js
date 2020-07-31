import validate from './validate'
/**
 * @returns {Object} 返回对应 key 值的验证规则
 */
export function getRuleValidate (key = [], that) {
  const keys = Array.isArray(key) ? key : Object.keys(key)
  const obj = {}
  for (const i of keys) {
    if (isExistRule(i)) {
      obj[i] = validate[i]
    } else {
      console.info(i, ' 规则不存在')
    }
  }

  return obj
}

/* 检测某一项规则是否存在 */
const isExistRule = function (key) {
  return !!validate[key]
}
