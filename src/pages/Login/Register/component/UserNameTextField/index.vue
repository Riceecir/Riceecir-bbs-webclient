<template>
  <!--
    Boolean类型的props必须显示传入，不能只填 key 值
    例如 error, 必须 :error="true"
  -->
  <v-text-field
    ref="user_name"
    v-model="user_name"
    v-bind="options"
  >
    <!-- 图标显示 -->
    <div slot="append">
      <template v-if="loadingStatus.checkUserName">
        <v-progress-circular indeterminate size="24" />
      </template>
      <template v-else-if="user_name">
        <v-tooltip v-if="usable.user_name" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="success">mdi-check</v-icon>
          </template>
          <span>昵称可用!</span>
        </v-tooltip>
        <v-tooltip v-else bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" color="error">mdi-close</v-icon>
          </template>
          <span>{{ errorMessage.user_name || '校验失败,请检查' }}</span>
        </v-tooltip>
      </template>
      <template v-else>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on">mdi-pencil</v-icon>
          </template>
          <span>输入后将会检查昵称是否可用</span>
        </v-tooltip>
      </template>
    </div>
  </v-text-field>
</template>

<script>
import API from '@/api/index'
import { debounce } from '@/utils/utils.js'
import { getRuleValidate } from '@/tools/validate/index'
const { checkUserName } = API

export default {
  name: 'UserNameTextField',

  data () {
    return {
      user_name: '',
      loadingStatus: {
        checkUserName: false
      },
      // 检查某项信息是否可用
      usable: {
        user_name: true
      },
      // 自定义的错误信息
      errorMessage: {
        user_name: ''
      }
    }
  },

  computed: {
    /* 校验规则 */
    validations () {
      const v = getRuleValidate(['user_name'])
      return v
    },

    /* text-field 绑定的内容 */
    options () {
      return Object.assign({
        label: '用户名',
        placeholder: '限制8~16字符',
        'lazy-validation': true,
        rules: this.validations.user_name
      },
      this.$attrs,
      {
        error: !this.usable.user_name,
        'error-messages': this.errorMessage.user_name
      })
    }
  },

  watch: {
    user_name (_new) {
      this.$emit('input', _new)
      debounce(() => {
        /**
         * 因为验证规则校验后才检查用户名是否可用
         * 所以需要手动触发校验规则
         */
        const valid = this.$refs.user_name.validate()
        this.usable.user_name = valid
        if (_new && valid) {
          this.checkUserName()
        } else {
          this.errorMessage.user_name = ''
        }
      }, 300)
    }
  },

  methods: {
    /* 检查用户是否可用 */
    async checkUserName () {
      this.loadingStatus.checkUserName = true
      const res = await checkUserName({ user_name: this.user_name })
      if (res) {
        this.usable.user_name = res.data
        this.errorMessage.user_name = res.data ? '' : res.msg
      }
      this.loadingStatus.checkUserName = false
    },

    // 校验结果
    validate () {
      // 等待校验结果
      if (this.loadingStatus.checkUserName) return false
      else return this.usable.user_name
    }
  }
}
</script>

<style>

</style>
