import directives from './directive'

// 注册指令
export default function (Vue) {
  for (const i in directives) {
    Vue.directive(i, directives[i])
  }
}
