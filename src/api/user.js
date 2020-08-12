import request from '../utils/request'

export function login(options) {
  return request({
    url: '/user/login',
    method: 'post',
    data: options
  })
}

export function getUserInfo() {
  return request({
    url: '/user/getUserInfo',
    method: 'get'
  })
}

export function applicationAccountNumber(formData) {
  const { username, email, yzm } = formData
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      email,
      code: yzm
    }
  })
}

export function sendEmailCode(email) {
  return request({
    url: '/user/sendcode',
    method: 'post',
    data: {
      email
    }
  })
}

export function userCheck(username) {
  return request({
    url: '/user/user_check',
    method: 'post',
    data: {
      username
    },
    onUploadProgress: progressEvent => {
      console.log((progressEvent.loaded / progressEvent.total * 100 | 0) + '%')
    }
  })
}
