import request from '../utils/request'
import store from '../store'
import router from '../router'

export function uploadFile(file, path) {
  const { name, size, type } = file
  const formData = new FormData()
  formData.append('file', file)
  formData.append('groupingName', path)
  let stime = new Date().getTime()
  let sloaded = 0
  return request({
    url: '/file/upload',
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: formData,
    onUploadProgress: progressEvent => {
      router.currentRoute.fullPath !== '/transfer' && router.push('/transfer')
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      const endTime = new Date().getTime()
      const dTime = (endTime - stime) / 1000
      const dloaded = progressEvent.loaded - sloaded
      let speed = dloaded / dTime
      stime = new Date().getTime()
      sloaded = progressEvent.loaded
      let unit = 'b/s'
      if (speed / 1024 > 1) {
        unit = 'kb/s'
        speed = speed / 1024
      }
      if (speed / 1024 > 1) {
        unit = 'mb/s'
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

export function uploadList(uId, groupingName) {
  return request({
    url: '/file/upload-list',
    method: 'post',
    data: {
      uId,
      groupingName
    }
  })
}

export function uploadHistory(f_id) {
  return request({
    url: '/file/del-history',
    method: 'post',
    data: {
      f_id
    }
  })
}

export function getHistory() {
  return request({
    url: '/file/history',
    method: 'get'
  })
}

export function createFloader(currentPath, folderName) {
  return request({
    url: '/folder/create_folder',
    method: 'post',
    data: {
      currentPath,
      folderName
    }
  })
}

export function groupingList(groupName) {
  return request({
    url: '/folder/grouping-list',
    method: 'post',
    data: {
      groupName
    }
  })
}

export function delFile(cur_url, file_id) {
  return request({
    url: '/folder/del-file',
    method: 'post',
    data: {
      cur_url,
      file_id
    }
  })
}

export function dowFile(file) {
  console.log(file)
  const { f_name, f_size } = file
  let stime = new Date().getTime()
  let sloaded = 0
  return request({
    url: '/file/dow_file',
    method: 'post',
    data: {
      dow_url: file.f_dow_url
    },
    onDownloadProgress: progressEvent => {
      router.currentRoute.fullPath !== '/transfer' && router.push('/transfer')
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
      const endTime = new Date().getTime()
      const dTime = (endTime - stime) / 1000
      const dloaded = progressEvent.loaded - sloaded
      let speed = dloaded / dTime
      stime = new Date().getTime()
      sloaded = progressEvent.loaded
      let unit = 'b/s'
      if (speed / 1024 > 1) {
        unit = 'kb/s'
        speed = speed / 1024
      }
      if (speed / 1024 > 1) {
        unit = 'mb/s'
        speed = speed / 1024
      }
      store.dispatch('onUploadProgress',
        {
          progressBar: percentCompleted,
          sloaded: dloaded,
          dloadedremainingTime: dTime,
          uploadSpeed: speed.toFixed(2) + unit,
          fileName: f_name,
          fileSize: f_size,
          fileType: f_name
        }
      )
    }
  })
}
