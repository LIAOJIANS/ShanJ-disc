import store from '../store'

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
  await store.dispatch('getFileList', store.getters.userInfo.u_id)
  const fileList = store.getters.fileList
  let filterFileList = fileList.filter(file => type.includes(file.f_name.split('.')[1]))
  store.dispatch('filterFile', filterFileList)
}

export function fomartPath(pathArr) {
  let path = ''
  if(pathArr.length > 1) {
    pathArr.forEach(item => {
      path += `${ item }/`
    })
    path = path.substring(0, path.length - 1)
  } else {
    path = pathArr[0]
  }
  return path
}
