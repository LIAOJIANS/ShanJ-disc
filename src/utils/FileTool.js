import store from '../store'
import config from './config'

// eslint-disable-next-line no-undef
const { ipcRenderer } = __non_webpack_require__('electron')

export function fileTraversal(list, cb) {
  list.forEach((item, index) => {
    cb && cb(item, index)
  })
}

export function dowUrl(url) {
  const path = 'http://localhost:3000/'
  return `${path}${url}`
}

export async function fileTypeFilter(type) {
  await store.dispatch('getFileList', store.getters.userInfo.u_id).then(data => {
    let filterFileList = []
    if (type === 'qita') {
      const wilteList = ['rar', 'ptf', 'zip']
      const typeList = Object.keys(config.FILE_TYPE)
      data.forEach(f => {
        const fileType = f.f_name.split('.')[1]
        ;(wilteList.includes(fileType) || !typeList.includes(fileType)) && (
          filterFileList = [
            ...filterFileList,
            f
          ]
        )
      })
    } else {
      filterFileList = data.filter(file => type.includes(file.f_name.split('.')[1]))
    }
    store.dispatch('filterFile', filterFileList)
  })
}

export function fomartPath(pathArr) {
  let path = ''
  if (pathArr.length > 1) {
    pathArr.forEach(item => {
      path += `${item}/`
    })
    path = path.substring(0, path.length - 1)
  } else {
    path = pathArr[0]
  }
  return path
}

/**
 * 下载文件
 * @param {*} obj
 */
export const downFile = (obj) => {
  ipcRenderer.send('down-file', obj)

  /* return new Promise((resolve, reject) => {
        ipcRenderer.once(`down-file-${obj.id}`, (e, data) => resolve(data))
    }) */
}

/**
 * 更新下载状态
 * @param {*} cb
 */
export const updateDownState = (cb) => {
  ipcRenderer.on('update-down-state', function(e, data) {
    cb(data)
  })
}

/**
 * 暂停下载
 * @param {*} url
 */
export const pause = (url) => {
  ipcRenderer.send('down-file-pause', { url })
}

/**
 * 取消下载
 * @param {*} url
 */
export const cancel = (url) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('down-file-cancel', { url })
    ipcRenderer.once(`down-file-cancel-${url}`, (e, data) => resolve(data))
  })
}

/**
 * 恢复下载
 * @param {*} url
 */
export const resume = (url) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('down-file-resume', { url })
    ipcRenderer.once(`down-file-resume-${url}`, (e, data) => resolve(data))
  })
}

/**
 * 断点续下载
 * @param {*} obj
 */
export const nextresume = (obj) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('resume-download', obj)
    ipcRenderer.once(`resume-download-${obj.id}`, (e, data) => resolve(data))
  })
}

/**
 * 初始化下载地址
 * @param {*} path 下载路径
 */
export const initPath = () => {
  const path = localStorage.getItem('downloads') || 'not'
  ipcRenderer.send('set_path', { path })
  ipcRenderer.once(`set_path`, (e, data) => {
    localStorage.setItem('downloads', data)
  })
}
