import request from '../utils/request'


export function uploadFile(file) {
  return request({
    url: '/file/upload',
    headers: {"Content-Type": "multipart/form-data"},
    data: file,
    onUploadProgress: progressEvent => {
      console.log((progressEvent.loaded / progressEvent.total * 100 | 0) + '%')
    }
  })
}
