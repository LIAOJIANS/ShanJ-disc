const { env } = require('./env')

const UPLOAD_PATH = env === 'dev' ? 'public/upload/users' : '/root/upload/admin-upload/ebook'

// const UPLOAD_URL = env === 'dev' ? 'http://localhost:3000/Users/sam/upload/admin-upload-ebook' : ''

module.exports = {
  CODE_ERROR: -1,
  CODE_SUCCESS: 200,
  PWD_SALT: 'admin_imooc_node',
  PRIVATE_KEY: 'admin_imooc_node_shan',
  JWT_EXPIRED: 60 * 60, // TOKEN 失效时间
  CODE_TOKEN_ERROR: -2,
  UPLOAD_PATH,
  // UPLOAD_URL
}
