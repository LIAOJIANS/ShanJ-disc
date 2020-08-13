import request from '../utils/request'
import store from '../store'
import router from '../router'

export function uploadFile(file) {
  const { name, size, type } = file
  const formData = new FormData()
  formData.append('file', file)
  let stime = new Date().getTime();
  let sloaded = 0
  return request({
    url: '/file/upload',
    headers: {"Content-Type": "multipart/form-data"},
    method: 'post',
    data: formData,
    onUploadProgress: progressEvent => {
      console.log(progressEvent)
      router.currentRoute.fullPath !== '/transfer' && router.push('/transfer')
      let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
      let endTime = new Date().getTime()
      let dTime = endTime - stime
      let dloaded = progressEvent.loaded - sloaded
      let speed = dloaded / dTime
      stime = new Date().getTime()

      sloaded = progressEvent.loaded
      let unit = "b/s"
      if (speed / 1024 > 1) {
        unit = "kb/s"
        speed = speed / 1024
      }
      if (speed / 1024 > 1) {
        unit = "mb/s"
        speed = speed / 1024
      }
      store.dispatch('onUploadProgress',
        {
          progressBar: percentCompleted,
          sloaded: dloaded,
          dloadedremainingTime: dTime,
          uploadSpeed: speed.toFixed(2) + unit,
          fileName: name,
          fileSize: size,
          fileType: type
        }
      )
    }
  })
}

export function uploadList(uId) {
  return request({
    url: '/file/upload-list',
    method: 'post',
    data: {
      uId
    }
  })
}
