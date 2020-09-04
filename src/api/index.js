import * as login from './modules/login'
import * as userApi from './modules/user'
import * as publicApi from './modules/public'

export default {
  ...publicApi,
  ...login,
  ...userApi
}
