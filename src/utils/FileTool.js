import config from './config'


export function fileTraversal(list, cb) {
  list.forEach((item, index) => {
    cb && cb(item, index)
  })
}

export function fileTypeFilter(type) {
  console.log(type)
  const { FILE_TYPE } = config
  if(FILE_TYPE.indexOf(type) === -1) { return }

}
