import Vue from 'vue'
import Loading from './components/Loading.vue'
const LoadingEl = Vue.extend(Loading)
// 指令列表
const directive = {}

/* loding指令：给指定元素上覆盖一层加载动画 */
const toggleLoading = function (el, binding) {
  if (binding.value) {
    const loadingEl = new LoadingEl().$mount()
    loadingEl.indeterminate = true
    // 保存元素上 style.position，关闭时复原
    el.$loadingEl = loadingEl
    el.style.position = 'relative'
    el.setAttribute('position', el.style.position)
    el.appendChild(loadingEl.$el)
  } else if (binding.value !== binding.oldValue) {
    if (el.$loadingEl) {
      el.$loadingEl.$el.remove()
      el.style.position = el.getAttribute('position')
      el.removeAttribute('position')
    }
  }
}

directive.loading = {
  bind (el, binding) {
    binding.value && toggleLoading(el, binding)
  },

  update (el, binding) {
    binding.value !== binding.oldValue && toggleLoading(el, binding)
  }
}

export default directive
