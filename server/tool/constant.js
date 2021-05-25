const { env } = require('./env')

const UPLOAD_PATH = env === 'dev' ? 'public/upload/users' : 'public/upload/users'

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 200,
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY: 'admin_imooc_node_shan',
  JWT_EXPIRED: 60 * 60, // TOKEN 失效时间
  CODE_TOKEN_ERROR: -2,
  UPLOAD_PATH,
  TOURIST_PATH: `${UPLOAD_PATH}/tourist`
  // UPLOAD_URL
}
