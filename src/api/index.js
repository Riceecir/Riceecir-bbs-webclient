import * as login from './modules/login'
import * as publicApi from './modules/public'

export default {
  ...publicApi,
  ...login
}
